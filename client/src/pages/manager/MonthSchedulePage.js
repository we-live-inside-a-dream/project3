import React from "react";
import CalendarScratch from "../../components/calendar/CalendarScratch";
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
