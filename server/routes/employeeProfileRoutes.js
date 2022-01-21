const { application } = require("express");
const express = require("express");
const router = express.Router();
const { createAvailability } = require("../models/availability");
const {
  createEmployeeProfile,
  getEmployeeProfileByProfileId,
  updateEmployeeProfile,
  listOfEmployees,
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
  console.log(newEmployeeProfile);
  try {
    let employeeProfileId = await createEmployeeProfile(newEmployeeProfile);
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
});

/* Update: Existing profile in database
   Params: New Profile 
   Return: Updated Profile Model
 */

router.patch("/updateEmployeeProfile", async (req, res) => {
  console.log(req.body);
  let updatedEmployeeProfile = req.body;
  let id = updatedEmployeeProfile.id;
  console.log("Updating availability", id, "with", updatedEmployeeProfile);
});

/** Get: All employees in database
 *  Param: All profiles
 *  Return: All profiles
 */

router.get("/employees", async (req, res) => {
  let employeeList = await listOfEmployees();
  res.send(employeeList);
});

router.get("/getByEmail/:email", async (req, res) => {
  let email = req.params.email;
  let employeeEmail = await findEmployeeByProfileEmail(email);
  res.status(200).send(employeeEmail);
});

router.get("/getByProfileId/:profileId", async (req, res) => {
  let profileId = req.params.profileId;
  let profile = await getEmployeeProfileByProfileId(profileId);
  res.status(200).send(profile);
});

router.put("/updateProfilePicture", async (req, res) => {
  updateProfile(req.body, (updatedModel) => {
    res.status(200).send(updatedModel);
  });
});

module.exports = router;
