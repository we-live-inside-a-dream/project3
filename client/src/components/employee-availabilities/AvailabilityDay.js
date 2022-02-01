import React from "react";
import { useState, useEffect } from "react";
import {
  StyledCheck,
  StyledTimeDate,
} from "../reusable/Inputs/StyledEmployeeForm";

function AvailabilityDay({ day, availability, setAvailability, index }) {
  const [available, setAvailable] = useState(day.available);
  const [start, setStart] = useState(day.start);
  const [end, setEnd] = useState(day.end);
  const [allDay, setAllDay] = useState(day.allDay);

  useEffect(() => {
    let isMounted = true;
    const newAvailability = { ...availability };
    newAvailability.days = newAvailability.days.map((day, position) => {
      if (position === index) {
        return { available, start, end, allDay, dayName: day.dayName };
      } else return day;
    });
    if (isMounted) {
      setAvailability(newAvailability);
    }
    return () => (isMounted = false);
  }, [available, start, end, allDay]);

  return (
    <div>
      <p style={{ textTransform: "upperCase" }}>{day.dayName}</p>
      <label className="check-label">
        <StyledCheck
          className="check"
          name="available"
          type="checkbox"
          value={available}
          checked={available === true}
          onChange={(e) => {
            setAvailable(e.target.checked);
            if (!e.target.checked) {
              setAllDay(false);
            }
          }}
        />
        Available
      </label>{" "}
      <br />
      {available === true && (
        <label className="check-label">
          <StyledCheck
            className="check"
            name="all-day"
            type="checkbox"
            value={allDay}
            checked={allDay === true}
            onChange={(e) => {
              setAllDay(e.target.checked);
              if (e.target.checked) {
                setStart(0);
                setEnd(0);
              }
            }}
          />
          Available all day
          <br />
        </label>
      )}
      {allDay === false && available === true ? (
        <div>
          <label>Start time</label>
          <StyledTimeDate
            name="all-day"
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />{" "}
          <label>End time</label>
          <StyledTimeDate
            name="all-day"
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
      ) : null}
    </div>
  );
}

export default AvailabilityDay;
