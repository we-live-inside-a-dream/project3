const mongoose = require("./mongooseDb");

const BusinessDays = mongoose.model("BusinessDays", {
  // monday: {
  //   openForBusiness: Boolean,
  //   start: { type: String },
  //   end: { type: String },
  // },
  dayOfTheWeek: { type: String, unique: true },
  start: { type: String },
  end: { type: String },
  openForBusiness: Boolean,
  // },
  // wednesday: {
  //   openForBusiness: Boolean,
  //   start: { type: String },
  //   end: { type: String },
  // },
  // thursday: {
  //   openForBusiness: Boolean,
  //   start: { type: String },
  //   end: { type: String },
  // },
  // friday: {
  //   openForBusiness: Boolean,
  //   start: { type: String },
  //   end: { type: String },
  // },
  // saturday: {
  //   openForBusiness: Boolean,
  //   start: { type: String },
  //   end: { type: String },
  // },
  // sunday: {
  //   openForBusiness: Boolean,
  //   start: { type: String },
  //   end: { type: String },
  // },
});

async function createBusinessDay(businessDaysData) {
  let newBusinessDay = new BusinessDays(businessDaysData);
  let createBusinessDay = await newBusinessDay.save();
  console.log("saving new business day", businessDaysData);
  return createBusinessDay.id;
}

async function updateBusinessDaysByDay(dayOfWeek, dayData) {
  let businessDay = await BusinessDays.findOneAndUpdate(dayOfWeek, dayData);
  return businessDay;
}

const listOfBusinessDays = async () => {
  return BusinessDays.find({});
};

async function deleteBusinessDay(dayOfWeek) {
  console.log("this is the Id coming from model", dayOfWeek);
  return BusinessDays.findOneAndDelete(dayOfWeek);
}

module.exports = {
  createBusinessDay,
  updateBusinessDaysByDay,
  deleteBusinessDay,
  listOfBusinessDays,
};
