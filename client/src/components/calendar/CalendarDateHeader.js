import React from "react";
import StyledButton from "../reusable/Inputs/StyledButton";
import StyledScheduleButtonGroup from "../schedules/StyledScheduleButtonGroup";
import StyledPageTitle from "../reusable/styled-page/StyledPageTitle";

const headerStyle = {
  padding: "10px",
  backgroundColor: "var(--tableBackground)",
  color: "var(--accentColorTitle)",
  fontSize: "20px",
  fontFamily: "sans-serif",
  display: "grid",
  marginBottom: "0px",
  marginTop: "0px",
  gridTemplateColumns: "25% 50% 25%",
  justifyContent: "baseline",
};

const CalendarDateHeader = ({
  onNext,
  onBack,
  dateDisplay,
  currentTab,
  setCurrentTab,
  showButtonGroup,
  showPositions,
}) => {
  return (
    <div id="header" style={headerStyle}>
      <div style={{ gridRow: "1", margin: "auto auto 0px 0px" }}>
        {showButtonGroup === true ? (
          <StyledScheduleButtonGroup
            style={{
              marginBottom: "0px",
              marginTop: "0px",
            }}
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
            showPositions={showPositions}
          />
        ) : null}
      </div>

      <div
        style={{
          gridRow: "1",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <StyledPageTitle
          id="monthDisplay"
          style={{
            marginBottom: "auto",
            paddingBottom: "5px",
          }}
        >
          {dateDisplay}
        </StyledPageTitle>
      </div>
      <div
        style={{
          margin: "auto 0px 0px auto",
          float: "right",
          gridRow: "1",
        }}
      >
        <StyledButton
          onClick={onBack}
          id="backButton"
          style={{
            fontSize: "2em",
            padding: "0px 20px",
            margin: "0px 0px",
            border: "2px solid var(--styledButtonGroupBorder)",
          }}
        >
          ⇦
        </StyledButton>
        <StyledButton
          onClick={onNext}
          id="nextButton"
          style={{
            padding: "0px 20px",
            fontSize: "2em",
            margin: "0px 0px",
            border: "2px solid var(--styledButtonGroupBorder)",
          }}
        >
          ⇨
        </StyledButton>
      </div>
    </div>
  );
};
export default CalendarDateHeader;
