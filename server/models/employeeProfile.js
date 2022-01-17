//Employee profile schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema

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
    ref: "employeeProfile",
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
  Position: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: Buffer,
  },
  resume: {
    type: Buffer,
  },
});

const hashPassword = (password) => {
  return password;
};

let hashedPassword = hashPassword(employeeProfileData.password);

const employeeProfileModel = mongoose.model("EmployeeProfile", employeeProfile);

//create new Employee Profile
const createEmployeeProfile = async (employeeProfileData) => {
  let hashedPassword = hashPassword(employeeProfileData.password);
  let employeeProfile = new employeeProfileModel(employeeProfileData);
  try {
    await employeeProfile.save();
    return employeeProfile;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const signIn = async (employeeProfileData) => {
  let employeeProfile = await employeeProfileModel.find({
    email: employeeProfileData.email,
    password: employeeProfileData.password,
  });
  return employeeProfile;
};

//get Employee Profile by Profile id
const getEmployeeProfileByProfileId = async (employeeProfile_id) => {
  return employeeProfileModel.findById(employeeProfile_id);
};

const findUserByProfileEmail = async (email) => {
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
const deleteEmployeeProfile = async (profile_id) => {
  return true;
};

module.exports = {
  createEmployeeProfile,
  getEmployeeProfileByProfileId,
  findUserByProfileEmail,
  updateEmployeeProfile,
  deleteEmployeeProfile,
  signIn
};
