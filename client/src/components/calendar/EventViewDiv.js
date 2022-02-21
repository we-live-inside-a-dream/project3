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
  isOpen,
  onClose,
}) {
  const [theEvent, setTheEvent] = useState();
  const authContext = useContext(AuthenticationContext);
  const user = authContext.user;

  useEffect(() => {
    if (eventToReveal) {
      setTheEvent(eventToReveal);
    }
  }, [eventToReveal]);

  let theDate = function (start, end) {
    if (start !== end) {
      return `${moment(start).format("ddd MMM do yyyy")} - ${moment(
        start
      ).format("ddd MMM do yyyy")}`;
    } else return `${moment(start).format("ddd MMM do yyyy")}`;
  };
  let theTime = function (start, end) {
    console.log("FROM THE TIME FUNCTION", start, end);
    if (start && end) {
      return `${moment(start).format("HH:mm a")} - ${moment(start).format(
        "HH:mm a"
      )}`;
    } else return "all day";
  };
  console.log("FROM THE MODAL", eventToReveal);
  console.log("type of existingValues", setExistingValues);
  return (
    <div style={eventViewStyle}>
      <h3 style={{ color: "var(--accentColorTitle" }}>
        {theEvent?.title}
        {theEvent?.employeeProfileId === user?._id && (
          <StyledEditButton
            onClick={() => {
              console.log("the event from edit button", theEvent);
              setEventId(theEvent?._id);
              setExistingValues(eventToReveal);
              setIsOpen(!isOpen);
            }}
          >
            ✎
          </StyledEditButton>
        )}
      </h3>
      <p>{`Event type: ${theEvent?.type}`}</p>
      <p>{theDate(theEvent?.startDate, theEvent?.endDate)}</p>
      <p>{`Time: ${theTime(theEvent?.startTime, theEvent?.endTime)}`}</p>
      <p>{`Notes:
      ${theEvent?.notes}`}</p>
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