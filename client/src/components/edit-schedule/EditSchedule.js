import React from "react";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import * as fns from "date-fns";
import Select from "react-select";
import { NativeSelect } from "@mui/material";
import StyledButton from "../reusable/Inputs/StyledButton";
import BreaksComponent from "./BreaksComponent";

import {
  firstNameValidation,
  timeValidation,
  requiredValidation,
  positionValidation,
} from "../validateForms";

import {
  StyledModal,
  RedStar,
  OneColumn,
  StyledInput,
} from "../reusable/Inputs/StyledEmployeeForm.js";
import Modal from "../reusable/Modal";
import BasicTimePicker from "../reusable/Inputs/BasicTimePicker";
import ScheduleAvailability from "./ScheduleAvailability";
import BasicDatePicker from "../reusable/Inputs/BasicDatePicker";
import { useManagerSettings } from "../reusable/context/ManagerSettingsProvider";
import PositionsForm from "../management-settings/PositionsForm";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";

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
  const [breakToAdd, setBreakToAdd] = useState();
  const [empNameMessageVal, setEmpNameMessageVal] = useState(null);
  const [empPosMessageVal, setEmpPosMessageVal] = useState(null);
  const [shiftDateMessageVal, setShiftDateMessageVal] = useState(null);
  const [shiftTimeMessageVal, setShiftTimeMessageVal] = useState(null);
  const [empAvailibility, setEmpAvailibility] = useState();
  const [existingValues, setExistingValues] = useState();
  const [shown, setShown] = useState(false);
  // const [deleteShift, setDeleteShift] = useState(false);

  const value = useManagerSettings();
  useEffect(() => {
    if (!empPositions) return;
    //***constructs employee positions List based of employee selected***
    if (!employeeId) {
      const listOfAllPositions = value.positions;
      setPositionList(listOfAllPositions);
    } else {
      // setPositionList(null);
      const newPositionList = async () => {
        const selectedEmployee = await empPositions?.find(
          (employee) => employee?._id === employeeId
        );
        formatForSelect(selectedEmployee.positions, setPositionList);
        // const selectedEmployeePositions = selectedEmployee.positions.map(
        //   (e) => ({
        //     value: e,
        //     label: e.charAt(0).toUpperCase() + e.slice(1),
        //   })
        // );
        // setPositionList(selectedEmployeePositions);
      };
      newPositionList();
    }
  }, [employeeId, empPositions]);

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

    if (existingValues.breaks) {
      setBreaks(existingValues.breaks);
    }

    setPosition(existingValues.position);
  }, [existingValues]);

  useEffect(() => {
    console.log("breaks", breaks);
  }, [breaks]);

  function formatForSelect(item, setter) {
    const formattedItem = item.map((e) => ({
      value: e,
      label: e.charAt(0).toUpperCase() + e.slice(1),
    }));
    setter(formattedItem);
  }

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
    if (
      empNameMessageVal ||
      shiftDateMessageVal ||
      shiftTimeMessageVal ||
      !position
    ) {
      console.log(
        "Employee Message",
        empNameMessageVal,
        "Date message",
        shiftDateMessageVal,
        "Time message",
        shiftTimeMessageVal,
        "POsition Message",
        empPosMessageVal
      );
      validation = "Please make sure that all fields are valid";
      setShown(true);
      console.log("THIS IS THE VALIDATION");
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
      position: position.toLowerCase(),
    };
    console.log("validate form", validation);
    console.log("saving new schedule form", newShift);

    if (existingValues.start && validation === null) {
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
    console.log("newBreak", newBreak);
    newBreak.push(breaky);
    // setBreakToAdd("");
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
        <StyledEditButton
          padding="15px"
          style={{
            position: "fixed",
            top: "0px",
            right: "0px",
            color: "var(--accentColorTitle)",
            fontSize: "2em",
          }}
          onClick={onClose}
        >
          x
        </StyledEditButton>
        <h1>Schedule</h1>
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
        </div>
        <div>
          <InputLabel>Employee Availability</InputLabel>
          <ScheduleAvailability date={date} id={employeeId} />
        </div>
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
            style={{
              width: "95%",
              border: "1px solif black",
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
        </div>

        <div>
          <InputLabel>
            Position
            <RedStar />
          </InputLabel>
          <NativeSelect
            label={position}
            value={position}
            onChange={(event) => {
              setPosition(event.target.value);

              // filterEmpNames();
            }}
            style={{
              width: "95%",
            }}
          >
            {/* {name} */}
            <option></option>

            {positionList?.map((event) => {
              return (
                <option className="list" key={event._id} value={event.value}>
                  {event.label}
                </option>
              );
            })}
          </NativeSelect>
        </div>

        {/* <div> */}
        {/* </div> */}

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
        </div>
        <div style={{ marginTop: "auto" }}>
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
              marginTop: "auto",
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
        </div>
        <div>
          <StyledEditButton
            onClick={onAddBreak}
            style={{
              marginTop: "30px",
              fontSize: "1em",
              color: "var(--accentColorTitle)",
            }}
          >
            + ADD BREAK
          </StyledEditButton>
        </div>

        <div>
          <BasicTimePicker
            label="Break Start"
            type="time"
            value={breakStart}
            onChange={(value) => onInputUpdate(value, setBreakStart)}
          />
        </div>
        <div>
          <BasicTimePicker
            label="Break End"
            type="time"
            value={breakEnd}
            onChange={(value) => onInputUpdate(value, setBreakEnd)}
          />

          <InputLabel>Scheduled Breaks:</InputLabel>
          {breaks?.map((breakys, index) => (
            <BreaksComponent
              myKey={breakys._id}
              breakys={breakys}
              index={index}
              onRemoveBreak={onRemoveBreak}
            />
          ))}
        </div>

        <div styles={{ display: "flex", flexDirection: "row" }}>
          {shown === true ? (
            <p style={{ color: "red" }}>
              Please make sure that all required fields have valid inputs
            </p>
          ) : null}
          <StyledButton onClick={validateForm} style={{ marginRight: "auto" }}>
            SUBMIT
          </StyledButton>
          {start ? (
            <StyledButton
              style={{ marginRight: "auto" }}
              onClick={deleteShiftById}
            >
              DELETE
            </StyledButton>
          ) : null}
        </div>
      </StyledModal>
      {/* </StyledFormWrapper> */}
    </>
  );
}

export default EditSchedule;
