import React from "react";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import CenterStyle from "../reusable/Inputs/CenterStyle";
import StyledInput from "../reusable/Inputs/StyledInput";
import StyledButton from "../reusable/Inputs/StyledButton";
import BreaksComponent from "../edit-schedule/BreaksComponent";
// import StyledDropDownInput from "../reusable/Inputs/StyledDropDownInput";

function EditSchedule({ onClose, shiftId, existingValues }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [date, setDate] = useState("");
  const [breaks, setBreaks] = useState([]);
  const [breakName, setBreakName] = useState();
  const [breakStart, setBreakStart] = useState();
  const [breakEnd, setBreakEnd] = useState();
  const [breakPaid, setBreakPaid] = useState();
  const [employeeId, setEmployeeId] = useState("");
  const [empNames, setEmpNames] = useState([]);
  const [breakToAdd, setBreakToAdd] = useState([]);
  const [empAvailibility, setEmpAvailibility] = useState();

  useEffect(() => {
    const fetchNames = async () => {
      let fetchResult = await fetch("/api/employeeProfile/employees/names");
      let fetchedNames = await fetchResult.json();

      setEmpNames(fetchedNames);
    };
    fetchNames();
  }, []);

  function isEmployeeavailable() {
    // need to ensure employee isnt working over 40 hours this week
    // need to see if employee has vacation or time off booked
    // need to compare day of the week to weekly availibility
    // first figure out what day of the week it is...
    // console.log('employee weekly availibility',empAvailibility.days.dayName)
  }

  // useEffect(() => {
  //   if (employeeId) {
  //     console.log("employeeId", employeeId);
  //     const empAvail = async () => {
  //       let fetchAvailibility = await fetch(
  //         `/api/availability/availibility/profile?id=${employeeId}`
  //       );
  //       let employeeAvailibility = await fetchAvailibility.json();
  //       setEmpAvailibility(employeeAvailibility);
  //     };
  //     empAvail();
  //   }
  // }, [employeeId]);

  // useEffect(()=>{
  //   let dayOfWeek = fns.getDay(new Date(date));

  //   console.log("date is...",date)
  //   console.log("week day is...",dayOfWeek,"of 6" )//monday = 0 sunday = 6
  //   isEmployeeavailable()
  //   },[date])

  useEffect(() => {
    if (existingValues) {
      setFirstName(existingValues.firstName);
      setEmployeeId(existingValues.employeeId);
      setLastName(existingValues.lastName);
      setStart(existingValues.start);
      setEnd(existingValues.end);
      setDate(existingValues.date);
      setBreaks(existingValues.breaks);
    }
  }, [existingValues]);

  async function createShift(createdUser) {
    await fetch("/api/schedule/schedule/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdUser),
    });
  }

  async function updateShift(updatedUser) {
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
      employeeId,
      firstName,
      lastName,
      start,
      end,
      date,
      breaks,
    };
    onClose();

    if (existingValues.startDate) {
      console.log(existingValues);
      console.log("updateShift with...", newShift);
      await updateShift(newShift);
    } else {
      console.log("Saving shift", newShift);
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

    newBreak.push(breaky);
    setBreakToAdd("");
    setBreaks(newBreak);
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
      <InputLabel>{`${firstName} ${lastName}: ${date}`}</InputLabel>

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
              myKey={breakys._id}
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
