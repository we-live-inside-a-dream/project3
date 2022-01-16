import React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import StyledInput from "./StyledComponents/StyledInput";
import StyledButton from "./StyledComponents/StyledButton";


const events = [
  {name:"Julie"},
  {name:"Derek"},
  {name:"Reza"},
  {name:"Brian"}
]

function EditSchedule({onClose}) {
  const [name, setName] = useState();
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
      date
    };
    console.log("Saving volunteer", newShift);
    await updateShift(newShift);
  }
  return (
    <div>

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
        style={{ width: "300px" }}
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
      </div>

      <div>
      <StyledInput
        label="shift day"
        type="date"
        value={date}
        onChange={(event) => onInputUpdate(event, setDate)}
      />
      </div>

      <div>
      <StyledInput
        label="start time"
        type="time"
        value={start}
        onChange={(event) => onInputUpdate(event, setStart)}
      />
      </div>

      <div>
      <StyledInput
        label="end time"
        type="time"
        value={end}
        onChange={(event) => onInputUpdate(event, setEnd)}
      />
      </div>




      <StyledButton onClick={postData}>SUBMIT</StyledButton>
    </div>
  );
}

export default EditSchedule;
