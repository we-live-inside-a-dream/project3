const express = require("express");
const router = express.Router();
const employeeTimeOffModel = require("../models/timeOff");

router.post("/", async (req, res) => {
  let newEmployeeTimeOff = req.body;
  let createdId = await employeeTimeOffModel.createEmployeeTimeOff(
    newEmployeeTimeOff
  );
  res.send(createdId);
  console.log("Im here save me", newEmployeeTimeOff, createdId);
});
//
router.post("/", async (req, res) => {
  let newEmployeeTimeOff = req.body;
  let createdId = await employeeTimeOffModel.createEmployeeTimeOff(
    newEmployeeTimeOff
  );
  res.send(createdId);
  console.log("Im here save me", newEmployeeTimeOff, createdId);
});
//
router.get("/by-start-date", async (req, res) => {
  let startDay = req.query.startDay;
  console.log("from API time off, startDate is", startDay);
  let timeOffWeek = await employeeTimeOffModel.getWeeklyTimeOffs(startDay);
  res.json(timeOffWeek);
});

module.exports = router;
