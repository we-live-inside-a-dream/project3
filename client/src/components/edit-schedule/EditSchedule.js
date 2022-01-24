import React from "react";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";

import {NativeSelect } from "@mui/material";
// import MenuPopupState from "../UNUSED/MenuPopupState";

// import StyledLabel from "../reusable/Inputs/StyledLabel";
import CenterStyle from "../reusable/Inputs/CenterStyle";

import StyledInput from "../reusable/Inputs/StyledInput";
import StyledButton from "../reusable/Inputs/StyledButton";
import BreaksComponent from "./BreaksComponent";
// import StyledDropDownInput from "../reusable/Inputs/StyledDropDownInput";

//events will be from employee.name DB

// const events = [
//   { name: "" },
//   { name: "Julie" },
//   { name: "Derek" },
//   { name: "Reza" },
//   { name: "Brian" },
// ];
// const events2 = [
//   { name: "" },
//   { name: "Coffe" },
//   { name: "Lunch" },
//   { name: "Coffe2" },
// ];

function EditSchedule({ onClose, shiftId, existingValues }) {
  const [name, setName] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [date, setDate] = useState();

  const [breaks, setBreaks] = useState([]);
  const [breakName, setBreakName] = useState();
  const [breakStart, setBreakStart] = useState();
  const [breakEnd, setBreakEnd] = useState();
  const [breakPaid, setBreakPaid] = useState();

  const [empNames, setEmpNames] = useState([]);
  const [breakToAdd, setBreakToAdd] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      let fetchResult = await fetch("/api/employeeProfile/employees/names");
      let fetchedNames = await fetchResult.json();
      console.log("fetchedNames", fetchedNames);
      setEmpNames(fetchedNames);
    };
    fetchNames();
  }, []);

  useEffect(() => {
    if (existingValues) {
      setName(existingValues.name);
      setStart(existingValues.start);
      setEnd(existingValues.end);
      setDate(existingValues.date);
      setBreaks(existingValues.breaks);
    }
  }, [existingValues]);

  async function createShift(createdUser) {
    console.log("creating user", name, "with data", createdUser);
    await fetch("/api/schedule/schedule/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdUser),
    });
  }

  async function updateShift(updatedUser) {
    console.log("Updating user", name, "with data", updatedUser);
    await fetch(`/api/schedule/schedule/update?id=${shiftId}`, {
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
    onClose();
    console.log("Saving shift", newShift);
    if (existingValues) {
      console.log(existingValues);
      console.log("updateShift with...", newShift);
      await updateShift(newShift);
    } else {
      await createShift(newShift);
    }
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

  return (
    <>
      <div>
        <InputLabel id="demo-simple-select-helper-label">
          Employee Name
        </InputLabel>
        <NativeSelect
          defaultValue={name}
          labelId="demo-simple-select-helper-label"
          id="name-imput"
          value={name}
          label="name"
          onChange={(event) => onInputUpdate(event, setName)}
          style={{
            width: "275px",
            fontSize: "1em",
            textAlign: "center",
            margin: "10px",
            color: "#4488AB",
            backgroundColor: "white",
            border: "2px solid #4488AB",
            boarderRadius: "3px",
            filter: "dropShadow(5px 5px 10px grey)",
          }}
        >
          {name}
          {empNames?.map((event, index) => {
            return (
              <option key={index} value={event.name}>
                {event.firstName + " " + event.lastName}
              </option>
            );
          })}
        </NativeSelect>
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
        <InputLabel id="demo-simple-select-helper-label">
          Start Time - End Time
        </InputLabel>
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

        <StyledButton fontSize={"1.5em"} padding={"0"} onClick={onAddBreak}>
          +
        </StyledButton>
      </div>
      {/* <div>
this is for making breaks list
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
