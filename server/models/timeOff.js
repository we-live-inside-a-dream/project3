const mongoose = require("./mongooseDb");
const moment = require("moment");

const EmployeeTimeOff = mongoose.model("employeeTimeOff", {
  type: {
    type: String,
    required: true,
  },
  employeeProfileId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },

  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  allDay: {
    type: Boolean,
  },
  comment: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  managerComment: String,
});

async function createEmployeeTimeOff(employeeTimeOffData) {
  let newEmployeeTimeOff = new EmployeeTimeOff(employeeTimeOffData);
  let createEmployeeTimeOff = await newEmployeeTimeOff.save();
  // console.log("saving Time OFF info", employeeTimeOffData);
  return createEmployeeTimeOff.id;
}

// get Employee Profile by Profile id

async function getEmployeeTimeOffByProfileId(id) {
  // console.log("from time off model id", id);
  let approvedTimeOff = EmployeeTimeOff.find({
    employeeProfileId: id,
  });
  // console.log("timeOffs", approvedTimeOff);
  return approvedTimeOff;
}

async function getWeeklyTimeOffs(start) {
  // console.log("from time off model, week starting", start);
  let end = moment(start)
    .add(6, "days")
    .startOf("day")
    .format("dddd, Do")
    .toString();
  let weekList = EmployeeTimeOff.find({
    date: { $gte: start, $lte: end },
  });
  // console.log("from time off Model: ", weekList);
  return weekList;
}
//get all timeOffs
const listOfTimeOff = async () => {
  return EmployeeTimeOff.find({});
};
//update timeOffs
async function update(id, timeOffApproval) {
  return EmployeeTimeOff.findByIdAndUpdate(id, timeOffApproval, {
    returnDocument: "after",
  });
}

// async function deleteTimeOff(id) {
//   console.log("id from model", id)
//   return EmployeeTimeOff.findByIdAndDelete({_id: id})
// }

async function deleteTimeOff(id) {
  console.log("from time off Model", id);
  return EmployeeTimeOff.findByIdAndDelete(id);
}

module.exports = {
  createEmployeeTimeOff,
  getEmployeeTimeOffByProfileId,
  getWeeklyTimeOffs,
  update,
  listOfTimeOff,
  deleteTimeOff,
};
