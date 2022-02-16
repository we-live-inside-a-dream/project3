import React from "react";

const Day = ({ day, onClick }) => {
  const className = `day ${day.value === "padding" ? "padding" : ""} ${
    day.isCurrentDay ? "currentDay" : ""
  }`;
  const borderColor = function (value) {
    if (value !== "padding") {
      return " 1px solid lightGrey";
    } else return " 1px solid white";
  };

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        width: "11%",
        padding: "10px",
        height: "130px",
        cursor: "pointer",
        boxSizing: "borderBox",
        backgroundColor: "white",
        margin: ".6%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "spaceBetween",
        border: borderColor(day.value),
      }}
    >
      {day.value === "padding" ? "" : day.value}

      {day.event && <div className="event">{day.event.title}</div>}
    </div>
  );
};
export default Day;
