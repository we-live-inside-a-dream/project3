import React from "react";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import * as fns from "date-fns";
import { NativeSelect } from "@mui/material";
import StyledButton from "../reusable/Inputs/StyledButton";
import BreaksComponent from "./BreaksComponent";

import {
  firstNameValidation,
  dateValidation,
  timeValidation,
  requiredValidation,
} from "../validateForms";

import {
  // StyledEmployeeForm,
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledModal,
  RedStar,
  OneColumn,
} from "../reusable/Inputs/StyledEmployeeForm.js";
import BasicTimePicker from "../reusable/Inputs/BasicTimePicker";
import ScheduleAvailability from "./ScheduleAvailability";
import BasicDatePicker from "../reusable/Inputs/BasicDatePicker";
import { useManagerSettings } from "../reusable/context/ManagerSettingsProvider";
import PositionsForm from "../management-settings/PositionsForm";

const breakList = [{ name: "Coffee" }, { name: "Lunch" }, { name: "Coffee2" }];
// const positionList = [
//   { name: "Supervisor" },
//   { name: "Waitress" },
//   { name: "Cashier" },
//   { name: "Dishwasher" },
//   { name: "The Rezza" },
// ];

function EditSchedule({
  onClose,
  shiftId,
  reload,
  modalData,
  // createShift,
  // updateShift,
  // existingValues,
  clearValues,
  // deleteShift,
}) {
  // const value = useSocket();
  // const createShift = value.createShift;
  // const updateShift = value.updateShift;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [date, setDate] = useState();
  const [breaks, setBreaks] = useState([]);
  const [breakName, setBreakName] = useState();
  const [breakStart, setBreakStart] = useState("");
  const [breakEnd, setBreakEnd] = useState("");
  const [breakPaid, setBreakPaid] = useState();
  const [employeeId, setEmployeeId] = useState();
  const [empNames, setEmpNames] = useState();
  const [position, setPosition] = useState([]);
  const [positionList, setPositionList] = useState();
  const [empPositions, setEmpPositions] = useState();
  const [breakToAdd, setBreakToAdd] = useState([]);
  const [empNameMessageVal, setEmpNameMessageVal] = useState(null);
  const [shiftDateMessageVal, setShiftDateMessageVal] = useState(null);
  const [shiftTimeMessageVal, setShiftTimeMessageVal] = useState(null);
  const [shiftBrakeMessageVal, setShiftBrakeMessageVal] = useState(null);
  const [empAvailibility, setEmpAvailibility] = useState();
  const [existingValues, setExistingValues] = useState();
  const [shown, setShown] = useState(false);
  // const [deleteShift, setDeleteShift] = useState(false);

  const value = useManagerSettings();
  useEffect(() => {
    //***constructs employee positions List based of employee selected***
    if (!employeeId) {
      const listOfAllPositions = value.positions;
      setPositionList(listOfAllPositions);
    } else {
      const selectedEmployee = empPositions?.find(
        (employee) => employee._id === employeeId
      );
      const selectedEmployeePositions = selectedEmployee.positions.map((e) => ({
        value: e,
        label: e.charAt(0).toUpperCase() + e.slice(1),
      }));
      setPositionList(selectedEmployeePositions);
    }
  }, [employeeId]);

  useEffect(() => {
    console.log("empNames", empNames);
  }, [empNames]);
  useEffect(() => {
    console.log("position", position);
  }, [position]);

  useEffect(() => {
    if (empNames) return;
    const fetchNames = async () => {
      let fetchResult = await fetch("/api/employeeProfile/employees/names");
      let fetchedNames = await fetchResult.json();
      console.log("fetchedNames", fetchedNames);
      setEmpNames(fetchedNames);
    };
    const fetchPositions = async () => {
      let fetchResult = await fetch("/api/employeeProfile/employees/positions");
      let fetchedPositions = await fetchResult.json();
      console.log("fetchedPositions", fetchedPositions);
      setEmpPositions(fetchedPositions);
    };

    fetchNames();
    fetchPositions();
  }, []);

  useEffect(() => {
    if (shiftId) {
      console.log("THIS IS THE SHIFT ID");
      const fetchShift = async () => {
        let fetchResult = await fetch(`/api/schedule/id?id=${shiftId}`);
        let fetchedShift = await fetchResult.json();
        setExistingValues(fetchedShift);
      };

      // if (deleteShift === true) delete shiftID else fetch shift when shiftId is called

      fetchShift();
    }
  }, [shiftId]);

  useEffect(() => {
    if (!modalData) return;
    console.log("modalData", modalData);
    setExistingValues(modalData);
  }, [modalData]);

  useEffect(() => {
    // console.log("time to edit", existingValues);
    if (!existingValues) return;
    setFirstName(existingValues.firstName);
    setEmployeeId(existingValues.employeeId);
    setLastName(existingValues.lastName);
    if (existingValues.start) {
      setStart(
        ` Wed Feb 02 2022 ${existingValues.start}:00 GMT-0700 (Mountain Standard Time)`
      ); //dont look at this! HH:mm => ISO string so the time picker with accept the value
      setEnd(
        ` Wed Feb 02 2022 ${existingValues.end}:00 GMT-0700 (Mountain Standard Time)`
      ); // its FINE
    }
    setDate(existingValues.date);
    setBreaks(existingValues.breaks);
    setPosition(existingValues.position);
  }, [existingValues]);

  // useEffect(() => {
  //   console.log("start", position);
  // }, [position]);

  async function createShift(createdUser) {
    await fetch("/api/schedule/schedule/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdUser),
    });
  }
  useEffect(() => {
    if (!empPositions) return;
    function filterEmpNames() {
      let employeesWithPosition = empPositions.filter((p) =>
        p.positions.includes(position.toLowerCase())
      );
      let filteredEmployeeIds = employeesWithPosition.map((ewp) => {
        return ewp;
      });
      setEmpNames(filteredEmployeeIds);
      console.log("filteredEmployeeIds", filteredEmployeeIds);
    }
    filterEmpNames();
  }, [position]);

  async function updateShift(updatedUser) {
    console.log("new user data", updatedUser);
    await fetch(`/api/schedule/schedule/update?id=${shiftId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
  }

  const deleteShiftById = async () => {
    await fetch(`/api/schedule/schedule/delete?id=${shiftId}`, {
      method: "DELETE",
    });
    onClose();
    reload();
  };

  function onInputUpdate(value, setter) {
    // console.log(value);
    setter(value);
  }

  let validation;
  async function validateForm() {
    if (empNameMessageVal || shiftDateMessageVal || shiftTimeMessageVal) {
      console.log(
        "Employee Message",
        empNameMessageVal,
        "Date message",
        shiftDateMessageVal,
        "Time message",
        shiftTimeMessageVal
      );
      validation = "Please make sure that all fields are valid";
      setShown(true);
      return validation;
    } else validation = null;
    setShown(false);
    postData();

    return validation;
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
      position,
    };
    // validateForm();
    console.log("validate form", validation);
    console.log("saving new schedule form", newShift);

    if (modalData.start && validation === null) {
      console.log("Update Shift...", newShift);
      await updateShift(newShift);
      setExistingValues(null);
      reload();
    } else if (!modalData.start && validation === null) {
      console.log("New Shift...", newShift);
      await createShift(newShift);
      setExistingValues(null);
      reload();
    } else {
      setShown(true);
    }
    onClose();
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

  // async function validateForm() {
  //   if (
  //     empNameMessageVal ||
  //     shiftDateMessageVal ||
  //     shiftTimeMessageVal ||
  //     shiftBrakeMessageVal
  //   ) {
  //     validation = "Please make sure that all fields are valid";
  //     return validation;
  //   } else validation = null;

  //   return validation;
  // }

  return (
    <>
      {/* <StyledFormWrapper> */}
      <StyledModal>
        <StyledButton
          style={{ position: "fixed", top: "0px", right: "0px" }}
          onClick={onClose}
        >
          x
        </StyledButton>
        <h1>Schedule</h1>
        <div>
          <InputLabel>
            Employee Name
            <RedStar />
          </InputLabel>
          {employeeId === "" ? (
            <p
              style={{
                color: "red",
                fontSize: "10px",
                marginBottom: "0px",
                marginTop: "0px",
              }}
            ></p>
          ) : null}
          <NativeSelect
            // defaultValue={employeeId}
            id="name-input"
            value={employeeId}
            label="name"
            onChange={(event) => {
              onInputUpdate(event.target.value, setEmployeeId);
              setEmpNameMessageVal(firstNameValidation(employeeId));
            }}
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
          <InputLabel>
            Positions
            <RedStar />
          </InputLabel>
          <NativeSelect
            label={position}
            value={position}
            onChange={(event) => {
              setPosition(() => event.target.value);
              // console.log("position", event.target.value);
              // filterEmpNames();
            }}
            style={{
              width: "100%",
            }}
          >
            {/* {name} */}
            <option></option>

            {positionList?.map((event) => {
              return (
                <option className="list" key={event._id} value={event.label}>
                  {event.label}
                </option>
              );
            })}
          </NativeSelect>
        </div>

        <div>
          <InputLabel>
            Date
            <RedStar />
          </InputLabel>

          {date === "" ? (
            <p
              style={{
                color: "red",
                fontSize: "10px",
                marginBottom: "0px",
                marginTop: "0px",
              }}
            >
              {"required"}
            </p>
          ) : null}
          <BasicDatePicker
            label="shift day"
            type="date"
            value={date}
            onChange={(value) => {
              onInputUpdate(
                fns.format(new Date(value), "yyyy-MM-dd").toString(),
                setDate
              );
              setShiftDateMessageVal(requiredValidation(date));
            }}
          />
          <ScheduleAvailability date={date} id={employeeId} />
        </div>

        <div>
          <InputLabel>
            Schedule Shift Time
            <RedStar />
          </InputLabel>
          {!shiftTimeMessageVal ? (
            <p
              style={{
                color: "red",
                fontSize: "10px",
                marginBottom: "0px",
                marginTop: "0px",
              }}
            >
              {" "}
            </p>
          ) : null}
          {shiftTimeMessageVal ? (
            <p
              style={{
                color: "red",
                fontSize: "10px",
                marginBottom: "0px",
                marginTop: "0px",
              }}
            >
              {" "}
              {shiftTimeMessageVal}
            </p>
          ) : null}
          <BasicTimePicker
            label="Shift Start"
            type="time"
            onAccept
            value={start}
            onChange={(value) => {
              onInputUpdate(value, setStart);
            }}
          />

          <BasicTimePicker
            label="Shift End"
            type="time"
            onAccept
            value={end}
            onChange={(value) => {
              onInputUpdate(value, setEnd);
              setShiftTimeMessageVal(timeValidation(start, value));
            }}
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

        <div>
          {breaks?.map((breakys, index) => (
            <BreaksComponent
              myKey={breakys._id}
              breakys={breakys}
              index={index}
              onRemoveBreak={onRemoveBreak}
            />
          ))}
          <div></div>
          {start ? (
            <StyledButton onClick={deleteShiftById}>Delete</StyledButton>
          ) : null}
          <div styles={{ display: "flex", flexDirection: "row" }}>
            {shown === true ? <p>form needs a lotta work</p> : null}
            <StyledButton onClick={validateForm}>SUBMIT</StyledButton>
          </div>
        </div>
      </StyledModal>
      {/* </StyledFormWrapper> */}
    </>
  );
}

export default EditSchedule;
