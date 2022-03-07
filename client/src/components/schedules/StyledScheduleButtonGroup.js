import React, { useState, useEffect } from "react";
import StyledButton from "../reusable/Inputs/StyledButton";

function StyledScheduleButtonGroup({ setCurrentTab, currentTab }) {
  const [activeButton, setActiveButton] = useState();
  const [addOne, setAddone] = useState(false);
  // console.log("CURRENT TAB AND ACTIVE BUTTON", currentTab, activeButton);

  useEffect(() => {
    console.log("addOne", addOne);
  }, [addOne]);

  function handleClick() {
    setAddone((prevCheck) => !prevCheck);
    if (currentTab % 2 == 0) {
      setCurrentTab((prevTab) => prevTab - 1);
    } else {
      setCurrentTab((prevTab) => prevTab + 1);
    }
  }

  useEffect(() => {
    if (!currentTab) return;
    setActiveButton(currentTab);
    console.log("currentTab", currentTab);
    console.log("activeButton", activeButton);
  }, [currentTab]);

  let buttonDay =
    activeButton === 1
      ? "var(--styledButtonHoverBackground)"
      : activeButton === 2
      ? "var(--styledButtonHoverBackground)"
      : "var(--styledButtonBackground)";
  let buttonWeek =
    activeButton === 3
      ? "var(--styledButtonHoverBackground)"
      : activeButton === 4
      ? "var(--styledButtonHoverBackground)"
      : "var(--styledButtonBackground)";
  let buttonMonth =
    activeButton === 5
      ? "var(--styledButtonHoverBackground)"
      : // : activeButton === 6
        // ? "var(--styledButtonHoverBackground)"
        "var(--styledButtonBackground)";

  let buttonPositions =
    currentTab % 2 == 0
      ? "var(--styledButtonHoverBackground)"
      : "var(--styledButtonBackground)";
  let buttonEmployee =
    currentTab % 2 == 1
      ? "var(--styledButtonHoverBackground)"
      : "var(--styledButtonBackground)";
  return (
    <>
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
            setCurrentTab(3);
            setActiveButton(3);
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
            setCurrentTab(5);
            setActiveButton(5);
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
      <div style={{ margin: "0 0 0 1em", minWidth: "11.6em" }}>
        <StyledButton
          onClick={() => handleClick()}
          style={{
            backgroundColor: buttonPositions,
            margin: "0px",
            border: "2px solid var(--styledButtonGroupBorder)",
            borderRight: "0px",
            borderRadius: "3px 0 0 3px",
            padding: ".8rem 0 .8rem 0",
            width: "5.8em",
            "&:Hover": { border: "2px solid var(--styledButtonHoverBorder)" },
          }}
        >
          POSITION
        </StyledButton>
        <StyledButton
          onClick={() => handleClick()}
          style={{
            backgroundColor: buttonEmployee,
            margin: "0px",
            border: "2px solid var(--styledButtonGroupBorder)",
            borderLeft: "0px",
            borderRadius: "0 3px 3px 0",
            padding: ".8rem 0 .8rem 0",
            width: "5.8em",
            "&:Hover": { border: "2px solid var(--styledButtonHoverBorder)" },
          }}
        >
          EMPLOYEE
        </StyledButton>
      </div>
    </>
  );
}
export default StyledScheduleButtonGroup;
