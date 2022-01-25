const { Timestamp } = require("mongodb");
const mongoose = require("./mongooseDb");

const Schedule = mongoose.model("schedule", {
  employeeId: String,
  firstName: String,
  lastName: String,
  date: String,
  start: String,
  end: String,
  breaks: [{ name: String, start: String, end: String, paid: Boolean }],
});

async function createSchedule(ScheduleData) {
  let newSchedule = new Schedule(ScheduleData);
  let createdSchedule = await newSchedule.save();
  console.log("trying to create schedule", createdSchedule);
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
async function updateWithName(id, newFirstName, newLastName) {
  return Schedule.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        firstName: newFirstName,
        lastName: newLastName,
      },
      returnDocument: "after",
    }
  );
}

// Item.update(
//   { _id: id },
//   {
//     $set: {
//       name: req.body.name,

//       amount: req.body.amount,

//       done: req.body.done,

//       description: req.body.description,

//       unit: req.body.unit,
//     },
//   }
// );

async function deleteSchedule(id) {
  console.log(id, "id in the model...");
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
