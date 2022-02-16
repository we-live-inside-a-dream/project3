import React, { useEffect, useState } from "react";
import Day from "./Day";
import CalendarDateHeader from "./CalendarDateHeader";
import StyledScheduleButtonGroup from "../schedules/StyledScheduleButtonGroup";

const CalendarScratch = function ({ setCurrentTab, currentTab }) {
  const [nav, setNav] = useState(0);
  const [dateDisplay, setDateDisplay] = useState("");
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [weekdayHeaders, setWeekdayHeaders] = useState([]);

  // const eventForDate = (date) => events.find((e) => e.date === date);

  useEffect(() => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setWeekdayHeaders(weekdays);
    const theDate = new Date();
    if (nav !== 0) {
      theDate.setMonth(new Date().getMonth() + nav);
    }
    const day = theDate.getDate();
    const month = theDate.getMonth();
    const year = theDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    setDateDisplay(
      `${theDate.toLocaleDateString("en-us", { month: "long" })} ${year}`
    );

    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
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
  }, [nav]);

  let mainGridStyle = {
    // width: "91%",
    height: "auto",
    width: "100%",
    margin: "auto",
    display: "flex",
    flexWrap: "wrap",
    border: "1px solid black",
  };
  console.log(days);
  return (
    <div
      id="container"
      style={{ width: "95%", border: "1px solid white", margin: "auto" }}
    >
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
