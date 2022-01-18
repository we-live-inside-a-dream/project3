import React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import StyledInput from "./StyledComponents/Inputs/StyledInput";
import StyledButton from "./StyledComponents/Inputs/StyledButton";
import BreakysComponent from "./BreakysComponent";

//events will be from employee.name DB

const events = [
  { name: "" },
  { name: "Julie" },
  { name: "Derek" },
  { name: "Reza" },
  { name: "Brian" },
];

function EditSchedule({ onClose }) {
  const [name, setName] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [date, setDate] = useState();

  const [breaks, setBreaks] = useState([]);
  const [breakName, setBreakName] = useState();
  const [breakStart, setBreakStart] = useState();
  const [breakEnd, setBreakEnd] = useState();
  const [breakPaid, setBreakPaid] = useState();

  const [breakToAdd, setBreakToAdd] = useState([]);

  // let breaks = [
  //   { name: "hello", start: undefined, end: undefined, paid: undefined },
  //   { name: "cofee", start: undefined, end: undefined, paid: undefined },
  //   { name: "lunch", start: "09:03", end: "20:09", paid: undefined },
  // ];

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
      breaks,
    };

    console.log("Saving volunteer", newShift);
    await updateShift(newShift);
  }

  function onAddBreak() {
    let breaky = {};
    let newBreak = [...breaks];
    breaky.name = breakName;
    breaky.start = breakStart;
    breaky.end = breakEnd;
    breaky.paid = breakPaid;
    console.log("this is breaky", breaky);
    newBreak.push(breaky);
    setBreakToAdd("");
    setBreaks(newBreak);
    console.log("this is the breaks", breaks);
  }

  function onRemoveBreak(index) {
    console.log("removing superpower at index", index);
    let newBreak = [...breaks];
    newBreak.splice(index, 1);
    console.log("superpowers are now", newBreak);
    setBreaks(newBreak);
  }

  //   setBreaks(something)
  //   const something ={
  //     name:"",
  //     start:0,
  //     end:0,
  //     paid:false
  //   }

  // something.name = thing
  // thing.start = 8
  // thing.end = 16
  // thing.paid = false

  return (
<>
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
        <InputLabel id="demo-simple-select-helper-label">Date</InputLabel>
        <StyledInput
          label="shift day"
          type="date"
          value={date}
          onChange={(event) => onInputUpdate(event, setDate)}
        />
      </div>

      <div>
        <InputLabel id="demo-simple-select-helper-label">Start Time</InputLabel>
        <StyledInput
          label="start time"
          type="time"
          value={start}
          onChange={(event) => onInputUpdate(event, setStart)}
        />
      </div>

      <div>
        <InputLabel id="demo-simple-select-helper-label">End Time</InputLabel>
        <StyledInput
          label="end time"
          type="time"
          value={end}
          onChange={(event) => onInputUpdate(event, setEnd)}
        />
      </div>
      <InputLabel id="demo-simple-select-helper-label">Breaks</InputLabel>
      <div>
        {breaks?.map((breakys, index) => <BreakysComponent breakys={breakys} index={index} onRemoveBreak={onRemoveBreak} />)}
      

      {/*<div>
        {breaks?.map((breakys, index) => {
          <div key={index}>
            name: {breakys.name}
     
            <StyledButton
              onClick={() => {
                onRemoveBreak(index);
              }}
            >
              X
            </StyledButton>
          </div>;
        })} */}
        <div>
          <div>hello</div>
          <input
            value={breakName}
            onChange={(event) => {
              onInputUpdate(event, setBreakName);
            }}
          />
          <StyledButton onClick={onAddBreak}>Add</StyledButton>
        </div>
      </div>

    <div>
      <StyledInput
        label="break start time"
        type="time"
        value={breakStart}
        onChange={(event) => onInputUpdate(event, setBreakStart)}
        />

      <StyledInput
        label="break end time"
        type="time"
        value={breakEnd}
        onChange={(event) => onInputUpdate(event, setBreakEnd)}
        />
      </div>
      

      <StyledButton onClick={postData}>SUBMIT</StyledButton>
</>
  );
} //final brace

export default EditSchedule;
