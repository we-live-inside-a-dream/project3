import { InputLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import BasicTimePicker from "../reusable/Inputs/BasicTimePicker";
import StyledButton from "../reusable/Inputs/StyledButton";
import * as fns from "date-fns";

import {
  StyledCheck,
  // StyledFormWrapper,
  StyledForm,
} from "../reusable/Inputs/StyledEmployeeForm";

function EditDayAvailability({ existingValues }) {
  const [dayName, setDayName] = useState("");
  const [dayId, setDayId] = useState("");
  const [available, setAvailable] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (existingValues) {
      setDayId(existingValues._id);
      setDayName(existingValues.dayName);
      setAvailable(existingValues.available);
      setAllDay(existingValues.allDay);
      setStart(existingValues.start);
      setEnd(existingValues.end);
    }

    console.log("THIS IS THE DAY ID", dayId);
  }, [existingValues, dayId]);

  async function updateDayAvailability(updatedDay) {
    console.log("Updating day:", dayName, "with new availability ", updatedDay);
    await fetch(`/api/availability/availability-update-day?id=${dayId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDay),
    });
  }
  async function postData() {
    let updatedDay = {
      dayName,
      available,
      allDay,
      start: fns.format(new Date(start), "HH:mm").toString(),
      end: fns.format(new Date(end), "HH:mm").toString(),
    };
    console.log("posting updated availability for", dayName, updatedDay);
    await updateDayAvailability(updatedDay);
  }
  function onInputUpdate(value, setter) {
    setter(value);
  }

  return (
    <div>
      <StyledForm>
        <h2 style={{ margin: "0px" }}>Edit Availability for {dayName}</h2>
        <div></div>
        <div>
          <InputLabel>
            Available
            <StyledCheck
              type="checkbox"
              checked={available}
              onChange={(e) => {
                setAvailable(e.target.checked);
                if (!e.target.checked) {
                  setAllDay(false);
                }
              }}
            />
          </InputLabel>
          {available === true && (
            <InputLabel>
              All day
              <StyledCheck
                type="checkbox"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
              />
            </InputLabel>
          )}
        </div>
        <div></div>
        {allDay === false && available === true && (
          <div>
            <label>
              Start Time:
              <BasicTimePicker
                // label=""
                type="time"
                value={start}
                onChange={(value) => {
                  onInputUpdate(value, setStart);
                }}
              />
            </label>
          </div>
        )}
        {allDay === false && available === true && (
          <div>
            <label>
              End Time:
              <BasicTimePicker
                // label=""
                type="time"
                value={end}
                onChange={(value) => {
                  onInputUpdate(value, setEnd);
                }}
              />
            </label>
          </div>
        )}

        <div>
          <StyledButton onClick={postData}>SAVE</StyledButton>
        </div>
      </StyledForm>
      {/* </StyledFormWrapper> */}
    </div>
  );
}

export default EditDayAvailability;
