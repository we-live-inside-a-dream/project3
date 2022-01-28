const mongoose = require("./mongooseDb");
const moment = require("moment");
//Mongo Model - Availabilities
// Employee Name, Hour per Week
const availability = new mongoose.Schema({
  // profileId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "employeeProfile",
  // },
  employeeProfileId: {
    type: String,
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
      dayName: String,
      available: Boolean,
      allDay: Boolean,
      start: Number,
      end: Number,
    },
  ],
});

const dayArray = [
  {
    dayName: "monday",
    available: false,
    allDay: false,
    start: 0,
    end: 0,
  },
  {
    dayName: "tuesday",
    available: false,
    allDay: false,
    start: 0,
    end: 0,
  },
  {
    dayName: "wednesday",
    available: false,
    allDay: false,
    start: 0,
    end: 0,
  },
  {
    dayName: "thursday",
    available: false,
    allDay: false,
    start: 0,
    end: 0,
  },
  {
    dayName: "friday",
    available: false,
    allDay: false,
    start: 0,
    end: 0,
  },
  {
    dayName: "saturday",
    available: false,
    allDay: false,
    start: 0,
    end: 0,
  },
  {
    dayName: "sunday",
    available: false,
    allDay: false,
    start: 0,
    end: 0,
  }
];

const Availability = mongoose.model("Availability", availability);

const createAvailability = async (id, firstName, lastName) => {
  let availability = new Availability({
    employeeProfileId: id,
    firstName: firstName,
    lastName: lastName,
    maxHoursPerWeek: 0,
    days: dayArray,
  });
  try {
    await availability.save();
    return availability;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getAvailabilityById = async (id) => {
  return Availability.findOne({_id:id});
};
const getAvailabilityByEmployeeProfileId = async (id) => {
  return Availability.findOne({employeeProfileId:id});
};

//returns entire list of employees and availabilities
const listOfEmployeesAvailabilities = async () => {
  console.log("from Availability model");
  return Availability.find({});
};
async function updateAvailabilityById(id,updatedAvailability) {
  let newAvailability = await Availability.findByIdAndUpdate(
    id,
    updatedAvailability,
    {returnDocument: "after",}
  );

  console.log(
    "from availability model, updated availability is",
    newAvailability
);
  return newAvailability;
}

async function weeklyAvailibility(start) {
  // console.log("FROM MODEL, THIS IS THE WEEK", week);
  let end = moment(start)
    .add(6, "days")
    .startOf("day")
    .format("dddd, Do")
    .toString();
  let weekList = Availability.find({
    date: { $gte: start, $lte: end },
  });
  // console.log("from scheduleModel: ", weekList);
  return weekList;
}
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
  createAvailability,
  updateAvailabilityById,
  getAvailabilityById,
  // availabilityList,
  // deleteAvailability,
  listOfEmployeesAvailabilities,
  getAvailabilityByEmployeeProfileId,
};
