const mongoose = require("mongoose");

//Mongo Model - Availabilities
// Employee Name, Hour per Week
const availability = new mongoose.Schema({
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
  hoursPerWeek: {
    type: Number,
    required: true,
  },
  availability: [
    {
      start_time: {
        type: Number,
      },
      end_time: {
        type: Number,
      },
      availableDays: {
        type: [String],
      },
    },
  ],
});

const availabilityModel = mongoose.model("Availability", availability);

const createAvailability = async (availabilityData) => {
  let availability = new availabilityModel(availabilityData);
  try {
    await availability.save();
    return availability;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getAvailabilityByEmployeeProfileId = async (employeeProfile_id) => {
  return availabilityModel.findOne({ employeeProfile_id }).exec();
};

const availabilityList = async () => {
  return availabilityModel.find({});
};

const updateAvailability = (newAvailability, callback) => {
  availabilityModel.findByIdAndUpdate(
    newAvailability._id,
    newAvailability,
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

const deleteAvailability = async (profile_id) => {
  return availability.findByIdAndDelete(profile_id);
};

module.exports = {
  createAvailability,
  updateAvailability,
  getAvailabilityByEmployeeProfileId,
  availabilityList,
  deleteAvailability,
};
