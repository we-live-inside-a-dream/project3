import React, { useState, useEffect } from "react";
import StyledButton from "../reusable/Inputs/StyledButton";

function StyledButtonGroup({ setCurrentTab, currentTab }) {
  const [activeButton, setActiveButton] = useState();
  // console.log("CURRENT TAB AND ACTIVE BUTTON", currentTab, activeButton);

  useEffect(() => {
    setActiveButton(currentTab);
  }, [currentTab]);

  let buttonDay = activeButton === 1 ? "#e37222" : "#07889b";
  let buttonWeek = activeButton === 2 ? "#e37222" : "#07889b";
  let buttonMonth = activeButton === 3 ? "#e37222" : "#07889b";

  return (
    <div style={{ marginBottom: "0%", paddingBottom: "0%" }}>
      <StyledButton
        onClick={() => {
          setCurrentTab(1);
          setActiveButton(1);
        }}
        style={{
          backgroundColor: buttonDay,
          margin: "0px",
          border: "2px solid #66b9bf",
          "&:Hover": { border: "2px solid #eeaa78" },
        }}
      >
        DAY
      </StyledButton>
      <StyledButton
        onClick={() => {
          setCurrentTab(2);
          setActiveButton(2);
        }}
        style={{
          backgroundColor: buttonWeek,
          margin: "0px",
          border: "2px solid #66b9bf",
          "&:Hover": { border: "2px solid #eeaa78" },
        }}
      >
        WEEK
      </StyledButton>
      <StyledButton
        onClick={() => {
          setCurrentTab(3);
          setActiveButton(3);
        }}
        style={{
          backgroundColor: buttonMonth,
          margin: "0px",
          border: "2px solid #66b9bf",
          "&:Hover": { border: "2px solid #eeaa78" },
        }}
      >
        MONTH
      </StyledButton>
    </div>
  );
}
export default StyledButtonGroup;
