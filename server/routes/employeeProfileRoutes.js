const { application } = require("express");
const express = require("express");
const router = express.Router();
const { createAvailability } = require("../models/availability");
const { employeeProfile,
  createEmployeeProfile,
  getEmployeeProfileByProfileId,
  updateEmployeeProfile,
  listOfEmployees,
  getActiveEmployeeNames,
} = require("../models/employeeProfile");

// const mustBeLoggedIn = async (req, res, next) => {
//   if (req.user) {
//     next();
//     return;
//   }
//   res.sendStatus(401);
// };

// const mustBeManager = async (req, res, next) => {
//     if (req.user && req.user.isManager) {
//         next()
//         return
//     }
//     res.sendStatus(401)
// }

/* Creates a new employee profile.
 Params: same as employeeProfile Schema
 return:-status 200 and created profile if successful
        -status 500 if it fails.
*/
router.post("/create", async (req, res) => {
  let newEmployeeProfile = req.body;
  employeeProfile
    .find({ email: req.body.email })
    .exec()
    .then((employeeProfile) => {
      if (employeeProfile.length >= 1) {
        return res.status(401).json({
          status: false,
          message: "Email exists",
          data: undefined,
        });
      } else {
        bcrypt.hash(req.body.password, 2, (err, hash) => {
          if (err) {
            return res.status(500).json({
              status: false,
              message: "Error, cannot encrypt password",
              data: undefined,
            });
          } else {
            const employeeProfile = new employeeProfile({
              ...req.body,
              password: hash,
            });
            employeeProfile.save((err, doc) => {
              if (err)
                return res.json({
                  status: false,
                  message: err,
                  data: undefined,
                });
              return res.status(200).json({
                status: false,
                message: "Employee Profile created successfully!",
                data: doc,
              });
            });
            console.log(newEmployeeProfile);
            try {
              let employeeProfileId = createEmployeeProfile(newEmployeeProfile);
              // sends initial availability info availability model (imported above)
              createAvailability(
                employeeProfileId,
                newEmployeeProfile.firstName,
                newEmployeeProfile.lastName
              );
              if (!employeeProfileId) res.status(500).send("failed to create");
              res.status(200).send(employeeProfileId);
            } catch (error) {
              console.log(error.message);
              res.status(400).send(error.message);
            }
          }
        });
      }
    });
});

/* Update: Existing profile in database
   Params: New Profile 
   Return: Updated Profile Model
 */

router.patch("/updateEmployeeProfile", async (req, res) => {
  let updatedEmployeeProfile = req.body;
  let id = updatedEmployeeProfile.id;
  console.log("Updating employee profile", id, "with", updatedEmployeeProfile);
  let updatedEmployee = await updateEmployeeProfile(id, updatedEmployeeProfile);
  res.send(updatedEmployee);
  console.log("updated employee...", updatedEmployee);
});

/** Get: All employees in database
 *  Param: All profiles
 *  Return: All profiles
 */

router.get("/employees", async (req, res) => {
  let employeeList = await listOfEmployees();
  res.send(employeeList);
});

router.get("/employees/names", async (req, res) => {
  let employeeNames = await getActiveEmployeeNames();
  res.send(employeeNames);
});

router.get("/getByEmail/:email", async (req, res) => {
  let email = req.params.email;
  let employeeEmail = await findEmployeeByProfileEmail(email);
  res.status(200).send(employeeEmail);
});

router.get("/getByProfileId/:profileId", async (req, res) => {
  let profileId = req.params.profileId;
  console.log("from API", profileId);
  let profile = await getEmployeeProfileByProfileId(profileId);
  console.log("from API, profile", profile);
  res.status(200).send(profile);
});

router.put("/updateProfilePicture", async (req, res) => {
  updateProfile(req.body, (updatedModel) => {
    res.status(200).send(updatedModel);
  });
});

module.exports = router;
