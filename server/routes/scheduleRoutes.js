const express = require("express");
const router = express.Router();

const scheduleModel = require("../models/schedule");

router.get("/day", async (req, res) => {
  let day = req.query.day;
  let scheduleList = await scheduleModel.listScheduleByDay(day);
  res.send(scheduleList);
});
router.get("/week", async (req, res) => {
  let start = req.query.start;
  let end = req.query.end;
  let scheduleList = await scheduleModel.listScheduleWeek(start, end);
  res.send(scheduleList);
});
router.get("/month", async (req, res) => {
  let month = req.query.month;
  let scheduleList = await scheduleModel.listScheduleMonth(month);
  res.send(scheduleList);
});

router.post("/schedule", async (req, res) => {
  let newSchedule = req.body;
  let createdId = await scheduleModel.createSchedule(newSchedule);
  res.send(createdId);
});

module.exports = router;