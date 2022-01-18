const { application } = require("express");
const express = require("express");
const router = express.Router();

const {
  createEmployeeProfile,
  getEmployeeProfileByProfileId,
  updateEmployeeProfile,
} = require("../models/employeeProfile");

// const mustBeLoggedIn = async (req, res, next) => {
//   if (req.user) {
//     next();
//     return;
//   }
//   res.sendStatus(401);
// };

router.post("/create", async (req, res) => {
  let newEmployeeProfile = req.body;
  let employeeProfileId = await createEmployeeProfile(newEmployeeProfile);
  if (!profile) res.status(500).send("failed to create");
  res.status(200).send(profile);
});

router.patch("/updateEmployeeProfile", async (req, res) => {
  console.log(req.body);
  let updatedEmployeeProfile = req.body;
  console.log("Updating availability", id, "with", updatedEmployeeProfile);
  let availability = await availabilityModel.update(id, updatedAvailability);
  updateEmployeeProfile(employeeProfile, (updatedModel) => {
    res.status(200).send(updatedModel);
  });
});

router.get("/employees", async (req, res) => {
  let employeeList = await employeeProfileModel.listOfEmployees();
  res.send(employeeList);
});

router.get("/getByEmail/:email", async (req, res) => {
  let email = req.params.email;
  let employeeEmail = await findEmployeeByProfileEmail(email);
  res.status(200).send(profile);
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
