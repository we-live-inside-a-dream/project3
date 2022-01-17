import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import StyledInput from "./StyledComponents/Inputs/StyledInput";
import StyledButton from "./StyledComponents/Inputs/StyledButton";
import StyledDropDownInput from "./StyledComponents/Inputs/StyledDropDownInput";
import DatePicker from "./StyledComponents/DatePicker";
import DateFnsUtils from "@date-io/date-fns";
// import TimeInput from "./StyledComponents/StyledSubmitButton";
// import DateInput from "./StyledComponents";

// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";

const events = [
  {
    id: 1,
    name: "Julie",
    title: "8-4",
    allDay: false,
    start: new Date(2022, 1, 15),
    end: new Date(2022, 1, 15),
    position: "cashier",
  },
  {
    id: 2,
    name: "Reza",
    title: "9-5",
    allDay: false,
    start: new Date(2022, 1, 7),
    end: new Date(2022, 1, 7),
    position: "driver",
  },
  {
    id: 3,
    name: "Derek",
    title: "9-12",
    allDay: false,
    start: new Date(2022, 1, 11),
    end: new Date(2022, 1, 11),
    position: "sales",
  },
  {
    id: 4,
    name: "Brian",
    title: "9-6",
    allDay: false,
    start: new Date(2022, 1, 11),
    end: new Date(2022, 1, 11),
    position: "sales",
  },
];

function CalendarNewShiftForm() {
  const [name, setName] = useState("");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [date, setDate] = useState();

  async function updateShift(updatedUser) {
    console.log("Posting to user", name, "with data", updatedUser);
    await fetch("/api/schedule/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
  }
  function onInputUpdate(event, setter) {
    let newValue = event.target.value;
    setter(newValue);
  }
  async function postData() {
    let newShift = {
      name,
      start,
      end,
      date,
    };
    console.log("Saving volunteer", newShift);
    await updateShift(newShift);
  }

  return (
    <div>
      <InputLabel id="demo-simple-select-helper-label">
        Employee Name
      </InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="name-imput"
        value={name}
        label="name"
        onChange={(event) => onInputUpdate(event, setName)}
        style={{
          width: "300px",
          height: "3rem",
          fontSize: "1em",
          textAlign: "center",
          color: "#fc4445",
          backgroundColor: "white",
          border: "2px solid #fc4445",
          filter: "drop-shadow(5px 5px 10px grey)",
        }}
      >
        <MenuItem value="name">
          <em>None</em>
        </MenuItem>
        {events?.map((event, index) => {
          return (
            <MenuItem key={index} value={event.name}>
              {event.name}
            </MenuItem>
          );
        })}
      </Select>

      <StyledInput
        label="shift day"
        type="date"
        value={date}
        onChange={(event) => onInputUpdate(event, setDate)}
      />
      <StyledInput
        label="start time"
        type="time"
        value={start}
        onChange={(event) => onInputUpdate(event, setStart)}
      />
      <StyledInput
        label="end time"
        type="time"
        value={end}
        onChange={(event) => onInputUpdate(event, setEnd)}
      />

      <StyledButton onClick={postData}>SUBMIT</StyledButton>
    </div>
  );
}
export default CalendarNewShiftForm;
