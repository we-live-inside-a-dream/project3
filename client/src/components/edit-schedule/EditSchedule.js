import React from "react";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import * as fns from "date-fns";

import { NativeSelect } from "@mui/material";
// import MenuPopupState from "../UNUSED/MenuPopupState";

// import StyledLabel from "../reusable/Inputs/StyledLabel";
import CenterStyle from "../reusable/Inputs/CenterStyle";
// import StyledInput from "../reusable/Inputs/StyledInput";
// import StyledButton from "../reusable/Inputs/StyledButton";
import BreaksComponent from "./BreaksComponent";
import {
  // StyledEmployeeForm,
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledModal,
  OneColumn,
} from "../reusable/Inputs/StyledEmployeeForm.js";
import BasicTimePicker from "../reusable/Inputs/BasicTimePicker";

// import StyledDropDownInput from "../reusable/Inputs/StyledDropDownInput";

// const events2 = [
//   { name: "" },
//   { name: "Coffe" },
//   { name: "Lunch" },
//   { name: "Coffe2" },
// ];

function EditSchedule({ onClose, shiftId, existingValues }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [date, setDate] = useState("");
  const [breaks, setBreaks] = useState([]);
  const [breakName, setBreakName] = useState();
  const [breakStart, setBreakStart] = useState("");
  const [breakEnd, setBreakEnd] = useState("");
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

  // useEffect(()=>{
  //   if(employeeId){

  //     console.log("employeeId",employeeId)
  //     const empAvail = async ()=>{
  //       let fetchAvailibility = await fetch(`/api/availability/availibility/profile?id=${employeeId}`)
  //       let employeeAvailibility = await fetchAvailibility.json()
  //       setEmpAvailibility(employeeAvailibility)
  //     }
  //     empAvail()
  //   }
  //   // console.log(empAvailibility)
  // },[employeeId])

  // useEffect(()=>{
  //   function isEmployeeavailable(){
  //     let availableToday = empAvailibility.days[dayOfWeek]//dayOfweek is the index for days array monday=0, sunday=6
  //   if(!availableToday.available){
  //     console.log("employee not available");
  //   }else if(!availableToday.allDay){
  //     console.log(`employee is available between ${availableToday.start} and ${availableToday.end}`);
  //   }else{
  //     console.log("employee is free to suffer all day!!");
  //   }
  //     // need to ensure employee isnt working over 40 hours this week
  //     // need to see if employee has vacation or time off booked
  //     // need to compare day of the week to weekly availibility
  //     //       first figure out what day of the week it is...
  //     console.log('employee weekly availibility',availableToday)
  //   }
  //   let dayOfWeek = fns.getDay(new Date(date));
  // if(empAvailibility){ console.log(empAvailibility)
  //   console.log("date is...",date)
  //   console.log("week day is...",dayOfWeek,"of 6" )//monday = 0 sunday = 6
  //   isEmployeeavailable()
  // };
  // },[date])


  // Wed Feb 02 2022 01:00:00 GMT-0700 (Mountain Standard Time)
  useEffect(() => {
    if (existingValues) {
      setFirstName(existingValues.firstName);
      setEmployeeId(existingValues.employeeId);
      setLastName(existingValues.lastName);
      setStart(` Wed Feb 02 2022 ${existingValues.start}:00 GMT-0700 (Mountain Standard Time)`);
      setEnd(` Wed Feb 02 2022 ${existingValues.end}:00 GMT-0700 (Mountain Standard Time)`);
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

  function onInputUpdate(value, setter) {
    setter(value);
  }

  async function postData() {
    let newShift = {
      employeeId,
      firstName,
      lastName,
      start: fns.format(new Date(start),"HH:mm").toString(),
      end: fns.format(new Date(end),"HH:mm").toString(),
      date,
      breaks,
    };
    onClose();

    if (existingValues) {
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
    breaky.start =fns.format(new Date(breakStart),"HH:mm").toString()
    breaky.end = fns.format(new Date(breakEnd),"HH:mm").toString()
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
      {/* <StyledFormWrapper> */}
      <StyledModal>
        <div>
          <InputLabel id="demo-simple-select-helper-label">
            Employee Name
          </InputLabel>
          <NativeSelect
            defaultValue={employeeId}
            id="name-imput"
            value={employeeId}
            label="name"
            onChange={(event) =>
              onInputUpdate(event.target.value, setEmployeeId)
            }
            // style={{
            //   width: "275px",
            //   fontSize: "1em",
            //   textAlign: "center",
            //   margin: "10px",
            //   color: "#4488AB",
            //   backgroundColor: "white",
            //   border: "2px solid #4488AB",
            //   boarderRadius: "3px",
            //   filter: "dropShadow(5px 5px 10px grey)",
            // }}
          >
            {/* {name} */}
            <option></option>
            {empNames?.map((event) => {
              return (
                <option key={event._id} value={event._id}>
                  {event.firstName + " " + event.lastName}
                </option>
              );
            })}
          </NativeSelect>
        </div>

        <div>
          <InputLabel>Date</InputLabel>
          <StyledInput
            label="shift day"
            type="date"
            value={date}
            onChange={(event) => onInputUpdate(event.target.value, setDate)}
          />
        </div>

        <div>
          <InputLabel>Schedule Shift Time</InputLabel>
          <BasicTimePicker
            label="Shift Start"
            type="time"
            value={start}
            onChange={(value) => {
              onInputUpdate(value, setStart);
              (console.log(value))
            }}
          />

          <BasicTimePicker
            label="Shift End"
            type="time"
            onAccept
            value={end}
            onChange={(value) => onInputUpdate(value, setEnd)}
          />
        </div>
        
        <div>
          <InputLabel>Breaks</InputLabel>

          <BasicTimePicker
            label="Break Start"
            type="time"
            value={breakStart}
            onChange={(value) => onInputUpdate(value, setBreakStart)}
          />

          <BasicTimePicker
            label="Break End"
            type="time"
            value={breakEnd}
            onChange={(value) => onInputUpdate(value, setBreakEnd)}
          />
          </div>   
            <div2>
          <input
            value={breakName}
            onChange={(event) => {
              onInputUpdate(event.target.value, setBreakName);
            }}
            />
           <StyledButton fontSize={"1.5em"} padding={"0"} onClick={onAddBreak}>
            +
          </StyledButton>
            </div2>

        

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
      </StyledModal>
      {/* </StyledFormWrapper> */}
    </>
  );
} //final brace

export default EditSchedule;
