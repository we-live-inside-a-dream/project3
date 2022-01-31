import React from "react";
import CalendarScratch from "../../components/calendar/CalendarScratch";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import StyledButtonGroup from "../../components/schedules/StyledScheduleButtonGroup";

function MonthSchedulePage({ setCurrentTab }) {
  return (
    <>
      <StyledButtonGroup setCurrentTab={setCurrentTab} />
      <CalendarScratch />
    </>
  );
}

export default MonthSchedulePage;
