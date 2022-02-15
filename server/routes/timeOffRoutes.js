const express = require("express");

const router = express.Router();
const employeeTimeOffModel = require("../models/timeOff");

router.post("/", async (req, res) => {
  let newEmployeeTimeOff = req.body;
  let createdId = await employeeTimeOffModel.createEmployeeTimeOff(
    newEmployeeTimeOff
  );
  res.send(createdId);
});
router.post("/update", async (req, res) => {
  let id = req.query.id;
  console.log("id for approval", id);
  let timeOffApproval = req.body;
  newTimeOff = await employeeTimeOffModel.update(id, timeOffApproval);
  res.json(newTimeOff);
});

router.get("/list", async (req, res) => {
  timeOffList = await employeeTimeOffModel.listOfTimeOff();
  res.json(timeOffList);
});

router.get("/listEmployee", async (req, res) => {
  let id = req.query.id
  console.log("Employee time off list", id);
  employeeTimeOff = await employeeTimeOffModel.getEmployeeTimeOffByProfileId(id)
  res.json(employeeTimeOff);
})

module.exports = router;
