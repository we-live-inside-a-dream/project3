import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import {
  StyledInput,
  StyledForm,
  StyledFormWrapper,
  StyledCheck,
  StyledTextArea,
  RedStar,
} from "../reusable/Inputs/StyledEmployeeForm";
import {
  requiredValidation,
  timeValidation,
  dateValidation,
} from "../validateForms.js";
import StyledButton from "../reusable/Inputs/StyledButton";
import BasicTimePicker from "../reusable/Inputs/BasicTimePicker";
import BasicDatePicker from "../reusable/Inputs/BasicDatePicker";
import * as fns from "date-fns";
import AuthenticationContext from "../../components/login/AuthenticationContext";

const typeData = [
  { value: "holiday", label: "Holiday" },
  { value: "stat", label: "Statutory Holiday" },
  { value: "appointment", label: "Appointment" },
  { value: "meeting", label: "Meeting" },
  { value: "interview", label: "Interview" },
  { value: "staff", label: "Staff Event" },
];
const visibilityData = [
  { value: "user", label: "Myself Only" },
  { value: "admin", label: "Admin Only" },
  { value: "manager", label: "Management" },
  { value: "supervisor", label: "Supervisory Staff" },
  { value: "employee", label: "All Staff" },
];

const EventEditForm = ({
  existingValues,
  everyEventList,
  setEveryEventList,
  setTheNewEvent,
  theNewEvent,
  setIsOpen,
  daySelectChoice,
}) => {
  const [theEventId, setTheEventId] = useState("");
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [allDay, setAllDay] = useState(true);
  const [visibility, setVisibility] = useState("");
  const [mandatory, setMandatory] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [defaultVisibility, setDefaultVisibility] = useState();
  const [defaultType, setDefaultType] = useState();
  const [timeMessageVal, setTimeMessageVal] = useState(null);
  const [dateMessageVal, setDateMessageVal] = useState(null);
  const [typeMessageVal, setTypeMessageVal] = useState(null);
  const [visibilityMessageVal, setVisibilityMessageVal] = useState(null);
  const [eventNameMessageVal, setEventNameMessageVal] = useState(null);
  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;

  useEffect(() => {
    if (existingValues) {
      setTheEventId(existingValues._id);
      setTitle(existingValues.title);
      setStartTime(existingValues.startTime);
      setEndTime(existingValues.endTime);
      setStartDate(existingValues.startDate);
      setEndDate(existingValues.endDate);
      setType({ value: existingValues.type[0] });
      setNotes(existingValues.notes);
      setAllDay(existingValues.allDay);
      setVisibility(
        existingValues.visibility.map((item) => {
          return { value: item };
        })
      );
      setMandatory(existingValues.mandatory);
    } else setStartDate(daySelectChoice);
    setEndDate(daySelectChoice);
  }, [existingValues, daySelectChoice]);

  useEffect(() => {
    if (existingValues) {
      let currentVisibility = [];
      visibilityData.forEach((line) => {
        if (existingValues?.visibility?.includes(line.value)) {
          currentVisibility.push(line);
        }
      });

      setDefaultVisibility(currentVisibility);
    }
    console.log("THE DAY SELECT CHOICE IS ", daySelectChoice);
  }, [existingValues]);

  useEffect(() => {
    if (existingValues) {
      let currentType = [];
      typeData.forEach((line) => {
        if (existingValues?.type?.includes(line.value)) {
          currentType.push(line);
        }
      });
      setDefaultType(currentType);
    }
  }, [existingValues]);

  const typeHandler = (newType) => {
    setType(newType);
  };
  const visibilityHandler = (newVisibility) => {
    setVisibility(newVisibility);
  };

  function onInputUpdate(event, setter) {
    let newValue = event.target.value;
    setter(newValue);
  }
  function onTimeInputUpdate(value, setter) {
    setter(value);
  }
  function onDateInputUpdate(value, setter) {
    setter(value);
  }
  async function createEvent(newEvent) {
    await fetch("/api/events/create-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
  }
  async function updateEvent(newEvent) {
    await fetch("/api/events/update/" + theEventId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
  }

  async function deleteEventData(theEventId) {
    console.log("FROM THE DELETE FUNCTION", theEventId);
    await fetch(`/api/events/delete-event?id=${theEventId}`, {
      method: "DELETE",
    });
  }

  let validation;
  async function validateForm() {
    if (
      timeMessageVal ||
      dateMessageVal ||
      typeMessageVal ||
      visibilityMessageVal ||
      eventNameMessageVal
    ) {
      console.log(
        "Event time",
        timeMessageVal,
        "Event date",
        dateMessageVal,
        "Event type",
        typeMessageVal,
        "Event Visibility",
        visibilityMessageVal,
        "event Name",
        eventNameMessageVal
      );
      validation = "please make sure that all fields are valid";
      return validation;
    } else
      console.log(
        "Event time",
        timeMessageVal,
        "Event date",
        dateMessageVal,
        "Event type",
        typeMessageVal,
        "Event Visibility",
        visibilityMessageVal,
        "event Name",
        eventNameMessageVal
      );
    validation = null;
    return validation;
  }

  async function postData() {
    let resetValues = function () {
      setTheEventId("");
      setTitle("");
      setStartTime("");
      setEndTime("");
      setStartDate("");
      setEndDate("");
      setType();
      setNotes("");
      setAllDay(true);
      setVisibility();
      setMandatory(false);
      setRecurring(false);
    };

    let newEvent = {
      title: title,
      employeeProfileId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      type: [type.value],
      startTime,
      endTime,
      startDate: startDate,
      endDate: endDate,
      allDay: allDay,
      notes: notes,
      visibility: visibility.map((p) => p.value),
      mandatory: mandatory,
      recurring: recurring,
    };
    validateForm();
    if (!existingValues && validation === null) {
      console.log("posting newEvent", newEvent);
      await createEvent(newEvent);
      setTheNewEvent(newEvent);
      setEveryEventList((curr) => [...curr, newEvent]);
      resetValues();
      setIsOpen(false);
    }
    if (existingValues && validation === null) {
      await updateEvent(newEvent);
      setTheNewEvent(newEvent);
      console.log("posting updated event", newEvent);
      setEveryEventList([...everyEventList]);
      resetValues();
      setIsOpen(false);
    }
  }

  return (
    <div>
      {/* <StyledFormWrapper> */}
      <StyledForm>
        <h2 style={{ margin: "0px" }}>Create Event</h2>
        <div></div>
        <div>
          <label style={{ marginBottom: "0px" }}>
            Event Name:
            <RedStar />
          </label>
          {/* {title === "" ? (
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
          ) : null} */}
          <StyledInput
            type="text"
            value={title}
            onChange={(event) => {
              onInputUpdate(event, setTitle);
              setEventNameMessageVal(requiredValidation(title));
            }}
          />
        </div>
        <div>
          <br />
          <label>
            Mandatory:
            <StyledCheck
              className="check"
              name="mandatory"
              type="checkbox"
              value={mandatory}
              checked={mandatory === true}
              onChange={(e) => setMandatory(e.target.checked)}
            />
          </label>
          <br />
          <label>
            Recurring:
            <StyledCheck
              className="check"
              name="recurring"
              type="checkbox"
              value={recurring}
              checked={recurring === true}
              onChange={(e) => setRecurring(e.target.checked)}
            />
          </label>
        </div>

        <div style={{ margin: "0px" }}>
          <label>
            Type:
            <RedStar />
          </label>
          <Select
            value={defaultType}
            options={typeData}
            onChange={typeHandler}
          />
        </div>

        <div>
          <label>Visibility:</label>
          <Select
            isMulti
            name="visibility"
            value={defaultVisibility}
            options={visibilityData}
            onChange={visibilityHandler}
          />
        </div>

        <div>
          <label>
            Start Day:
            <RedStar />
          </label>
          <BasicDatePicker
            type="date"
            id="single-day"
            name="day"
            value={startDate}
            onChange={(value) => {
              onDateInputUpdate(
                fns.format(new Date(value), "yyyy-MM-dd").toString(),
                setStartDate
              );
            }}
          />
        </div>
        <div>
          <label>
            End Day:
            <RedStar />
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
                onDateInputUpdate(
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
        </div>

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
                value={` Wed Feb 02 2022 ${startTime}:00 GMT-0700 (Mountain Standard Time)`}
                onChange={(value) => {
                  onTimeInputUpdate(value, setStartTime);
                }}
              />
            </label>
            <label>
              End Time:
              <BasicTimePicker
                type="time"
                value={` Wed Feb 02 2022 ${endTime}:00 GMT-0700 (Mountain Standard Time)`}
                onChange={(value) => {
                  onTimeInputUpdate(value, setEndTime);
                }}
              />
            </label>
          </>
        )}
        <div></div>
        <div></div>
        <div style={{ display: "flex" }}>
          <StyledButton
            onClick={() => {
              postData();
            }}
            style={{ alignSelf: "flex-end" }}
          >
            CONFIRM
          </StyledButton>
          <StyledButton
            onClick={() => deleteEventData(theEventId)}
            style={{ alignSelf: "flex-end" }}
          >
            DELETE
          </StyledButton>
        </div>
        <div>
          <label>Notes:</label>
          <StyledTextArea
            value={notes}
            onChange={(event) => onInputUpdate(event, setNotes)}
          />
        </div>
        <div></div>
      </StyledForm>
      {/* </StyledFormWrapper> */}
    </div>
  );
};

export default EventEditForm;
