import React, { useState, useEffect } from "react";
import StyledButton from "../../components/reusable/Inputs/StyledButton";

function StyledEmployeePageButtonGroup({ setCurrentTab, currentTab }) {
  const [activeButton, setActiveButton] = useState();
  console.log("CURRENT TAB AND ACTIVE BUTTON", currentTab, activeButton);

  useEffect(() => {
    setActiveButton(currentTab);
  }, [currentTab]);

  let buttonListAll =
    activeButton === 1
      ? "var(--styledButtonHoverBackground)"
      : "var(--styledButtonBackground)";
  let buttonCreateNew =
    activeButton === 2
      ? "var(--styledButtonHoverBackground)"
      : "var(--styledButtonBackground)";
  let buttonAvailabilities =
    activeButton === 3
      ? "var(--styledButtonHoverBackground)"
      : "var(--styledButtonBackground)";
  let buttonOtherOne =
    activeButton === 4
      ? "var(--styledButtonHoverBackground)"
      : "var(--styledButtonBackground)";
  let buttonOtherTwo =
    activeButton === 5
      ? "var(--styledButtonHoverBackground)"
      : "var(--styledButtonBackground)";

  return (
    <div
      style={{
        marginRight: "auto",
        marginLeft: "auto",
        padding: "1em",
        marginBottom: "2%",
        marginTop: "1%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <StyledButton
        onClick={() => {
          setCurrentTab(1);
          setActiveButton(1);
        }}
        style={{
          backgroundColor: buttonListAll,
          margin: "0px",
          border: "2px solid var(--styledButtonGroupBorder)",
          "&:Hover": { border: "2px solid var(--styledButtonHoverBorder)" },
        }}
      >
        LIST ALL
      </StyledButton>
      <StyledButton
        onClick={() => {
          setCurrentTab(2);
          setActiveButton(2);
        }}
        style={{
          backgroundColor: buttonCreateNew,
          margin: "0px",
          border: "2px solid var(--styledButtonGroupBorder)",
          "&:Hover": { border: "2px solid var(--styledButtonHoverBorder)" },
        }}
      >
        CREATE NEW
      </StyledButton>
      <StyledButton
        onClick={() => {
          setCurrentTab(3);
          setActiveButton(3);
        }}
        style={{
          backgroundColor: buttonAvailabilities,
          margin: "0px",
          border: "2px solid var(--styledButtonGroupBorder)",
          "&:Hover": { border: "2px solid var(--styledButtonHoverBorder)" },
        }}
      >
        AVAILABILITIES
      </StyledButton>
      <StyledButton
        onClick={() => {
          setCurrentTab(4);
          setActiveButton(4);
        }}
        style={{
          backgroundColor: buttonOtherOne,
          margin: "0px",
          border: "2px solid var(--styledButtonGroupBorder)",
          "&:Hover": { border: "2px solid var(--styledButtonHoverBorder)" },
        }}
      >
        PAYROLL
      </StyledButton>
      <StyledButton
        onClick={() => {
          setCurrentTab(5);
          setActiveButton(5);
        }}
        style={{
          backgroundColor: buttonOtherTwo,
          margin: "0px",
          border: "2px solid var(--styledButtonGroupBorder)",
          "&:Hover": { border: "2px solid var(--styledButtonHoverBorder)" },
        }}
      >
        FILES
      </StyledButton>
    </div>
  );
}
export default StyledEmployeePageButtonGroup;
