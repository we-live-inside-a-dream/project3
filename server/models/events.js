const mongoose = require("./mongooseDb");

const Event = mongoose.model("events", {
  title: {
    type: String,
    required: true,
  },
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
  type: {
    type: [String],
    required: true,
  },
  recurring: {
    type: Boolean,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  allDay: {
    type: Boolean,
  },
  notes: {
    type: String,
  },
  visibility: {
    type: [String],
  },
  mandatory: {
    type: Boolean,
  },
});

async function createEvent(eventData) {
  let newEvent = new Event(eventData);
  let createdEvent = await newEvent.save();
  console.log("saving event info:", createdEvent);
  return createdEvent._id;
}

async function updateEvent(id, updatedEvent) {
  let newEventData = await Event.findByIdAndUpdate(id, updatedEvent);
  console.log("from events model, updated event:", newEventData);
  return newEventData;
}

module.exports = {
  createEvent,
  updateEvent,
};
