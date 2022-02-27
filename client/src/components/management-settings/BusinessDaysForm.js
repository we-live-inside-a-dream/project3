import React, { useState } from "react";
import Select from "react-select";
import BasicTimePicker from "../reusable/Inputs/BasicTimePicker";
import StyledButton from "../reusable/Inputs/StyledButton";
import * as fns from "date-fns";

const weekDaysData = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];
function BusinessDaysForm() {
  const [createWeekDays, setCreateWeekDays] = useState(null);
  const [startTime, setStartTime] = useState(
    "Wed Feb 02 2022 00:00:00 GMT-0700 (Mountain Standard Time"
  );
  const [endTime, setEndTime] = useState(
    "Wed Feb 02 2022 00:00:00 GMT-0700 (Mountain Standard Time"
  );
  const [add, setAdd] = useState(null);
  const [remove, setRemove] = useState(null);
  const [businessDayCreated, setBusinessDayCreated] = useState(null);

  const createWeekDayHandler = (newWeekDay) => {
    setCreateWeekDays(newWeekDay);
    console.log("created weekday", newWeekDay);
  };

  async function createBusinessDays(newBusinessDays) {
    await fetch("/api/businessDays", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBusinessDays),
    });
    setBusinessDayCreated(newBusinessDays);
  }
  console.log("this is setBusinessDayCreated", setBusinessDayCreated)

  function onInputUpdate(value, setter) {
    setter(value);
  }

  async function postData() {
    let newBusinessDaysInfo = {
      createWeekDays: createWeekDays.value,
      startTime: fns.format(new Date(startTime), "HH:mm").toString(),
      endTime: fns.format(new Date(endTime), "HH:mm").toString(),
      add,
      remove,
    };
    console.log("data posted", postData)
    createBusinessDays(newBusinessDaysInfo);
  }


  return (
    <div>
      <label>First Day of week</label>
      <label>Weekday</label>
      <Select
        defaultValue={createWeekDays}
        options={weekDaysData}
        onChange={createWeekDayHandler}
      />
      <BasicTimePicker
        type="time"
        value={startTime}
        onChange={(value) => {
          onInputUpdate(value, setStartTime);
        }}
      />
      <BasicTimePicker
        type="time"
        value={endTime}
        onChange={(value) => {
          onInputUpdate(value, setEndTime);
        }}
      />
      <StyledButton
        onClick={() => {
          postData();
        }}
      >
        Submit
      </StyledButton>
    </div>
  );
}

export default BusinessDaysForm;
