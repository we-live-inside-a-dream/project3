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
import ScheduleAvailability from "./ScheduleAvailability";

// import StyledDropDownInput from "../reusable/Inputs/StyledDropDownInput";

const breakList = [{ name: "Coffee" }, { name: "Lunch" }, { name: "Coffee2" }];

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

  useEffect(() => {
    if (existingValues) {
      setFirstName(existingValues.firstName);
      setEmployeeId(existingValues.employeeId);
      setLastName(existingValues.lastName);
      setStart(
        ` Wed Feb 02 2022 ${existingValues.start}:00 GMT-0700 (Mountain Standard Time)`
      ); //dont look at this! HH:mm => ISO string so the time picker with accept the value
      setEnd(
        ` Wed Feb 02 2022 ${existingValues.end}:00 GMT-0700 (Mountain Standard Time)`
      ); // its FINE
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
      start: fns.format(new Date(start), "HH:mm").toString(), //ISO date => HH:mm
      end: fns.format(new Date(end), "HH:mm").toString(),
      date,
      breaks,
    };
    onClose();

    if (existingValues) {
      await updateShift(newShift);
    } else {
      await createShift(newShift);
    }
  }

  function onAddBreak() {
    let breaky = {};
    let newBreak = [...breaks];
    breaky.name = breakName;
    breaky.start = fns.format(new Date(breakStart), "HH:mm").toString(); //ISO date => HH:mm
    breaky.end = fns.format(new Date(breakEnd), "HH:mm").toString();
    breaky.paid = breakPaid;

    newBreak.push(breaky);
    setBreakToAdd("");
    setBreaks(newBreak);
  }

  function onRemoveBreak(index) {
    let newBreak = [...breaks];
    newBreak.splice(index, 1);
    setBreaks(newBreak);
  }

  return (
    <>
      {/* <StyledFormWrapper> */}
      <StyledModal>
        <div>
          <InputLabel>Employee Name</InputLabel>
          <NativeSelect
            // defaultValue={employeeId}
            id="name-imput"
            value={employeeId}
            label="name"
            onChange={(event) =>
              onInputUpdate(event.target.value, setEmployeeId)
            }
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
            onChange={(event) => {
              onInputUpdate(event.target.value, setDate);
            }}
          />
          <ScheduleAvailability date={date} id={employeeId} />
        </div>

        <div>
          <InputLabel>Schedule Shift Time</InputLabel>
          <BasicTimePicker
            label="Shift Start"
            type="time"
            value={start}
            onChange={(value) => {
              onInputUpdate(value, setStart);
              console.log(value);
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
          <NativeSelect
            label="name"
            value={breakName}
            onChange={(event) => {
              onInputUpdate(event.target.value, setBreakName);
            }}
            style={{
              width: "100%",
            }}
          >
            {/* {name} */}
            <option></option>
            {breakList?.map((event, index) => {
              return (
                <option key={index} value={event.name}>
                  {event.name}
                </option>
              );
            })}
          </NativeSelect>

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
          <StyledButton
            fontSize={"1.5em"}
            margin={"1em"}
            padding={"10"}
            onClick={onAddBreak}
          >
            Add Break
          </StyledButton>
        </div>

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
