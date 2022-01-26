//Employee profile schema
// const mongoose = require("mongoose");
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

const EmployeeProfile = mongoose.model("employeeProfile",{
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
    unique: true,
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
const createEmployeeProfile = async (EmployeeProfileInfo) => {
  let employeeProfile = new employeeProfileModel(EmployeeProfileInfo);
  let createdProfile = await employeeProfile.save();
  console.log("saving employee profile", createdProfile)
  return employeeProfile.id;
};

const logIn = async (EmployeeProfileInfo) => {
  let employeeProfile = await EmployeeProfile.find({
    email: EmployeeProfileInfo.email,
    password: EmployeeProfileInfo.password,
  });
  return employeeProfile;
};

const listOfEmployees = async () => {
  return employeeProfileModel.find({}).select(["-password"]);
};
const getActiveEmployeeNames = async () => {
  let name = employeeProfileModel
    .find({ status: "active" })
    .select(["firstName", "lastName"]);
  console.log("get names...", name);
  return name;
};
// get Employee Profile by Profile id
const getEmployeeProfileByProfileId = async (employeeProfile_id) => {
  return employeeProfileModel.findById(employeeProfile_id);
};

const findEmployeeByProfileEmail = async (email) => {
  let employeeProfile = await employeeProfileModel.findOne({ email });
  return employeeProfile;
};

// update Employee Profile
const updateEmployeeProfile = async (id, newEmployeeProfile) => {
  let updatedProfile = await employeeProfileModel.findByIdAndUpdate(
    id,
    newEmployeeProfile
  );
  return updatedProfile;
};

// delete Employee Profile
const deleteEmployeeProfile = async (employeeProfile_id) => {
  return true;
};

module.exports = {
  createEmployeeProfile,
  listOfEmployees,
  getEmployeeProfileByProfileId,
  findEmployeeByProfileEmail,
  updateEmployeeProfile,
  deleteEmployeeProfile,
  logIn,
  getActiveEmployeeNames,
};
