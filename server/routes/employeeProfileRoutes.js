const { application } = require("express");
const express = require("express");
const router = express.Router();
const { createAvailability } = require("../models/availability");
const {
  createEmployeeProfile,
  getEmployeeProfileByProfileId,
  updateEmployeeProfile,
  listOfEmployees,
  getActiveEmployeeNames,
} = require("../models/employeeProfile");


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
    //sends initial availability info availability model (imported above)
    if (!employeeProfileId) res.status(500).send("Failed to create.");
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

router.post("/update/", async (req, res) => {
  let updatedEmployeeProfile = req.body;
  let id = req.query.id;
  console.log(req.body);
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
  res.json(profile);
});

router.put("/updateProfilePicture", async (req, res) => {
  updateProfile(req.body, (updatedModel) => {
    res.status(200).send(updatedModel);
  });
});

module.exports = router;
