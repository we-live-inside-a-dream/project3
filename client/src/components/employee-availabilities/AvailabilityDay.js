import React from "react";
import { useState, useEffect } from "react";
import {
  StyledCheck,
  StyledTimeDate,
} from "../reusable/Inputs/StyledEmployeeForm";
import BasicTimePicker from "../reusable/Inputs/BasicTimePicker";
import * as fns from "date-fns";
import moment from "moment";

function AvailabilityDay({ day, availability, setAvailability, index }) {
  const [available, setAvailable] = useState(day.available);
  const [start, setStart] = useState(day.start);
  const [end, setEnd] = useState(day.end);
  const [allDay, setAllDay] = useState(day.allDay);

  useEffect(() => {
    const newAvailability = { ...availability };
    newAvailability.days = newAvailability.days.map((day, position) => {
      if (position === index) {
        return {
          available,
          start,
          end,
          allDay,
          dayName: day.dayName,
        };
      } else return day;
    });
    setAvailability(newAvailability);
  }, [available, start, end, allDay]);

  function onInputUpdate(value, setter) {
    let newValue = fns.format(new Date(value), "HH:mm").toString();
    console.log(newValue);
    setter(newValue);
  }

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
                setStart("");
                setEnd("");
              }
            }}
          />
          Available all day
          <br />
        </label>
      )}
      {allDay === false && available === true && (
        <div>
          <label>Start time</label>

          <BasicTimePicker
            value={` Wed Feb 02 2022 ${start}:00 GMT-0700 (Mountain Standard Time)`}
            onChange={(value) => {
              onInputUpdate(value, setStart);
            }}
          />
          <label>End time</label>
          <BasicTimePicker
            value={` Wed Feb 02 2022 ${end}:00 GMT-0700 (Mountain Standard Time)`}
            onChange={(value) => {
              onInputUpdate(value, setEnd);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default AvailabilityDay;
