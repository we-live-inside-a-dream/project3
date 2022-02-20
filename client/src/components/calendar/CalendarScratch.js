import React, { useEffect, useState, useContext } from "react";
import Day from "./Day";
import CalendarDateHeader from "./CalendarDateHeader";
import moment from "moment";
import AuthenticationContext from "../login/AuthenticationContext";
import EventViewDiv from "./EventViewDiv";
import EventEditForm from "../events/EventEditForm";
import Modal from "../reusable/Modal";

const CalendarScratch = function ({ setCurrentTab, currentTab }) {
  const [revealEventDetails, setRevealEventDetails] = useState(false);
  const [eventToReveal, setEventToReveal] = useState(null);
  const [nav, setNav] = useState(0);
  const [dateDisplay, setDateDisplay] = useState("");
  const [days, setDays] = useState([]);
  const [monthStart, setMonthStart] = useState();
  const [monthEnd, setMonthEnd] = useState();
  const [allEvents, setAllEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [everyEventList, setEveryEventList] = useState([]);
  const [existingValues, setExistingValues] = useState();
  const authContext = useContext(AuthenticationContext);
  const [isOpen, setIsOpen] = useState(false);
  const [eventId, setEventId] = useState("");
  let user = authContext.user;
  let permissions = user?.permissions;

  //sets titles of calendar days
  const weekdayHeaders = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const theDate = new Date();
    //nav sets the current page.  0 = this month.  incremements by 1 each next or previou
    if (nav !== 0) {
      theDate.setMonth(new Date().getMonth() + nav);
    }
    //setting date variables
    const day = theDate.getDate();
    const month = theDate.getMonth();
    const year = theDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    setMonthEnd(moment(lastDayOfMonth).format("yyyy-MM-DD"));
    setMonthStart(moment(firstDayOfMonth).format("yyyy-MM-DD"));
    setDateDisplay(
      `${theDate.toLocaleDateString("en-us", { month: "long" })} ${year}`
    );
    //sorts out days before current months starts if start date is not monday
    const paddingDays = weekdayHeaders.indexOf(dateString.split(", ")[0]);
    const daysArray = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;
      if (i > paddingDays) {
        daysArray.push({
          value: i - paddingDays,
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        });
      } else {
        daysArray.push({
          value: "padding",
          isCurrentDay: false,
          date: "",
        });
      }
    }
    //setting all days oc current month
    setDays(daysArray);
    //gathering all event for current month
    const getEventsAll = async function () {
      let allEventsList = await fetch(
        `/api/events/event/get-by-month?start=${monthStart}&end=${monthEnd}`
      );
      let eventsList = await allEventsList.json();

      let filteredEvents = eventsList?.filter((e) =>
        e?.visibility?.includes(permissions)
      );
      let myFilteredEvents = eventsList?.filter(
        (e) =>
          e?.visibility?.includes("user") && e?.employeeProfileId === user._id
      );
      setAllEvents(filteredEvents);
      setMyEvents(myFilteredEvents);
      setEveryEventList([...filteredEvents, ...myFilteredEvents]);
    };
    getEventsAll();
  }, [nav, monthEnd, monthStart, permissions, user._id]);

  let mainGridStyle = {
    height: "auto",
    width: "100%",
    margin: "auto",
    display: "flex",
    flexWrap: "wrap",
    border: "1px solid black",
  };
  //function used on each day of the calendar to filter events for that date
  let renderEvents = function (day) {
    if (day) {
      let formattedDay = moment(new Date(day.date)).format("yyyy-MM-DD");
      let dayEvents = everyEventList?.filter((event) => {
        return event.startDate >= formattedDay && event.endDate <= formattedDay;
      });

      return dayEvents;
    }
  };

  return (
    <div
      id="container"
      style={{
        width: "95%",
        border: "1px solid white",
        margin: "auto",
      }}
    >
      {revealEventDetails === true && (
        <EventViewDiv
          eventToReveal={eventToReveal}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          setEventId={setEventId}
          eventId={setEventId}
          setExistingValues={setExistingValues}
          onClose={() => setRevealEventDetails(false)}
        />
      )}

      <CalendarDateHeader
        dateDisplay={dateDisplay}
        onNext={() => setNav(nav + 1)}
        onBack={() => setNav(nav - 1)}
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
      />
      <div
        id="weekdays"
        style={{
          backgroundColor: "var(--mainHeader)",
          display: "flex",
          width: "100%",
          height: "60px",
          color: "var(--headerWhiteFont)",
        }}
      >
        {weekdayHeaders.map((day, index) => {
          return (
            <div
              key={index}
              style={{
                width: "14.25%",
                padding: ".6%",
                textAlign: "center",
                fontWeight: "500",
                fontSize: "larger",
                alignContent: "center",
                margin: "auto",
                textTransform: "uppercase",
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div style={{ mainGridStyle }}>
        <div
          id="calendar"
          style={{
            width: "100%",
            margin: "auto",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {days?.map((day, index) => (
            <Day
              key={index}
              day={day}
              // onClick={() => setIsOpen(!isOpen)}
              events={renderEvents(day)}
              setRevealEventDetails={setRevealEventDetails}
              revealEventDetails={revealEventDetails}
              eventToReveal={eventToReveal}
              setEventToReveal={setEventToReveal}
              setEventId={setEventId}
              eventId={setEventId}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          ))}
        </div>
      </div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <EventEditForm
          eventId={eventId}
          existingValues={existingValues}
          onClose={() => setIsOpen(false)}
          // deleteEvent={() => setDeleteEvent(true)}
        />
        **edit**
      </Modal>
    </div>
  );
};

export default CalendarScratch;
