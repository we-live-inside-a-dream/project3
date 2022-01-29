import { InputLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledButton from "../reusable/Inputs/StyledButton";
import StyledInput from "../reusable/Inputs/StyledInput";
import {
  StyledCheck,
  StyledTimeDate,
} from "../reusable/Inputs/StyledEmployeeForm";

function EditMaxHours({ existingValues }) {
  const [dayName, setDayName] = useState("");
  const [dayId, setDayId] = useState("");
  const [available, setAvailable] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

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

  async function updateMaxHours(updatedDay) {
    console.log("Updating day:", dayName, "with max hours:", updatedDay);
    await fetch(
      `/api/availability/availability-update-day?id=${existingValues._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDay),
      }
    );
  }
  async function postData() {
    let updatedDay = {
      dayName,
      available,
      allDay,
      start,
      end,
    };
    console.log("posting updated availability for", dayName);
    await updateMaxHours(updatedDay);
  }

  return (
    <div>
      <h2>Update Availability for {dayName}</h2>
      <InputLabel>Available</InputLabel>
      <StyledCheck
        type="checkbox"
        checked={available}
        onChange={(e) => setAvailable(e.target.checked)}
      />
      <InputLabel>All day</InputLabel>
      <StyledCheck
        type="checkbox"
        checked={allDay}
        onChange={(e) => setAllDay(e.target.checked)}
      />
      <InputLabel>Available starting at: </InputLabel>
      <StyledTimeDate
        type="time"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <InputLabel>Available until:</InputLabel>
      <StyledTimeDate
        type="time"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <StyledButton onClick={postData}>SAVE</StyledButton>
    </div>
  );
}

export default EditMaxHours;
