import { useState, useEffect } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import {
  StyledInput,
  StyledForm,
  StyledFormWrapper,
  StyledCheck,
  StyledTextArea,
} from "../reusable/Inputs/StyledEmployeeForm";
import StyledButton from "../reusable/Inputs/StyledButton";
import Modal from "../reusable/Modal";
import BasicTimePicker from "../reusable/Inputs/BasicTimePicker";
import * as fns from "date-fns";

const typeData = [
  { value: "holiday", label: "Holiday" },
  { value: "stat", label: "Statutory Holiday" },
  { value: "appointment", label: "Appointment" },
  { value: "meeting", label: "Meeting" },
  { value: "interview", label: "Interview" },
  { value: "staff", label: "Staff Event" },
];
const visibilityData = [
  { value: "admin", label: "Admin Only" },
  { value: "manager", label: "Management" },
  { value: "supervisor", label: "Supervisory Staff" },
  { value: "employees", label: "All Staff" },
];

const EventEditForm = ({ existingValues }) => {
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

  let params = useParams();
  let eventId = params.eventId;

  // useEffect(() => {
  //   if (existingValues) {
  //     setTitle(existingValues.title);
  //     setStartTime(existingValues.startTime);
  //     setEndTime(existingValues.endTime);
  //     setStartDate(existingValues.startDate);
  //     setEndDate(existingValues.endDate);
  //     setType(existingValues.type);
  //     setNotes(existingValues.notes);
  //     setAllDay(existingValues.allDay);
  //     setVisibility(existingValues.visibility);
  //     setMandatory(existingValues.mandatory);
  //   }
  // }, [existingValues]);

  const typeHandler = (newType) => {
    setType(newType);
    console.log("eventType", newType);
  };
  const visibilityHandler = (newVisibility) => {
    setVisibility(newVisibility);
    console.log("event visibility", newVisibility);
  };

  function onInputUpdate(event, setter) {
    let newValue = event.target.value;
    setter(newValue);
  }
  function onTimeInputUpdate(value, setter) {
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
  // async function updateEvent(newEvent) {
  //   await fetch("/api/events/" + eventId, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newEvent),
  //   });
  // }

  async function postData() {
    let newEvent = {
      title: title,
      type: [type.value],
      startTime: fns.format(new Date(startTime), "HH:mm").toString(),
      endTime: fns.format(new Date(endTime), "HH:mm").toString(),
      startDate: startDate,
      endDate: endDate,
      allDay: allDay,
      notes: notes,
      visibility: [visibility.value],
      mandatory: mandatory,
    };
    console.log("posting newEvent", newEvent);

    await createEvent(newEvent);
  }

  return (
    <div>
      <StyledFormWrapper>
        <StyledForm>
          <h2 style={{ margin: "0px" }}>Create Event</h2>
          <div></div>
          <div>
            <label>Event Name:</label>
            <StyledInput
              type="text"
              value={title}
              onChange={(event) => onInputUpdate(event, setTitle)}
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
            <label>Type:</label>
            <Select value={type} options={typeData} onChange={typeHandler} />
          </div>

          <div>
            <label>Visibility:</label>
            <Select
              value={visibility}
              options={visibilityData}
              onChange={visibilityHandler}
            />
          </div>

          <div>
            <label>Start Day:</label>
            <input
              type="date"
              id="single-day"
              name="day"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </div>
          <div>
            <label>End Day:</label>
            <input
              type="date"
              id="single-day"
              name="day"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
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
                  // label=""
                  type="time"
                  value={startTime}
                  onChange={(value) => {
                    onTimeInputUpdate(value, setStartTime);
                  }}
                />
              </label>
              <label>
                End Time:
                <BasicTimePicker
                  // label="end time"
                  type="time"
                  value={endTime}
                  onChange={(value) => {
                    onTimeInputUpdate(value, setEndTime);
                  }}
                />
              </label>
            </>
          )}
          <div></div>
          <div></div>
          <div>
            <StyledButton onClick={postData}>Confirm</StyledButton>
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
      </StyledFormWrapper>
    </div>
  );
};

export default EventEditForm;
