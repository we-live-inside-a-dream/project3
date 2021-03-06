const { Timestamp } = require("mongodb");
const mongoose = require("./mongooseDb");
const moment = require("moment");

const Schedule = mongoose.model("schedule", {
  employeeId: String,
  firstName: String,
  lastName: String,
  date: String,
  start: String,
  end: String,
  position: String,
  breaks: [{ name: String, start: String, end: String, paid: Boolean }],
  swapRequestStatus: String,
  swapRequestDate: Date,
  swapBidRequest: String,
  reasonForSwap: String,
  shiftBidId: String,
  bidRequestDate: Date,
  approvingManagerId: String,
  previousShiftOwnerId: String,
  previousShiftOwnerFirstName: String,
  previousShiftOwnerLastName: String,
  bidderFirstName: String,
  bidderLastName: String,
  managerMessage: String,
});

async function createSchedule(ScheduleData) {
  let newSchedule = new Schedule(ScheduleData);
  let createdSchedule = await newSchedule.save();
  // console.log("trying to create schedule", createdSchedule);
  return createdSchedule.id;
}

// {date:{$gte:ISODate("2021-01-01"),$lte:ISODate("2020-05-01"}}

async function listScheduleByDay(day) {
  // console.log("from model,", day);
  return Schedule.find({ date: day });
}
async function listScheduleByWeek(start, end) {
  return Schedule.find({ date: { $gte: ISODate(start), $lte: ISODate(end) } });
}

async function listByWeekDays(start) {
  // console.log("FROM MODEL, THIS IS THE WEEK", week);
  let end = moment(start)
    .add(6, "days")
    .startOf("day")
    .format("dddd, Do")
    .toString();
  let weekList = Schedule.find({
    date: { $gte: start, $lte: end },
  }).sort({ date: 1 });
  // console.log("from scheduleModel: ", weekList);
  return weekList;
}
async function listScheduleByMonth(month) {
  return Schedule.find({ date: month });
}

async function findById(id) {
  return Schedule.findById(id);
}
async function findByEmployeeProfileId(id, today) {
  return Schedule.find({ employeeId: id, date: { $gte: today } }).sort({
    date: 1,
  });
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

async function deleteSchedule(id) {
  // console.log(id, "id in the model...");
  return Schedule.findByIdAndDelete(id);
}

////////////////////////////////SCHEDULE MODEL FUNCTIONS FOR SHIFT SWAPPING/////////////////////////
async function findAvailableShiftsByEmployeePositions(positions) {
  let today = moment().format("yyyy-MM-DD");
  console.log(
    "from schedule model, positions before search are",
    positions,
    today,
    "for employee with id"
  );
  let shiftArray = [];

  for (position of positions) {
    let shifts = await Schedule.find({
      position: positions,
      swapRequestStatus: "pending",
      date: { $gte: today },
    });
    shiftArray = [...shifts];
  }
  return shiftArray;
}

async function findAllEmployeeSwapRequests() {
  let today = moment().format("yyyy-MM-DD");
  let shiftSwapList = Schedule.find({
    date: { $gte: today },
    swapRequestStatus: "pending",
    swapBidRequest: "pending",
  }).sort({ date: 1 });
  return shiftSwapList;
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

module.exports = {
  createSchedule,
  listScheduleByDay,
  listScheduleByWeek,
  listScheduleByMonth,
  findById,
  findByEmployeeProfileId,
  findAvailableShiftsByEmployeePositions,
  update,
  deleteSchedule,
  listByWeekDays,
  findAllEmployeeSwapRequests,
};
