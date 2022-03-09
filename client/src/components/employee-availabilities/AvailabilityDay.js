import React from "react";
import { useState, useEffect } from "react";
import {
  StyledCheck,
  StyledTimeDate,
} from "../reusable/Inputs/StyledEmployeeForm";
import BasicTimePicker from "../reusable/Inputs/BasicTimePicker";
import * as fns from "date-fns";
import moment from "moment";
import { timeValidation } from "../validateForms";
import ClockLoader from "react-spinners/ClockLoader";

function AvailabilityDay({
  day,
  availability,
  setAvailability,
  index,
  setIsError,
}) {
  const [available, setAvailable] = useState(day.available);
  const [start, setStart] = useState(day.start);
  const [end, setEnd] = useState(day.end);
  const [allDay, setAllDay] = useState(day.allDay);
  const [timeMessageVal, setTimeMessageVal] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
  }, [available, start, end, allDay]);

  useEffect(() => {
    if (start > end) {
      setIsError((curr) => {
        return { ...curr, [day.dayName]: true };
      });
    } else
      setIsError((curr) => {
        return { ...curr, [day.dayName]: false };
      });
  }, [start, end, setIsError, day.dayName]);

  function onInputUpdate(value, setter) {
    let newValue = fns.format(new Date(value), "HH:mm").toString();
    console.log(newValue);
    setter(newValue);
    if (timeMessageVal) {
      setTimeMessageVal(true);
    } else setTimeMessageVal(null);
  }

  return (
    <div>
      {!loading ? (
        <div
          style={{
            height: "320px",
            width: "320px",
            borderRadius: "50%",
            border: "3px solid var(--mainHeader)",
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            margin: "auto",
          }}
        >
          <ClockLoader
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "Center",
              width: "100%",
              height: "100vh",
            }}
            color={"var(--mainHeader)"}
            //loading={loading}
            size={300}
          />
        </div>
      ) : (
        <>
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

              {timeMessageVal ? (
                <p
                  style={{
                    color: "red",
                    fontSize: "10px",
                    marginBottom: "0px",
                  }}
                >
                  {timeMessageVal}
                </p>
              ) : null}
              <label>End time</label>
              <BasicTimePicker
                value={` Wed Feb 02 2022 ${end}:00 GMT-0700 (Mountain Standard Time)`}
                onChange={(value) => {
                  onInputUpdate(value, setEnd);
                }}
              />

              {end < start && (
                <p style={{ color: "red" }}>
                  End time must be greater than start time!
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AvailabilityDay;
