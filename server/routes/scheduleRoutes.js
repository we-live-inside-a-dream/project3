const express = require("express");
const router = express.Router();

const scheduleModel = require("../models/schedule");

router.get("/day", async (req, res) => {
  let day = req.query.day;
  console.log("from API day", day);
  let scheduleList = await scheduleModel.listScheduleByDay(day);
  console.log("from API scheduleList", scheduleList);
  res.json(scheduleList);
});

router.get("/week", async (req, res) => {
  let start = req.query.start;
  let end = req.query.end;
  let scheduleList = await scheduleModel.listScheduleByWeek(start, end);
  res.send(scheduleList);
});

router.get("/month", async (req, res) => {
  let month = req.query.month;
  let scheduleList = await scheduleModel.listScheduleByMonth(month);
  res.send(scheduleList);
});

router.post("/schedule", async (req, res) => {
  console.log(req.body)
  let newSchedule = req.body;
  console.log(newSchedule)
  let createdId = await scheduleModel.createSchedule(newSchedule);
  res.send(createdId);
});

module.exports = router;
