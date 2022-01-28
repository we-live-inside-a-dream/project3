const express = require("express");
const router = express.Router();

const scheduleModel = require("../models/schedule");

const employeeProfileModel = require("../models/employeeProfile");

router.get("/day", async (req, res) => {
  let day = req.query.day;
  console.log("from API day", day);
  let scheduleList = await scheduleModel.listScheduleByDay(day);
  console.log("from API scheduleList", scheduleList);
  res.json(scheduleList);
});

// router.get("/week", async (req, res) => {
//   let day0 = req.query.day0;
//   let day1 = req.query.day1;
//   let day2 = req.query.day2;
//   let day3 = req.query.day3;
//   let day4 = req.query.day4;
//   let day5 = req.query.day5;
//   let day6 = req.query.day6;

//   // let dayList = [day0, day1, day2, day3, day4, day5, day6];
//   // console.log("FROM ROUTER API THIS IS THE DAYLIST:", dayList);
//   let scheduleList = await scheduleModel.listByWeekDays(
//     day0,
//     day1,
//     day2,
//     day3,
//     day4,
//     day5,
//     day6
//   );
//   console.log("FROM ROUTER API THIS IS THE DAYLIST:", scheduleList);
//   res.send(scheduleList);
// });
router.get("/week", async (req, res) => {
  let start = req.query.day0;
  console.log("FROM ROUTER API THIS IS THE start", start);
  let scheduleList = await scheduleModel.listByWeekDays(start);
  console.log("FROM ROUTER API THIS IS THE DAYLIST:", scheduleList);
  res.send(scheduleList);
});

router.get("/month", async (req, res) => {
  let month = req.query.month;
  let scheduleList = await scheduleModel.listScheduleByMonth(month);
  res.send(scheduleList);
});

router.get("/id", async (req, res) => {
  let id = req.query.id;
  console.log("from API Id", id);
  let singleSchedule = await scheduleModel.findById(id);
  console.log("from API id", singleSchedule);
  res.json(singleSchedule);
});

router.post("/schedule/new", async (req, res) => {
  console.log("req.body", req.body);
  let newSchedule = req.body;
  console.log(newSchedule);
  let id = newSchedule.employeeId;
  let foundName = await employeeProfileModel.getEmployeeProfileByProfileId(id);
  let newFirstName = foundName.firstName;
  let newLastName = foundName.lastName;
  newSchedule.firstName = newFirstName;
  newSchedule.lastName = newLastName;
  let createdId = await scheduleModel.createSchedule(newSchedule);
  // let addedName = await scheduleModel.updateWithName(id, newFirstName, newLastName);
  res.send(createdId);
});

router.post("/schedule/update", async (req, res) => {
  let id = req.query.id;
  let updateSchedule = req.body;
  let newSchedule = await scheduleModel.update(id, updateSchedule);
  res.send(newSchedule);
});

router.delete("/schedule/delete", async (req, res) => {
  let id = req.query.id;
  let deleteSchedule = await scheduleModel.deleteSchedule(id);
  console.log("delete route", id);
  res.send(deleteSchedule);
});

module.exports = router;
