//Employee profile schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
-employeeProfile_ID
-Profile Pic
-First Name
-Last Name
-Email
-Phone number
-Resume/File -> brief summary
*/

const employeeProfile = new mongoose.Schema({
  employeeProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
    type: Number,
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

const hashPassword = (password) => {
  return password;
};

const employeeProfileModel = mongoose.model("EmployeeProfile", employeeProfile);

//create new Employee Profile
const createEmployeeProfile = async (employeeProfileInfo) => {
  // let hashedPassword = hashPassword(employeeProfileInfo.password);
  let employeeProfile = new employeeProfileModel(employeeProfileInfo);
  // try {
  await employeeProfile.save();
  return employeeProfile.id;
  // } catch (error) {
  //   console.error(error);
  //   return false;
  // }
};

const signIn = async (employeeProfileInfo) => {
  let employeeProfile = await employeeProfileModel.find({
    email: employeeProfileInfo.email,
    password: employeeProfileInfo.password,
  });
  return employeeProfile;
};

const listOfEmployees = async () => {
  return employeeProfileModel.find({});
};

// get Employee Profile by Profile id
const getEmployeeProfileByProfileId = async (employeeProfile_id) => {
  return employeeProfileModel.findById(employeeProfile_id);
};
// async function findById(id) {
//   return EmployeeProfile.findById(id);
// }

const findEmployeeByProfileEmail = async (email) => {
  let employeeProfile = await employeeProfileModel.findOne({ email });
  return employeeProfile;
};

// update Employee Profile
const updateEmployeeProfile = (newEmployeeProfile, callback) => {
  employeeProfileModel.findByIdAndUpdate(
    newEmployeeProfile._id,
    newEmployeeProfile,
    { new: true },
    (err, model) => {
      if (err) {
        console.error(err.message);
        return false;
      }
      callback(model);
    }
  );
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
  signIn,
};
