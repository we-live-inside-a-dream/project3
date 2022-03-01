const mongoose = require("./mongooseDb");

const BusinessDays = mongoose.model("BusinessDays", {
  dayOfTheWeek: { type: String, unique: true },
  start: { type: String },
  end: { type: String },
  openForBusiness: { Type: Boolean },
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
