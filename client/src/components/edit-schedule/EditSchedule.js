import React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";

import { Menu, Select, MenuItem } from "@mui/material";
import MenuPopupState from "../UNUSED/MenuPopupState";


import StyledLabel from "../reusable/Inputs/StyledLabel";
import CenterStyle from "../reusable/Inputs/CenterStyle";

import StyledInput from "../reusable/Inputs/StyledInput";
import StyledButton from "../reusable/Inputs/StyledButton";
import BreaksComponent from "./BreaksComponent";
import StyledDropDownInput from "../reusable/Inputs/StyledDropDownInput";

//events will be from employee.name DB

const events = [
  { name: "" },
  { name: "Julie" },
  { name: "Derek" },
  { name: "Reza" },
  { name: "Brian" },
];
const events2 = [
  { name: "" },
  { name: "Coffe" },
  { name: "Lunch" },
  { name: "Coffe2" },
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
    onClose()
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
    console.log("removing break at index", index);
    let newBreak = [...breaks];
    newBreak.splice(index, 1);
    console.log("breaks are... ", newBreak);
    setBreaks(newBreak);
  }

  // const PopupState = () => {
  //   const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })}
// let emp = [derek,julie,brian]
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
          style={{ width: "300px",
          fontSize: "1em",
          textAlign: "center",
          color: "#4488AB",
          backgroundColor: "white", 
          border: "2px solid #4488AB",
          filter: "dropShadow(5px 5px 10px grey)",
           }}
        >
          {name}
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

        {/* <div>

<MenuPopupState/>
      </div> */}
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
        <InputLabel id="demo-simple-select-helper-label">Start Time - End Time</InputLabel>
        <StyledInput
          label="start time"
          type="time"
          value={start}
         
          onChange={(event) => onInputUpdate(event, setStart)}
        />
  
        {/* <InputLabel id="demo-simple-select-helper-label">End Time</InputLabel> */}
        <StyledInput
          label="end time"
          type="time"
          value={end}
         
          onChange={(event) => onInputUpdate(event, setEnd)}
        />

      </div>
      <InputLabel id="demo-simple-select-helper-label">Breaks</InputLabel>


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
        <div>
          <StyledInput
            value={breakName}
           
            onChange={(event) => {
              onInputUpdate(event, setBreakName);
            }}
            />
        <StyledButton fontSize={"1.5em"} padding={"0"} onClick={onAddBreak}>+</StyledButton>
        </div>

{/* <div>

<Select
          labelId="demo-simple-select-helper-label"
          id="name-imput"
          value={name}
          label="name"
          onChange={(event) => onInputUpdate(event, setBreakName)}
          style={{ 
            height:"50px",
            width: "200px",
          fontSize: "1em",
          textAlign: "center",
          color: "#4488AB",
          backgroundColor: "white", 
          border: "2px solid #4488AB",
          filter: "dropShadow(5px 5px 10px grey)",
           }}
        >
          {name}
          <MenuItem value="name">
            <em>None</em>
          </MenuItem>
          {events2?.map((event, index) => {
            return (
              <MenuItem key={index} value={event.name}>
                {event.name}
              </MenuItem>
            );
          })}
          </Select>
          <StyledButton fontSize={"1.5em"} margin={"1em"} padding={"10"} onClick={onAddBreak}>+</StyledButton>
</div> */}








              <CenterStyle>
            <div>
              {breaks?.map((breakys, index) => (
                <BreaksComponent
                  breakys={breakys}
                  index={index}
                  onRemoveBreak={onRemoveBreak}
                />
              ))}
            </div>
      <StyledButton onClick={postData}>SUBMIT</StyledButton>
            </CenterStyle>
    </>
  );
} //final brace

export default EditSchedule;
