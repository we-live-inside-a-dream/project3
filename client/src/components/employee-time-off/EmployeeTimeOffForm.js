import { useContext, useState, useEffect } from "react";
import Select from "react-select";
// import { InputLabel, MenuItem, Select } from "@mui/material";
import StyledButton from "../reusable/Inputs/StyledButton";
import Modal from "../reusable/Modal";
import BasicTimePicker from "../reusable/Inputs/BasicTimePicker";
import {
  StyledCheck,
  StyledTextArea,
  StyledForm,
  // StyledFormWrapper,
  RedStar,
} from "../reusable/Inputs/StyledEmployeeForm";
import * as fns from "date-fns";
import AuthenticationContext from "../login/AuthenticationContext";
import BasicDatePicker from "../reusable/Inputs/BasicDatePicker";
import moment from "moment";
import { dateValidation } from "../validateForms";

const typeData = [
  { value: "vacation-paid", label: "Vacation Paid" },
  { value: "vacation-unpaid", label: "Vacation Unpaid" },
  { value: "mental-health-day", label: "Mental Health Day" },
  { value: "sick-day", label: "Sick Day" },
];

const EmployeeTimeOffForm = ({
  existingValues,
  onSave,
  reload,
  setTimeOffRequests,
  timeOffRequests,
  setModalEditIsOpen,
  setModalApplyIsOpen,
}) => {
  const [startTime, setStartTime] = useState(
    "Wed Feb 02 2022 00:00:00 GMT-0700 (Mountain Standard Time"
  );
  const [endTime, setEndTime] = useState(
    "Wed Feb 02 2022 00:00:00 GMT-0700 (Mountain Standard Time"
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [defaultType, setDefaultType] = useState("");
  const [comment, setComment] = useState("");
  const [allDay, setAllDay] = useState(true);
  const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
  const [dateMessageVal, setDateMessageVal] = useState(null);
  const [timeMessageVal, setTimeMessageVal] = useState(null);
  const [shown, setShown] = useState(false);
  const authContext = useContext(AuthenticationContext);
  const user = authContext.user;

  useEffect(() => {
    if (existingValues) {
      let isMounted = true;
      if (isMounted) {
        const typeFilter = typeData?.filter(
          (r) => r.value === existingValues.type
        );
        setType(typeFilter);
      }
      isMounted = false;
    }
  }, [existingValues]);

  useEffect(() => {
    if (existingValues) {
      setStartTime(
        ` Wed Feb 02 2022 ${existingValues.startTime}:00 GMT-0700 (Mountain Standard Time)`
      );
      setEndTime(
        ` Wed Feb 02 2022 ${existingValues.endTime}:00 GMT-0700 (Mountain Standard Time)`
      );
      setStartDate(existingValues.startDate);
      setEndDate(existingValues.endDate);
      setComment(existingValues.comment);
      setAllDay(existingValues.allDay);
      console.log("these are the existing values", existingValues.type);
    }
  }, [existingValues]);

  function confirmHandler() {
    setModalConfirmIsOpen(true);
  }

  const typeHandler = (newType) => {
    setType(newType);
    console.log("Vacation type", newType);
  };

  function onInputUpdate(value, setter) {
    setter(value);
    console.log(value);
  }

  function onCommentInputUpdate(event, setter) {
    let newValue = event.target.value;
    setter(newValue);
  }

  async function createEmployeeTimeOff(newEmployeeTimeOff) {
    await fetch("/api/timeOff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployeeTimeOff),
    });
    setTimeOffRequests((curr) => [...curr, newEmployeeTimeOff]);
  }

  let validation;
  async function validateForm() {
    if (timeMessageVal || dateMessageVal) {
      console.log(
        "Time off time",
        timeMessageVal,
        "time off Date",
        dateMessageVal
      );
      validation = "Please make sure that all fields are valid";
      return validation;
    } else
      console.log(
        "Time off time",
        timeMessageVal,
        "time off Date",
        dateMessageVal
      );
    validation = null;
    return validation;
  }

  async function postData() {
    let newEmployeeTimeOff = {
      type: type.value,
      employeeProfileId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      startTime: fns.format(new Date(startTime), "HH:mm").toString(),
      endTime: fns.format(new Date(endTime), "HH:mm").toString(),
      startDate,
      endDate,
      allDay: allDay,
      status: "pending",
      comment: comment,
    };

    validateForm();

    if (existingValues && validation === null) {
      await onSave(newEmployeeTimeOff);
      // reload();
      setModalEditIsOpen(false);
    }

    console.log("this isss existingValues", existingValues);

    if (!existingValues && validation === null) {
      await createEmployeeTimeOff(newEmployeeTimeOff);
      setModalApplyIsOpen(false);
    } else setShown(true);

    // onSave();
    // if (existingValues) {
    //   console.log("New Time off...", newEmployeeTimeOff);
    //   // await updateShift(newEmployeeTimeOff);
    // } else {
    //   console.log("New Time off...", newEmployeeTimeOff);
    //   // await createTimeOff(newEmployeeTimeOff);
    // }
  }

  return (
    <div>
      {/* <StyledFormWrapper> */}
      <StyledForm>
        <h2>Time Off Request</h2>
        <div></div>
        <div>
          <label>
            Type:
            <RedStar />
          </label>

          <Select value={type} options={typeData} onChange={typeHandler} />
        </div>
        <div></div>

        <label>
          Start Day:
          <RedStar />
          <BasicDatePicker
            type="date"
            id="single-day"
            name="day"
            value={startDate}
            onChange={(value) => {
              onInputUpdate(
                fns.format(new Date(value), "yyyy-MM-dd").toString(),
                setStartDate
              );
            }}
          />
        </label>

        <label>
          End Day:
          <RedStar /> &nbsp;
          {!dateMessageVal ? (
            <p
              style={{
                color: "red",
                fontSize: "10px",
                marginBottom: "0px",
                marginTop: "0px",
              }}
            ></p>
          ) : null}
          {dateMessageVal ? (
            <p
              style={{
                color: "red",
                fontSize: "10px",
                marginBottom: "0px",
                marginTop: "0px",
              }}
            >
              {dateMessageVal}
            </p>
          ) : null}
          <BasicDatePicker
            type="date"
            id="single-day"
            name="day"
            value={endDate}
            onChange={(value) => {
              onInputUpdate(
                fns.format(new Date(value), "yyyy-MM-dd").toString(),
                setEndDate
              );
              setDateMessageVal(
                dateValidation(
                  startDate,
                  fns.format(new Date(value), "yyyy-MM-dd").toString()
                )
              );
            }}
          />
        </label>

        {startDate === endDate && (
          <>
            <label>
              All Day
              <StyledCheck
                className="check"
                name="all-day"
                type="checkbox"
                value={allDay}
                checked={allDay === true}
                onChange={(e) => {
                  setAllDay(e.target.checked);
                  if (e.target.checked) {
                    setStartTime("");
                    setEndTime("");
                  }
                }}
              />
            </label>
            <div></div>
          </>
        )}
        {allDay === false && (
          <>
            <label>
              Start Time:
              <BasicTimePicker
                type="time"
                value={startTime}
                onChange={(value) => {
                  onInputUpdate(value, setStartTime);
                }}
              />
            </label>
            <label>
              End Time:
              <BasicTimePicker
                type="time"
                value={endTime}
                onChange={(value) => {
                  onInputUpdate(value, setEndTime);
                }}
              />
            </label>
          </>
        )}
        <div></div>
        <div></div>
        <div>
          <label>Comments:</label>
          <StyledTextArea
            value={comment}
            onChange={(event) => onCommentInputUpdate(event, setComment)}
          />
        </div>
        <div></div>
        <Modal
          onClose={() => {
            setModalConfirmIsOpen(false);
          }}
          open={modalConfirmIsOpen}
        >
          <div style={{ padding: "20px" }}>
            <h3>Confirm Time Off</h3>
            <p>Type of time off: {type?.label}</p>
            <p>Start Day: {moment(startDate).format("yy-MM-DD")}</p>
            <p>End Day: {moment(endDate).format("YYYY-MM-DD")}</p>
            {allDay === false && (
              <>
                <p>Start Time: {moment(startTime).format("h:mm a")}</p>
                <p>End Time: {moment(endTime).format("h:mm a")}</p>
              </>
            )}
            <p>Comments: {comment}</p>
            <div></div>

            <StyledButton
              onClick={() => {
                postData();
                setModalConfirmIsOpen(false);
              }}
            >
              CONFIRM
            </StyledButton>
            <StyledButton
              onClick={() => {
                setModalConfirmIsOpen(false);
              }}
            >
              CANCEL
            </StyledButton>
          </div>
        </Modal>
        <div>
          <StyledButton style={{ marginLeft: "1px" }} onClick={confirmHandler}>
            APPLY TIME OFF
          </StyledButton>
        </div>
      </StyledForm>
      {/* </StyledFormWrapper> */}
    </div>
  );
};

export default EmployeeTimeOffForm;
