const mongoose = require("./mongooseDb");

//Mongo Model - Availabilities
// Employee Name, Hour per Week
const availability = new mongoose.Schema({
  employeeProfileId: {
    type: Number,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  maxHoursPerWeek: {
    type: Number,
  },
  days: [
    {
      // monday: {
      day: String,
      allDay: Boolean,
      start: Number,
      end: Number,
      // },
    },
  ],
  //   {
  //     tuesday: {
  //       allDay: Boolean,
  //       start: Number,
  //       end: Number,
  //     },
  //   },
  //   {
  //     wednesday: {
  //       allDay: Boolean,
  //       start: Number,
  //       end: Number,
  //     },
  //   },
  //   {
  //     thursday: {
  //       allDay: Boolean,
  //       start: Number,
  //       end: Number,
  //     },
  //   },
  //   {
  //     friday: {
  //       allDay: Boolean,
  //       start: Number,
  //       end: Number,
  //     },
  //   },
  //   {
  //     saturday: {
  //       allDay: Boolean,
  //       start: Number,
  //       end: Number,
  //     },
  //   },
  //   {
  //     sunday: {
  //       allDay: Boolean,
  //       start: Number,
  //       end: Number,
  //     },
  //   },
  // ],
});

const Availability = mongoose.model("Availability", availability);

const createAvailability = async (availabilityData) => {
  let availability = new Availability(availabilityData);
  try {
    await availability.save();
    return availability;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getAvailabilityByEmployeeProfileId = async (employeeProfile_id) => {
  return Availability.findOne({ employeeProfile_id }).exec();
};

const availabilityList = async () => {
  return Availability.find({});
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
