const mongoose = require("./mongooseDb");

//Mongo Model - Availabilities
// Employee Name, Hour per Week
const availability = new mongoose.Schema({
  // employeeProfileId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  employeeProfileId: {
    type: Number,
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
  maxHoursPerWeek: {
    type: Number,
  },
  days: [
    {
      day: String,
      availavle: Boolean,
      allDay: Boolean,
      start: Number,
      end: Number,
    },
  ],
});

const Availability = mongoose.model("Availability", availability);

// const createAvailability = async (availabilityData) => {
//   let availability = new Availability(availabilityData);
//   try {
//     await availability.save();
//     return availability;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };

// const getAvailabilityByEmployeeProfileId = async (employeeProfileId) => {
//   return Availability.findOne({ employeeProfileId }).exec();
// };

//returns entire list of employees and availabilities
const listOfEmployeesAvailabilities = async () => {
  console.log("from Availability model");
  return Availability.find({});
};

// const updateAvailability = (newAvailability, callback) => {
//   Availability.findByIdAndUpdate(
//     newAvailability._id,
//     newAvailability,
//     { new: true },
//     (err, model) => {
//       if (err) {
//         console.error(err.message);
//         return false;
//       }
//       callback(model);
//     }
//   );
// };

// const deleteAvailability = async (employeeProfile_id) => {
//   return Availability.findByIdAndDelete(employeeProfile_id);
// };

module.exports = {
  // createAvailability,
  // updateAvailability,
  // getAvailabilityByEmployeeProfileId,
  // availabilityList,
  // deleteAvailability,
  listOfEmployeesAvailabilities,
};
