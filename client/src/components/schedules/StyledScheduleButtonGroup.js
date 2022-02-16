import React, { useState, useEffect } from "react";
import StyledButton from "../reusable/Inputs/StyledButton";

function StyledScheduleButtonGroup({ setCurrentTab, currentTab }) {
  const [activeButton, setActiveButton] = useState();
  // console.log("CURRENT TAB AND ACTIVE BUTTON", currentTab, activeButton);

  useEffect(() => {
    setActiveButton(currentTab);
  }, [currentTab]);

  let buttonDay =
    activeButton === 1
      ? "var(--styledButtonHoverBackground)"
      : "var(--styledButtonBackground)";
  let buttonWeek =
    activeButton === 2
      ? "var(--styledButtonHoverBackground)"
      : "var(--styledButtonBackground)";
  let buttonMonth =
    activeButton === 3
      ? "var(--styledButtonHoverBackground)"
      : "var(--styledButtonBackground)";

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
          border: "2px solid var(--styledButtonGroupBorder)",
          "&:Hover": { border: "2px solid var(--styledButtonHoverBorder)" },
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
          border: "2px solid var(--styledButtonGroupBorder)",
          "&:Hover": { border: "2px solid var(--styledButtonHoverBorder)" },
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
          border: "2px solid var(--styledButtonGroupBorder)",
          "&:Hover": { border: "2px solid var(--styledButtonHoverBorder)" },
        }}
      >
        MONTH
      </StyledButton>
    </div>
  );
}
export default StyledScheduleButtonGroup;
