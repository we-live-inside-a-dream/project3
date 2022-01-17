//Employee profile schema
const mongoose = require("mongoose");

/*
-User_ID
-Profile Pic
-First Name
-Last Name
-Email
-Phone number
-Resume/File -> brief summary
*/

const employeeProfile = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  phoneNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  profile_picture: {
    type: Buffer,
  },
  resume: {
    type: Buffer,
  },
});

const employeeProfileModel = mongoose.model("EmployeeProfile", employeeProfile);

//create new Employee Profile
const createEmployeeProfile = async (employeeProfileData) => {
  let employeeProfile = new employeeProfileModel(employeeProfileData);
  try {
    await employeeProfile.save();
    return employeeProfile;
  } catch (error) {
    console.error(error);
    return false;
  }
};

//get Employee Profile by Profile id
const getEmployeeProfileByProfileId = async (employeeProfile_id) => {
  return employeeProfileModel.findById(employeeProfile_id);
};

//get Employee Profile by User id
const getEmployeeProfileByUserId = async (userId) => {
  return employeeProfileModel.findOne({ userId }).exec();
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
  getEmployeeProfileByUserId,
  updateEmployeeProfile,
  deleteEmployeeProfile,
};
