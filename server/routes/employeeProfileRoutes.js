const { application } = require("express");
const express = require("express");
const router = express.Router();

const {
  createEmployeeProfile,
  getEmployeeProfileByProfileId,
  updateEmployeeProfile,
} = require("../models/employeeProfile");

const mustBeLoggedIn = async (req, res, next) => {
  if (req.user) {
    next();
    return;
  }
  res.sendStatus(401);
};

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
router.post("/create", mustBeLoggedIn, async (req, res) => {
  let newEmployeeProfile = req.body;
  let employeeProfileId = await createEmployeeProfile(newEmployeeProfile);
  if (!profile) res.status(500).send("failed to create");
  res.status(200).send(employeeProfileId);
});

/* Update: Existing profile in database
   Params: New Profile 
   Return: Updated Profile Model
 */

router.patch("/updateEmployeeProfile", mustBeLoggedIn, async (req, res) => {
  console.log(req.body);
  let updatedEmployeeProfile = req.body;
  console.log("Updating availability", id, "with", updatedEmployeeProfile);
  let availability = await availabilityModel.update(id, updatedAvailability);
  updateEmployeeProfile(employeeProfile, (updatedModel) => {
    res.status(200).send(updatedModel);
  });
});

/** Get: All employees in database
 *  Param: All profiles
 *  Return: All profiles
 */

router.get("/employees", mustBeLoggedIn, async (req, res) => {
  let employeeList = await employeeProfileModel.listOfEmployees();
  res.send(employeeList);
});



router.get("/getByEmail/:email", mustBeLoggedIn, async (req, res) => {
  let email = req.params.email;
  let employeeEmail = await findEmployeeByProfileEmail(email);
  res.status(200).send(employeeEmail);
});

router.get("/getByProfileId/:profileId", mustBeLoggedIn, async (req, res) => {
  let profileId = req.params.profileId;
  let profile = await getEmployeeProfileByProfileId(profileId);
  res.status(200).send(profile);
});

router.put("/updateProfilePicture", mustBeLoggedIn, async (req, res) => {
  updateProfile(req.body, (updatedModel) => {
    res.status(200).send(updatedModel);
  });
});

module.exports = router;
