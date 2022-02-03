import React from "react";
const theEventsList = [
  {
    title: "Big sale",
    allDay: true,
    start: "",
    end: "",
    notes: "have product available",
  },
  {
    title: "Jim Bob's birthday party",
    allDay: false,
    start: "8:00",
    end: "6:00",
    notes: "buy a muffin with candle",
  },
];

const HighlightsHeader = function () {
  return theEventsList?.map((theEvent) => {
    return (
      <p>
        {theEvent.title}:{" "}
        {theEvent.allDay
          ? "all day event"
          : `${theEvent.start}- ${theEvent.end}`}
      </p>
    );
  });
};

export default HighlightsHeader;
