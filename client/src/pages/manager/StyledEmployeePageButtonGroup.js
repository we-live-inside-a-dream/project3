import React, { useState, useEffect } from "react";
import StyledButton from "../../components/reusable/Inputs/StyledButton";

function StyledEmployeePageButtonGroup({ setCurrentTab, currentTab }) {
  const [activeButton, setActiveButton] = useState();
  console.log("CURRENT TAB AND ACTIVE BUTTON", currentTab, activeButton);

  useEffect(() => {
    setActiveButton(currentTab);
  }, [currentTab]);

  let buttonListAll = activeButton === 1 ? "#e37222" : "#07889b";
  let buttonCreateNew = activeButton === 2 ? "#e37222" : "#07889b";
  let buttonAvailabilities = activeButton === 3 ? "#e37222" : "#07889b";
  let buttonOtherOne = activeButton === 4 ? "#e37222" : "#07889b";
  let buttonOtherTwo = activeButton === 5 ? "#e37222" : "#07889b";

  return (
    <div
      style={{
        marginRight: "20%",
        marginLeft: "20%",
        width: "auto",
        marginBottom: "2%",
        marginTop: "1%",
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
          border: "2px solid #66b9bf",
          "&:Hover": { border: "2px solid #eeaa78" },
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
          border: "2px solid #66b9bf",
          "&:Hover": { border: "2px solid #eeaa78" },
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
          border: "2px solid #66b9bf",
          "&:Hover": { border: "2px solid #eeaa78" },
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
          border: "2px solid #66b9bf",
          "&:Hover": { border: "2px solid #eeaa78" },
        }}
      >
        OTHER ONE
      </StyledButton>
      <StyledButton
        onClick={() => {
          setCurrentTab(5);
          setActiveButton(5);
        }}
        style={{
          backgroundColor: buttonOtherTwo,
          margin: "0px",
          border: "2px solid #66b9bf",
          "&:Hover": { border: "2px solid #eeaa78" },
        }}
      >
        OTHER TWO
      </StyledButton>
    </div>
  );
}
export default StyledEmployeePageButtonGroup;
