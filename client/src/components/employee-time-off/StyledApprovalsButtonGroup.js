import React, { useState, useEffect } from "react";
import StyledButton from "../reusable/Inputs/StyledButton";

function StyledScheduleButtonGroup({ setCurrentTab, currentTab }) {
  const [activeButton, setActiveButton] = useState();
  // console.log("CURRENT TAB AND ACTIVE BUTTON", currentTab, activeButton);

  useEffect(() => {
    setActiveButton(currentTab);
  }, [currentTab]);

  let buttonTimeOff =
    activeButton === 1
      ? "var(--styledButtonHoverBackground)"
      : "var(--styledButtonBackground)";
  let buttonShiftSwap =
    activeButton === 2
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
          backgroundColor: buttonTimeOff,
          margin: "0px",
          border: "2px solid var(--styledButtonGroupBorder)",
          "&:Hover": { border: "2px solid var(--styledButtonHoverBorder)" },
        }}
      >
        TIME OFFS
      </StyledButton>
      <StyledButton
        onClick={() => {
          setCurrentTab(2);
          setActiveButton(2);
        }}
        style={{
          backgroundColor: buttonShiftSwap,
          margin: "0px",
          border: "2px solid var(--styledButtonGroupBorder)",
          "&:Hover": { border: "2px solid var(--styledButtonHoverBorder)" },
        }}
      >
        SHIFT SWAPS
      </StyledButton>
    </div>
  );
}
export default StyledScheduleButtonGroup;
