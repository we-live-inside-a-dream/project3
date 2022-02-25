const mongoose = require("./mongooseDb");

const BusinessDays = mongoose.model("BusinessDays", {

  monday: {
    openForBusiness: Boolean,
    start: { type: String },
    end: { type: String },
  },
  tuesday: {
    openForBusiness: Boolean,
    start: { type: String },
    end: { type: String },
  },
  wednesday: {
    openForBusiness: Boolean,
    start: { type: String },
    end: { type: String },
  },
  thursday: {
    openForBusiness: Boolean,
    start: { type: String },
    end: { type: String },
  },
  friday: {
    openForBusiness: Boolean,
    start: { type: String },
    end: { type: String },
  },
  saturday: {
    openForBusiness: Boolean,
    start: { type: String },
    end: { type: String },
  },
  sunday: {
    openForBusiness: Boolean,
    start: { type: String },
    end: { type: String },
  },
});

async function createBusinessDay(businessDaysData) {
  let newBusinessDay = new BusinessDays(businessDaysData);
  let createBusinessDay = await newBusinessDay.save();
  console.log("saving new business day", businessDaysData);
  return createBusinessDay.id;
}

async function update(id,)
return BusinessDays.findByIdAndUpdate(id)


async function deleteBusinessDay(id)
return BusinessDays.findByIdAndDelete(id)


module.exports = {
    createBusinessDay,
    update,
    deleteBusinessDay
}
