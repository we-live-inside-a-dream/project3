const { application } = require("express");
const express = require("express");
const router = express.Router();

const {
  createEmployeeProfile,
  getEmployeeProfileByProfileId,
  updateEmployeeProfile,
  deleteEmployeeProfile,
} = require("../models/employeeProfile");


const mustBeLoggedIn = async (req, res, next) => {
  if (req.user) {
    next();
    return;
  }
  res.sendStatus(401);
};

router.post("/create", mustBeLoggedIn, async (req, res) => {
  let newEmployeeProfile = req.body;
  let employeeProfileId = await createEmployeeProfile(newEmployeeProfile)
  if (!profile) res.status(500).send("failed to create");
  res.status(200).send(profile);
});

router.put("/update", mustBeLoggedIn, async (req, res) => {
  console.log(req.body)
  let updateEmployeeProfile = req.body;
  updateEmployeeProfile(employeeProfile, (updatedModel) => {
    res.status(200).send(updatedModel);
  });
});

router.get('/employees', async (req, res) => {
  let employeeList = await employeeProfileModel.listOfEmployees()
  res.send(employeeList)
})

router.get("/getByEmail/:email", mustBeLoggedIn, async (req, res) => {
  let email = req.params.email;
  let employeeEmail = await findEmployeeByProfileEmail(email);
  res.status(200).send(profile);
});

router.get("/getByProfileId/:profileId", mustBeLoggedIn, async (req, res) => {
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
