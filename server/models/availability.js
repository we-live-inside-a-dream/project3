const mongoose = require("mongoose");

//Mongo Model - Availabilities
// Employee Name, Hour per Week
const availabilitySchema = new mongoose.Schema({
  //   userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "EmployeeProfile",
  //     required: true,
  //   },
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
      start_day: {
          type: Date,
        },
      end_day: {
          type: Date,
      },
    },
  ],
});

const availabilityModel = mongoose.model("Availability", availabilitySchema);

const createAvailability = async (availabilityInfo) => {
  let availability = new availabilityModel(availabilityInfo);
  try {
    await availability.save();
    return availability;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getAvailabilityByEmployeeProfileId = async (employeeProfile_id) => {
  return availabilityModel.findById(employeeProfile_id);
};

const getAvailabilityByUserId = async (userId) => {
  return availabilityModel.findOne({ userId }).exec();
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
  return true;
};

module.exports = {
  createAvailability,
  updateAvailability,
  getAvailabilityByEmployeeProfileId,
  getAvailabilityByUserId,
  deleteAvailability,
};
