const { Timestamp } = require("mongodb");
const mongoose = require("../config/mongooseDb");

const Schedule = mongoose.model("schedule", {
  name: String,
  date: String,

  start: String,
  end: String,
  breaks: [
    { name: String, start: Number, end: Number, paid: Boolean, duration: },
    { name: String, start: Number, end: Number, paid: Boolean, duration: },
    { name: String, start: Number, end: Number, paid: Boolean, duration: },
  ],
});

async function createSchedule(ScheduleData) {
  let newSchedule = new Schedule(ScheduleData);
  let createdSchedule = await newSchedule.save();
  console.log("trying to create schedule");
  return createdSchedule.id;
}

// {date:{$gte:ISODate("2021-01-01"),$lte:ISODate("2020-05-01"}}

async function listScheduleByDay(day) {
  console.log("from model,", day);
  return Schedule.find({ date: day });
}
async function listScheduleByWeek(start, end) {
  return Schedule.find({ date: { $gte: ISODate(start), $lte: ISODate(end) } });
}
async function listScheduleByMonth(month) {
  return Schedule.find({ date: month });
}

async function findById(id) {
  return Schedule.findById(id);
}

async function update(id, newScheduleData) {
  return Schedule.findByIdAndUpdate(id, newScheduleData, {
    returnDocument: "after",
  });
}

async function deleteSchedule(id) {
  return Schedule.findByIdAndDelete(id);
}

module.exports = {
  createSchedule,
  listScheduleByDay,
  listScheduleByWeek,
  listScheduleByMonth,
  findById,
  update,
  deleteSchedule,
};
