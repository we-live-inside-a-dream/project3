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
async function findEventsForEmployees() {
  let eventsList = await Event.find({ visibility: "employees" });
  return eventsList;
}

async function updateEvent(id, updatedEvent) {
  let newEventData = await Event.findByIdAndUpdate(id, updatedEvent);
  console.log("from events model, updated event:", newEventData);
  return newEventData;
}
// async function findEventsByPermission(permission) {
//   let eventsList;
//   if (permission === "employee") {
//     eventsList = Event.find({ visibility: "employee" });
//   } else if (permission === "supervisor") {
//     eventsList = Event.find({ visibility: ["supervisor", "employee"] });
//   } else if (permission === "manager") {
//     eventsList = Event.find({
//       visibility: ["employee", "supervisor", "manager"],
//     });
//   } else if (permission === "admin") {
//     eventsList = Event.find({
//       visibility: ["employee", "supervisor", "manager", "admin"],
//     });
//   } else return null;
//   return eventsList;
// }

async function findEventsByDates(start, end) {
  let monthEventData = await Event.find({
    $or: [
      { startDate: { $gte: start, $lte: end } },
      { endDate: { $gte: start, $lte: end } },
    ],
  });

  console.log("list of events from  events.js");
  return monthEventData;
}

module.exports = {
  createEvent,
  updateEvent,
  findEventsForEmployees,
  // findEventsByPermission,
  findEventsByDates,
};
