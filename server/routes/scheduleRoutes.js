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

router.get("/id", async (req,res)=>{
  let id = req.query.id;
  console.log("from API Id",id)
  let singleSchedule = await scheduleModel.findById(id)
  console.log("from API id", singleSchedule)
  res.json(singleSchedule)
})

router.post("/schedule/new", async (req, res) => {
  console.log('req.body',req.body)
  let newSchedule = req.body;
  console.log(newSchedule)
  let createdId = await scheduleModel.createSchedule(newSchedule);
  res.send(createdId);
});

router.post('/schedule/update',async (req,res)=>{
  let id = req.query.id
  let updateSchedule = req.body
  let newSchedule = await scheduleModel.update(id,updateSchedule)
  res.send (newSchedule)
})

router.post('/schedule/detele', async (req,res)=>{
  let id = req.query.id
  let deleteSchedule = await scheduleModel.deleteSchedule(id)
  res.send(deleteSchedule)
})

module.exports = router;
