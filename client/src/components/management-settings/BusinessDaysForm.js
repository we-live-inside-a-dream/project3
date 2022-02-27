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
  const [openTime, setOpenTime] = useState(
    "Wed Feb 02 2022 00:00:00 GMT-0700 (Mountain Standard Time"
  );
  const [closeTime, setCloseTime] = useState(
    "Wed Feb 02 2022 00:00:00 GMT-0700 (Mountain Standard Time"
  );
  const [add, setAdd] = useState(null);
  const [remove, setRemove] = useState(null);

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
    setCreateWeekDays(newBusinessDays);
  }

  function onInputUpdate(value, setter) {
    setter(value);
  }

  async function postData() {
    let newBusinessDaysInfo = {
      createWeekDays: createWeekDays.value,
      openTime: fns.format(new Date(openTime), "HH:mm").toString(),
      closeTime: fns.format(new Date(closeTime), "HH:mm").toString(),
      add,
      remove,
    };
    createBusinessDays(newBusinessDaysInfo);
  }

  return (
    <div>
      <label>Weekday</label>
      <Select
        defaultValue={createWeekDays}
        options={weekDaysData}
        onChange={createWeekDayHandler}
      />
      <BasicTimePicker
        type="time"
        value={openTime}
        onChange={(value) => {
          onInputUpdate(value, setOpenTime);
        }}
      />
      <BasicTimePicker
        type="time"
        value={closeTime}
        onChange={(value) => {
          onInputUpdate(value, setCloseTime);
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
