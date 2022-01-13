const mongoose = require("./mongooseDb");

const Schedule = mongoose.model("schedule", {
  name: String,
  start: Number,
  end: Number,
  date: String,
  breaks: [{ name: String, start: Number, end: Number, paid: Boolean }],
});

async function createSchedule(ScheduleData) {
  let newSchedule = new Schedule(ScheduleData);
  let createdSchedule = await newSchedule.save();
  return createdSchedule.id;
}

// {date:{$gte:ISODate("2021-01-01"),$lte:ISODate("2020-05-01"}}

async function listScheduleDay(day) {
  return Schedule.find({ date: day });
}
async function listScheduleWeek(start, end) {
  return Schedule.find({ date: { $gte: ISODate(start), $lte: ISODate(end) } });
}
async function listScheduleMonth(month) {
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
  listSchedule,
  findById,
  update,
  deleteSchedule,
};
