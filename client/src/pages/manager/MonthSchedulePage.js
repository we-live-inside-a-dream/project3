import React from "react";
import CalendarScratch from "../../components/calendar/CalendarScratch";
import StyledButtonGroup from "../../components/schedules/StyledScheduleButtonGroup";

function MonthSchedulePage({ setCurrentTab, currentTab }) {
  return (
    <>
      <StyledButtonGroup
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
      />
      <CalendarScratch />
    </>
  );
}

export default MonthSchedulePage;
