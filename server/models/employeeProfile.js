//Employee profile schema
// const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoose = require("./mongooseDb");

/*
-employeeProfile_ID
-Profile Pic
-First Name
-Last Name
-Email
-Phone number
-Resume/File -> brief summary
*/

const EmployeeProfile = mongoose.model("employeeProfile", {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  positions: {
    type: [String],
    required: true,
  },
  permissions: {
    type: [String],
    required: true,
  },
  status: {
    type: [String],
    required: true,
  },
  verified: { type: Boolean, default: false },
});

// const employeeProfileModel = mongoose.model("EmployeeProfile", employeeProfile);

//create new Employee Profile
const createEmployeeProfile = async (employeeProfileInfo) => {
  let permission;
  if (employeeProfileInfo.positions.includes("admin")) {
    permission = "admin";
  } else if (employeeProfileInfo.positions.includes("manager")) {
    permission = "manager";
  } else if (employeeProfileInfo.positions.includes("supervisor")) {
    permission = "supervisor";
  } else permission = "employee";

  let hashedpassword = bcrypt.hashSync(employeeProfileInfo.password, 10);
  let newEmployeeProfile = new EmployeeProfile({
    ...employeeProfileInfo,
    password: hashedpassword,
    permissions: permission,
  });
  let createdProfile = await newEmployeeProfile.save();
  console.log("saving employee profile", createdProfile);
  return createdProfile._id;
};

const logIn = async (user) => {
  let employeeProfile = await EmployeeProfile.findOne({
    email: user.email,
  });
  return employeeProfile;
};

const listOfEmployees = async () => {
  return EmployeeProfile.find({ status: { $ne: "inactive" } }).select([
    "-password",
  ]);
};
const getActiveEmployeeNames = async () => {
  let name = EmployeeProfile.find({ status: { $ne: "inactive" } }).select([
    "firstName",
    "lastName",
    "_id",
  ]);
  // console.log("get names...", name);
  return name;
};

const getActiveEmployeePositions = async () => {
  let name = EmployeeProfile.find({ status: { $ne: "inactive" } }).select([
    "positions",
    "_id",
    "firstName",
  ]);
  // console.log("get names...", name);
  return name;
};
// get Employee Profile by Profile id
const getEmployeeProfileByProfileId = async (employeeProfile_id) => {
  return EmployeeProfile.findById(employeeProfile_id);
};

const findPositionsByEmployeeId = async function (id) {
  console.log(
    "from employee model, looking up positions for employee with id: ",
    id
  );
  let employee = await EmployeeProfile.findById(id);
  console.log(
    "from employee profile model, employee positions are",
    employee.positions
  );
  return employee.positions;
};

const findEmployeeByProfileEmail = async (email) => {
  let employeeProfile = await EmployeeProfile.findOne({ email });
  return employeeProfile;
};

// update Employee Profile
const updateEmployeeProfile = async (id, newEmployeeProfile) => {
  let updatedProfile = await EmployeeProfile.findByIdAndUpdate(
    id,
    newEmployeeProfile
  );
  return updatedProfile;
};

// delete Employee Profile

module.exports = {
  createEmployeeProfile,
  listOfEmployees,
  getEmployeeProfileByProfileId,
  findEmployeeByProfileEmail,
  updateEmployeeProfile,
  logIn,
  findPositionsByEmployeeId,
  EmployeeProfile,
  getActiveEmployeeNames,
  getActiveEmployeePositions,
};
