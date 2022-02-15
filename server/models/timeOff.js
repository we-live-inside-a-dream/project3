const mongoose = require("./mongooseDb");

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
});

async function createEmployeeTimeOff(employeeTimeOffData) {
  let newEmployeeTimeOff = new EmployeeTimeOff(employeeTimeOffData);
  let createEmployeeTimeOff = await newEmployeeTimeOff.save();
  console.log("saving Time OFF info", employeeTimeOffData);
  return createEmployeeTimeOff.id;
}

// get Employee Profile by Profile id

async function getEmployeeTimeOffByProfileId(id) {
  console.log("from time off model id", id)
  let approvedTimeOff = EmployeeTimeOff.find({
    employeeProfileId: id
  });
  // console.log("timeOffs", approvedTimeOff);
  return approvedTimeOff;
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

module.exports = {
  createEmployeeTimeOff,
  getEmployeeTimeOffByProfileId,
  update,
  listOfTimeOff,
};
