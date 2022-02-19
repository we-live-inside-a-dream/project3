import React, { useEffect, useState, useContext } from "react";
import Day from "./Day";
import CalendarDateHeader from "./CalendarDateHeader";
import moment from "moment";
import AuthenticationContext from "../login/AuthenticationContext";
// import StyledScheduleButtonGroup from "../schedules/StyledScheduleButtonGroup";

const CalendarScratch = function ({ setCurrentTab, currentTab }) {
  const [nav, setNav] = useState(0);
  const [dateDisplay, setDateDisplay] = useState("");
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  // const [weekdayHeaders, setWeekdayHeaders] = useState([]);
  const [monthStart, setMonthStart] = useState();
  const [monthEnd, setMonthEnd] = useState();
  const [allEvents, setAllEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);

  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;
  let permissions = user?.permissions;
  console.log("this is permissions", permissions);

  // const eventForDate = (date) => events.find((e) => e.date === date);

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
    if (nav !== 0) {
      theDate.setMonth(new Date().getMonth() + nav);
    }
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
    const weekdayHeaders = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const paddingDays = weekdayHeaders.indexOf(dateString.split(", ")[0]);
    const daysArray = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;
      if (i > paddingDays) {
        daysArray.push({
          value: i - paddingDays,
          // event: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        });
      } else {
        daysArray.push({
          value: "padding",
          // event: null,
          isCurrentDay: false,
          date: "",
        });
      }
    }
    setDays(daysArray);
    console.log("MONTH start and end", monthStart, monthEnd);
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
      console.log("this is filteredEvents", filteredEvents);
      console.log("this is myEvents", myFilteredEvents);
      setAllEvents(filteredEvents);
      setMyEvents(myFilteredEvents);
    };
    getEventsAll();
  }, [nav, monthEnd, monthStart]);
  console.log("these are my events ****************", myEvents);
  console.log("THIs IS THE EVENTS LIST allEvents **************", allEvents);

  console.log("first day of month", monthStart);
  console.log("last Day of the month", monthEnd);

  let mainGridStyle = {
    // width: "91%",
    height: "auto",
    width: "100%",
    margin: "auto",
    display: "flex",
    flexWrap: "wrap",
    border: "1px solid black",
  };

  return (
    <div
      id="container"
      style={{ width: "95%", border: "1px solid white", margin: "auto" }}
    >
      {allEvents?.map((e) => {
        return <p key={e._id}>{e.title}</p>;
      })}
      {myEvents?.map((e) => {
        return <p key={e._id}>{e.title}</p>;
      })}
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
          {days.map((day, index) => (
            <Day
              key={index}
              day={day}
              // onClick={() => {
              //   setSelectedDay(day.date);
              // }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarScratch;
