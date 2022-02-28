import React, { useEffect, useState } from "react";
import Select from "react-select";
import BasicTimePicker from "../reusable/Inputs/BasicTimePicker";
import StyledButton from "../reusable/Inputs/StyledButton";
import {
  StyledFormWrapper,
  StyledForm,
  RedStar,
} from "../reusable/Inputs/StyledEmployeeForm.js";
import * as fns from "date-fns";
import StyledTable from "../reusable/tables/StyledTable";

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
  const [businessDayCreated, setBusinessDayCreated] = useState(null);


  const createWeekDayHandler = (newWeekDay) => {
    setCreateWeekDays(newWeekDay);
    console.log("created weekday", newWeekDay);
  };
  console.log("this is setBusinessDayCreated", setBusinessDayCreated);

  function onInputUpdate(value, setter) {
    setter(value);
  }


  useEffect(() => {
    const getBusinessDays = async () => {
      let fetchResult = await fetch("/api/businessDays/list/")
      let fetchedBusinessDays = await fetchResult.json()
      console.log("these are the fetched business days",fetchedBusinessDays )
      setBusinessDayCreated(fetchedBusinessDays)
    }
    getBusinessDays()
  },[])
  async function postData() {
    let newBusinessDays = {
      dayOfTheWeek: createWeekDays.value,
      start: fns.format(new Date(startTime), "HH:mm").toString(),
      end: fns.format(new Date(endTime), "HH:mm").toString()
    };
    // async function createBusinessDays(newBusinessDays) {
      await fetch("/api/businessDays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBusinessDays),
      });
      setBusinessDayCreated(newBusinessDays);
  }



  // async function updateBusinessDay(updatedBusinessDay) {
  //   await fetch()
  // }

  return (
    <StyledFormWrapper>
      <StyledForm>
        <div>
          <StyledTable padding={"5px"}>
            <thead>
              <tr>
                <th>Weekday</th>
                <th>Open Time</th>
                <th>Close Time</th>
              </tr>
            </thead>
            <tbody>
              {businessDayCreated?.map((day) => {
                console.log("this is the mapped day", day)
                return (
                <tr
                key={day.created}
                value={day}
                style={{
                  padding: "10px",
                  textAlign: "center",
                  height: "auto",
                }}
                >
                  <td>
                  <td>{`${day.createWeekDays}`}</td>
                    <td>{`${day.startTime}`}</td>
                    <td>{`${day.endTime}`}</td>
                  </td>

                </tr>
                )
              })}
            </tbody>
              

          </StyledTable>
          
          {/* <label>
            First Day of week
            <RedStar />
            </label>
          <Select
            defaultValue={createWeekDays}
            options={weekDaysData}
            onChange={createWeekDayHandler}
          /> */}
          <br />
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
      </StyledForm>
    </StyledFormWrapper>
  );
}

export default BusinessDaysForm;


//add seven dives 