const express = require("express");
const router = express.Router();
const employeeTimeOffModel = require("../models/timeOff");

router.post("/", async (req, res) => {
  let newEmployeeTimeOff = req.body;
  let createdId = await employeeTimeOffModel.createEmployeeTimeOff(
    newEmployeeTimeOff
  );
  res.send(createdId);
  // console.log("Im here save me", newEmployeeTimeOff, createdId);
});
//
router.get("/by-start-date", async (req, res) => {
  let startDay = req.query.startDay;
  // console.log("from API time off, startDate is", startDay);
  let timeOffWeek = await employeeTimeOffModel.getWeeklyTimeOffs(startDay);
  res.json(timeOffWeek);
});

router.post("/update", async (req, res) => {
  let id = req.query.id;
  // console.log("id for approval", id);
  let timeOffApproval = req.body;
  newTimeOff = await employeeTimeOffModel.update(id, timeOffApproval);
  res.json(newTimeOff);
});

router.get("/list", async (req, res) => {
  timeOffList = await employeeTimeOffModel.listOfTimeOff();
  res.json(timeOffList);
});

router.get("/listEmployee", async (req, res) => {
  let id = req.query.id;
  // console.log("Employee time off list", id);
  employeeTimeOff = await employeeTimeOffModel.getEmployeeTimeOffByProfileId(
    id
  );
  res.json(employeeTimeOff);
});

// router.delete("/deleteTimeOff", async function(req, res) {
//   let id = req.query.id;
//   let deletedTimeOff = await employeeTimeOffModel.deleteTimeOff(id);
//   console.log("this is the deleted time off from the routs", deletedTimeOff)
//   res.send(deletedTimeOff);
// })

router.delete("/delete/:id", async function(req, res) {
  let id = req.params.id;
  console.log("deleting timeOff", id);
  let deletedTimeOff = await employeeTimeOffModel.deleteTimeOff(id);
  console.log("this is the deleted time off from the routs", deletedTimeOff)
  res.send(deletedTimeOff);
})



module.exports = router;
