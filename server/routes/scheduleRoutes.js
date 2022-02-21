const express = require("express");
const router = express.Router();

const scheduleModel = require("../models/schedule");

const employeeProfileModel = require("../models/employeeProfile");

router.get("/day", async (req, res) => {
  let day = req.query.day;
  // console.log("from API day", day);
  let scheduleList = await scheduleModel.listScheduleByDay(day);
  // console.log("from API scheduleList", scheduleList);
  res.json(scheduleList);
});

router.get("/week", async (req, res) => {
  let start = req.query.day0;
  // console.log("FROM ROUTER API THIS IS THE start", start);
  let scheduleList = await scheduleModel.listByWeekDays(start);
  // console.log("FROM ROUTER API THIS IS THE DAYLIST:", scheduleList);
  res.json(scheduleList);
});

router.get("/month", async (req, res) => {
  let month = req.query.month;
  let scheduleList = await scheduleModel.listScheduleByMonth(month);
  res.json(scheduleList);
});

router.get("/id", async (req, res) => {
  let id = req.query.id;
  // console.log("from API Id", id);
  let singleSchedule = await scheduleModel.findById(id);
  // console.log("from API id", singleSchedule);
  res.json(singleSchedule);
});
router.get("/employee-id", async (req, res) => {
  let id = req.query.id;
  let today = req.query.today;
  // console.log("from API, looking for shifts for employee with id", id);
  let shiftsList = await scheduleModel.findByEmployeeProfileId(id, today);
  // console.log("from API id", shiftsList);
  res.json(shiftsList);
});

router.get("/shifts-up-for-grabs", async (req, res) => {
  let userId = req.query.userId;
  console.log(
    "from API, looking for shifts up for grabs for employee with id",
    userId
  );

  let employeePositions = await employeeProfileModel.findPositionsByEmployeeId(
    userId
  );
  let availableShiftsList =
    await scheduleModel.findAvailableShiftsByEmployeePositions(
      userId,
      employeePositions
    );
  console.log("from API: available shifts are", availableShiftsList);
  res.json(availableShiftsList);
});

router.post("/schedule/new", async (req, res) => {
  // console.log("req.body", req.body);
  let newSchedule = req.body;
  // console.log(newSchedule);
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
  let shiftId = req.query.id;
  let updateSchedule = req.body;
  let empId = updateSchedule.employeeId;
  console.log("new Schedule", updateSchedule);
  let foundName = await employeeProfileModel.getEmployeeProfileByProfileId(
    empId
  );
  let newFirstName = foundName.firstName;
  let newLastName = foundName.lastName;
  updateSchedule.firstName = newFirstName;
  updateSchedule.lastName = newLastName;
  let newSchedule = await scheduleModel.update(shiftId, updateSchedule);
  console.log("NEW SCHEDULE!!!!!", newSchedule);
  res.json(newSchedule);
});

router.delete("/schedule/delete", async (req, res) => {
  let id = req.query.id;
  let deleteSchedule = await scheduleModel.deleteSchedule(id);
  console.log("delete route", id);
  res.send(deleteSchedule);
});

module.exports = router;
