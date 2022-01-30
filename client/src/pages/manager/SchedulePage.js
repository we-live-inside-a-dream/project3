import StyledPage from "../../components/reusable/styled-page/StyledPage";
import DaySchedulePage from "../common/DaySchedulePage";
import WeekSchedulePage from "./WeekSchedulePage";

import React from "react";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import StyledButton from "../../components/reusable/Inputs/StyledButton";

function StyledButtonGroup() {
  return (
    <div>
      <StyledButton style={{ margin: "0px", border: "1px solid #66b9bf" }}>
        DAY
      </StyledButton>
      <StyledButton style={{ margin: "0px", border: "1px solid #66b9bf" }}>
        WEEK
      </StyledButton>
      <StyledButton style={{ margin: "0px", border: "1px solid #66b9bf" }}>
        MONTH
      </StyledButton>
    </div>
  );
}
function SchedulePage() {
  return (
    <>
      <StyledPage>
        <StyledPageTitle> SCHEDULES</StyledPageTitle>
        <StyledButtonGroup />
        <WeekSchedulePage />
        {/* <DaySchedulePage /> */}
      </StyledPage>
    </>
  );
}

export default SchedulePage;
