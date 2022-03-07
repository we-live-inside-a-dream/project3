import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";
import Modal from "../reusable/Modal";
import AuthenticationContext from "../login/AuthenticationContext";

let eventViewStyle = {
  position: "fixed",
  top: "50%",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "whiteSmoke",
  zIndex: "800",
  color: "grey",
  height: "300px",
  width: "300px",
  border: "1px solid lightGrey",
  padding: "20px",
  borderRadius: "5px",
  margin: "auto",
  textAlign: "left",
  overflow: "auto",
};

function EventViewDiv({
  eventToReveal,
  setIsOpen,
  setEventId,
  setExistingValues,
  existingValues,
  setCloseViewDiv,
  isOpen,
  onClose,
  allEvents,
  setAllEvents,
}) {
  const [theEvent, setTheEvent] = useState();
  const [eventStartDay, setEventStartDay] = useState();
  const [eventEndDay, setEventEndDay] = useState();
  const [eventStartTime, setEventStartTime] = useState();
  const [eventEndTime, setEventEndTime] = useState();
  const [eventComments, setEventComments] = useState();
  const [eventTitle, setEventTitle] = useState();
  const [eventType, setEventType] = useState();
  const [theEventId, setTheEventId] = useState();
  const [employeeId, setEmployeeId] = useState();
  const [eventName, setEventName] = useState();
  const authContext = useContext(AuthenticationContext);
  const user = authContext.user;

  useEffect(() => {
    if (existingValues) {
      setTheEventId(existingValues._id);
      setEventType(existingValues.type[0]);
      setEventStartDay(existingValues.startDate);
      setEventEndDay(existingValues.endDate);
      setEventComments(existingValues.notes);
      setEventStartTime(existingValues.startTime);
      setEventEndTime(existingValues.endTime);
      setEventTitle(existingValues.title);
      setEmployeeId(existingValues.employeeProfileId);
      setEventName(existingValues.title);
    }
  }, [existingValues]);
  console.log(eventStartTime, eventEndTime, eventStartDay, eventEndDay);
  async function deleteEventData(theEventId) {
    console.log("FROM THE DELETE FUNCTION", theEventId);
    await fetch(`/api/events/delete-event?id=${theEventId}`, {
      method: "DELETE",
    });
    let filteredEvents = allEvents.filter((e) => e._id !== theEventId);
    setAllEvents([...filteredEvents]);
  }

  let theDate = function (start, end) {
    let newStart = moment(start).format("ddd MMM Do yyyy");
    let newEnd = moment(end).format("ddd MMM Do yyyy");
    if (start !== end) {
      return `${newStart} - ${newEnd}`;
    } else return `${newStart}`;
  };
  let theTime = function (start, end) {
    console.log("THIS IS THE START TIME");
    let newStart = moment(start, "HH:mm").format("h:mma");
    let newEnd = moment(end, "HH:mm").format("h:mma");
    if (start !== end) {
      return `${newStart} - ${newEnd}`;
    } else if (start === "00:00" || end === "00:00") {
      return "all day";
    } else return "no times available";
  };
  console.log("FROM THE MODAL", eventToReveal);
  console.log("type of existingValues", setExistingValues);
  return (
    <div style={eventViewStyle}>
      <h3 style={{ color: "var(--accentColorTitle" }}>
        {eventName}
        {employeeId === user?._id && (
          <StyledEditButton
            onClick={() => {
              console.log("the event from edit button", theEvent);
              setEventId(theEventId);
              setExistingValues(eventToReveal);
              setIsOpen(!isOpen);
            }}
          >
            ✎
          </StyledEditButton>
        )}
        <StyledEditButton
          onClick={() => {
            setExistingValues(eventToReveal);
            deleteEventData(theEventId);
            setCloseViewDiv(true);
            onClose();
          }}
        >
          🗑️
        </StyledEditButton>
      </h3>
      <p>{`Event type: ${eventType}`}</p>
      <p>{theDate(eventStartDay, eventEndDay)}</p>
      <p>{`Time: ${theTime(eventStartTime, eventEndTime)}`}</p>
      <p>{`Notes:
      ${eventComments}`}</p>
      <div style={{ position: "relative" }}>
        <StyledEditButton
          onClick={onClose}
          style={{
            position: "absolute",
            transformOrigin: "transformRight",
            transform: "translate(80%, -770%)",
            top: "0",
            right: "0",
          }}
        >
          X
        </StyledEditButton>
      </div>
    </div>
  );
}

export default EventViewDiv;
