import React, { useState } from "react";

const Day = ({
  day,
  onClick,
  events,
  setRevealEventDetails,
  revealEventDetails,
  setEventToReveal,
  eventToReveal,
  setXScreenCoord,
  setYScreenCoord,
  xScreenCoord,
  yScreenCoord,
  // setScreenCoordinates,
}) => {
  // const [xScreenCoord, setXScreenCoord] = useState();
  // const [yScreenCoord, setYScreenCoord] = useState();
  const className = `day ${day.value === "padding" ? "padding" : ""} ${
    day.isCurrentDay ? "currentDay" : ""
  }`;
  const borderColor = function (value) {
    if (value !== "padding") {
      return " 1px solid lightGrey";
    } else return " 1px solid white";
  };
  // const eventTypeColor = function (event) {
  //   if (event.visibility.includes("user")) {
  //     return "var(--accentColorTitle)";
  //   } else return "var(--styledButtonHoverBorder)";
  // };
  const eventDivStyle = {
    backgroundColor: "var(--accentColorTitle)",
    padding: "0px, 5px",
    margin: "2px 5px",
    borderRadius: "3px",
    overflow: "hidden",
    wrap: "none",
    overflowWrap: "normal",
    whiteSpace: "nowrap",
  };
  const showEvent = function (event) {
    console.log("THE EVENT FROM SHOW EVERN", event);
    setEventToReveal(event);
    setRevealEventDetails(!revealEventDetails);
  };

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        width: "14%",
        height: "130px",
        cursor: "pointer",
        boxSizing: "borderBox",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        border: borderColor(day.value),
      }}
    >
      {day.value === "padding" ? "" : day.value}

      {events?.map((e, index) => {
        return (
          <div
            key={index}
            style={eventDivStyle}
            onClick={() => {
              // setEventToReveal(e);
              showEvent(e);
            }}
          >
            <p
              style={{
                color: "white",
                padding: "0px 3px",
                marginTop: "2px",
                marginBottom: "2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {e.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default Day;
