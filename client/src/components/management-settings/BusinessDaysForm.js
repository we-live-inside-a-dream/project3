import React, { useEffect, useState } from "react";
import Select from "react-select";
import BasicTimePicker from "../reusable/Inputs/BasicTimePicker";
import StyledButton from "../reusable/Inputs/StyledButton";
import {
  StyledFormWrapper,
  StyledForm,
  RedStar,
} from "../reusable/Inputs/StyledEmployeeForm.js";
import StyledEditButton from "../../components/reusable/Inputs/StyledEditButton";
import * as fns from "date-fns";
import StyledTable from "../reusable/tables/StyledTable";
import { requiredValidation, timeValidation } from "../validateForms";

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
  const [start, setStart] = useState(
    "Wed Feb 02 2022 00:00:00 GMT-0700 (Mountain Standard Time"
  );
  const [end, setEnd] = useState(
    "Wed Feb 02 2022 00:00:00 GMT-0700 (Mountain Standard Time"
  );
  const [businessDayCreated, setBusinessDayCreated] = useState(null);
  const [dayToDelete, setDayToDelete] = useState(null);
  const [businessHours, setBusinessHours] = useState(null);
  const [openTimeMessageVal, setOpenTimeMessageVal] = useState(null);
  const [endTimeMessageVal, setEndTimeMessageVal] = useState(null);
  const [weekDayMessageVal, setWeekDayMessageVal] = useState(null);
  const [shown, setShown] = useState(false);

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
      let fetchResult = await fetch("/api/businessDays/list");
      let fetchedBusinessDays = await fetchResult.json();
      console.log("these are the fetched business days", fetchedBusinessDays);
      setBusinessHours(fetchedBusinessDays);
    };
    getBusinessDays();
  }, [dayToDelete, businessDayCreated]);

  // useEffect(() => {
  //   if(existingValues){
  //     setCreateWeekDays(existingValues.createWeekDays)
  //     setStart(existingValues.startTime)
  //     setEnd(existingValues.endTime)
  //   }
  // },[existingValues])

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

  // async function updateBusinessDay(updatedBusinessDays) {
  //   await fetch("/api/businessDays/update", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedBusinessDays)
  //   })
  //   setChangeBusinessDay(updatedBusinessDays)
  // }

  async function deleteBusinessDay(removedDay) {
    await fetch("/api/businessDays/delete/" + removedDay, {
      method: "DELETE",
    });
  }

  let validation;
  async function validateForm() {
    if (weekDayMessageVal || openTimeMessageVal || endTimeMessageVal) {
      console.log(
        "Week day",
        weekDayMessageVal,
        "open Time",
        openTimeMessageVal,
        "end Time",
        endTimeMessageVal
      );
      validation = "Please make sure that all fields are valid";
      return validation;
    } else
      console.log(
        "Week day",
        weekDayMessageVal,
        "open Time",
        openTimeMessageVal,
        "end Time",
        endTimeMessageVal
      );
    validation = null;
    return validation;
  }

  async function postData() {
    let newBusinessDaysInfo = {
      dayOfTheWeek: createWeekDays.label,
      start: fns.format(new Date(start), "HH:mm").toString(),
      end: fns.format(new Date(end), "HH:mm").toString(),
    };
    validateForm();
    if (validation === null) {
      await createBusinessDays(newBusinessDaysInfo);
    } else setShown(true);
  }

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
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {businessHours?.map((day) => {
                console.log("this is the mapped day", day);
                return (
                  <tr
                    key={day._id}
                    value={day}
                    // style={{
                    //   padding: "10px",
                    //   textAlign: "center",
                    //   height: "auto",
                    // }}
                  >
                    <td>{`${day.dayOfTheWeek}`}</td>
                    <td>{`${day.start}`}</td>
                    <td>{`${day.end}`}</td>
                    <td>
                      <div>
                        <StyledEditButton
                          margin={"0px 10px 0px 10px"}
                          onClick={() => {
                            setDayToDelete(day);
                            deleteBusinessDay(day.dayOfTheWeek);
                          }}
                        >
                          ❌
                        </StyledEditButton>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </StyledTable>
          <br />
          <label>Weekday</label>
          <div style={{ width: "50%" }}>
            {createWeekDays === "" ? (
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
            <Select
              defaultValue={createWeekDays}
              options={weekDaysData}
              // onChange={() => {
              //   createWeekDayHandler(),
              //     setWeekDayMessageVal(requiredValidation(createWeekDays));
              // }}
              onChange={createWeekDayHandler}
            />
          </div>
          <br />
          <div style={{ display: "inline-flex" }}>
            <div style={{ margin: "auto" }}>
              <label>Open Time</label>
              <BasicTimePicker
                type="time"
                value={start}
                onChange={(value) => {
                  onInputUpdate(value, setStart);
                }}
              />
            </div>
            <div style={{position: "relative", left: "30%"}}>
              <label>
                Close Time
                {!endTimeMessageVal ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "10px",
                      marginBottom: "0px",
                      marginTop: "0px",
                    }}
                  ></p>
                ) : null}
                {endTimeMessageVal ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "10px",
                      marginBottom: "0px",
                      marginTop: "0px",
                    }}
                  >
                    {endTimeMessageVal}
                  </p>
                ) : null}
                <BasicTimePicker style={{position: "relative", left: "30%"}}
                  type="time"
                  value={end}
                  onChange={(value) => {
                    onInputUpdate(value, setEnd);
                    setEndTimeMessageVal(timeValidation(start, value));
                  }}
                />
              </label>
            </div>
          </div>
          <div>
            <StyledButton
              onClick={() => {
                postData();
              }}
            >
              Submit
            </StyledButton>
          </div>
          {shown === true ? (
            <p
              style={{
                color: "red",
                fontSize: "20px",
                marginBottom: "0px",
              }}
            >
              form is invalid
            </p>
          ) : null}
        </div>
      </StyledForm>
    </StyledFormWrapper>
  );
}

export default BusinessDaysForm;
