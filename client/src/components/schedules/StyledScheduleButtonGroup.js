import React from "react";
import StyledButton from "../reusable/Inputs/StyledButton";

function StyledButtonGroup({ setCurrentTab }) {
  return (
    <div style={{ marginBottom: "0%", paddingBottom: "0%" }}>
      <StyledButton
        onClick={() => setCurrentTab(1)}
        style={{ margin: "0px", border: "1px solid #66b9bf" }}
      >
        DAY
      </StyledButton>
      <StyledButton
        onClick={() => setCurrentTab(2)}
        style={{ margin: "0px", border: "1px solid #66b9bf" }}
      >
        WEEK
      </StyledButton>
      <StyledButton
        onClick={() => setCurrentTab(3)}
        style={{ margin: "0px", border: "1px solid #66b9bf" }}
      >
        MONTH
      </StyledButton>
    </div>
  );
}
export default StyledButtonGroup;
