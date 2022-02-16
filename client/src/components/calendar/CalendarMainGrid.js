import React from "react";
import Day from "./Day";

let style = {
  width: "90%",
  height: "auto",
  gridTemplateColumns: "1fr, 1fr, 1fr, 1fr, 1fr, 1fr, 1fr",
  border: "1px, solid black",
};

function CalendarMainGrid({ daysArray }) {
  return (
    <div style={style}>
      {daysArray?.map((day, index) => {
        return <Day />;
      })}
    </div>
  );
}

export default CalendarMainGrid;
