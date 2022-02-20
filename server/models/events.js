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
  let eventsList = await Event.find({ visibility: "employee" });
  return eventsList;
}

async function updateEvent(id, updatedEvent) {
  console.log("FROM THE MODEL", id, updatedEvent);
  await Event.findByIdAndUpdate(id, updatedEvent, {
    returnDocument: "after",
  });
  // return theUpdatedEvent;
}

async function deleteEvent(id) {
  await Event.findByIdAndDelete(id);
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
  deleteEvent,
};
