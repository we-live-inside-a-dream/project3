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
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  positions: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

// const employeeProfileModel = mongoose.model("EmployeeProfile", employeeProfile);

//create new Employee Profile
const createEmployeeProfile = async (employeeProfileInfo) => {
  let hashedpassword = bcrypt.hashSync(employeeProfileInfo.password, 8);
  let newEmployeeProfile = new EmployeeProfile({
    ...employeeProfileInfo,
    password: hashedpassword,
  });
  let createdProfile = await newEmployeeProfile.save();
  console.log("saving employee profile", createdProfile);
  return createdProfile.id;
};

const logIn = async (user) => {
  let employeeProfile = await EmployeeProfile.find({
    email: user.email,
    password: user.password,
  });
  return employeeProfile;
};

const listOfEmployees = async () => {
  return EmployeeProfile.find({}).select(["-password"]);
};
const getActiveEmployeeNames = async () => {
  let name = EmployeeProfile.find({ status: "active" }).select([
    "firstName",
    "lastName",
    "_id",
  ]);
  // console.log("get names...", name);
  return name;
};
// get Employee Profile by Profile id
const getEmployeeProfileByProfileId = async (employeeProfile_id) => {
  return EmployeeProfile.findById(employeeProfile_id);
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
  getActiveEmployeeNames,
};
