import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StyledCalendar from "./StyledCalendar";
// import CalendarNewShiftForm from "./CalendarNewShiftForm";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    id: 1,
    name: "Julie",
    title: "8-4",
    allDay: false,
    start: new Date(2022, 1, 15),
    end: new Date(2022, 1, 15),
    position: "cashier",
  },
  {
    id: 2,
    name: "Reza",
    title: "9-5",
    allDay: false,
    start: new Date(2022, 1, 7),
    end: new Date(2022, 1, 7),
    position: "driver",
  },
  {
    id: 3,
    name: "Derek",
    title: "9-12",
    allDay: false,
    start: new Date(2022, 1, 11),
    end: new Date(2022, 1, 11),
    position: "sales",
  },
  {
    id: 4,
    name: "Brian",
    title: "9-6",
    allDay: false,
    start: new Date(2022, 1, 11),
    end: new Date(2022, 1, 11),
    position: "sales",
  },
];

function CalendarComponent() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }
  return (
    <div>
      <h1>Calendar</h1>
      <StyledCalendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
}

export default CalendarComponent;
