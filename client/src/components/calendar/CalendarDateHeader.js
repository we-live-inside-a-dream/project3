import React from "react";
import StyledButton from "../reusable/Inputs/StyledButton";

const headerStyle = {
  padding: "10px",
  backgroundColor: "var(--tableBackground)",
  color: "var(--accentColorTitle)",
  fontSize: "20px",
  fontFamily: "sans-serif",
  display: "flex",
  justifyContent: "spaceBetween",
};

const CalendarDateHeader = ({ onNext, onBack, dateDisplay }) => {
  return (
    <div id="header" style={headerStyle}>
      <div id="monthDisplay">{dateDisplay}</div>
      <div>
        <StyledButton onClick={onBack} id="backButton">
          Back
        </StyledButton>
        <StyledButton onClick={onNext} id="nextButton">
          Next
        </StyledButton>
      </div>
    </div>
  );
};
export default CalendarDateHeader;
