import React, { useState } from "react";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";
import moment from "moment";

const Day = ({
  day,
  onClick,
  events,
  setRevealEventDetails,
  revealEventDetails,
  setEventToReveal,
  setEventId,
  setExistingValues,
  eventId,
  setIsOpen,
  daySelectChoice,
  setDaySelectChoice,
  isOpen,
}) => {
  const className = `day ${day.value === "padding" ? "padding" : ""} ${
    day.isCurrentDay ? "currentDay" : ""
  }`;
  const borderColor = function (value) {
    if (value !== "padding") {
      return " 1px solid lightGrey";
    } else return " 1px solid white";
  };

  const eventDivStyle = {
    backgroundColor: "var(--accentColorTitle)",
    padding: "0px, 5px",
    margin: "2px 5px",
    borderRadius: "3px",
    overflow: "hidden",
    wrap: "none",
    overflowWrap: "normal",
    whiteSpace: "nowrap",
    zIndex: "300",
  };
  const addEventButtonStyle = {
    color: "lightGrey",
    position: "absolute",
    transformOrigin: "topRight",
    top: "0",
    right: "0",
    marginTop: "0px",
    marginRight: "4px",
    fontSize: "20px",

    // transform: ()
  };
  const showEvent = function (event) {
    console.log("THE EVENT FROM SHOW EVERN", event);
    setEventToReveal(event);
    setRevealEventDetails(!revealEventDetails);
  };

  return (
    <div
      // onClick={onClick}
      className={className}
      style={{
        width: "14%",
        height: "130px",
        cursor: "pointer",
        boxSizing: "borderBox",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        border: borderColor(day.value),
        zIndex: "100",
        position: "relative",
      }}
    >
      {day.value !== "padding" ? (
        <StyledEditButton
          onClick={() => {
            setDaySelectChoice(moment(day.date).format("yyyy-MM-DD"));
            setIsOpen(!isOpen);
          }}
          style={addEventButtonStyle}
          margin="0px"
        >
          +
        </StyledEditButton>
      ) : null}
      {day.value !== "padding" ? (
        <p style={{ margin: "2px 7px 0px 2px", fontSize: "20px" }}>
          {day.value}
        </p>
      ) : null}

      {events?.map((e, index) => {
        return (
          <div
            key={index}
            style={eventDivStyle}
            onClick={() => {
              // setEventToReveal(e);
              showEvent(e);
              setEventId(setEventId);
              eventId(setEventId);
              isOpen(true);
            }}
            setRevealEventDetails={setRevealEventDetails}
            revealEventDetails={revealEventDetails}
            setEventId={setEventId}
            eventId={setEventId}
            onClose={() => setIsOpen(false)}
            // isOpen={isOpen}
            // setIsOpen={setIsOpen}
            existingValues={e}
            setExistingValues={setExistingValues}
          >
            <p
              style={{
                color: "white",
                padding: "0px 3px",
                marginTop: "2px",
                marginBottom: "2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {e.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default Day;
