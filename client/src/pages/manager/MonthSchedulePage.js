import React from "react";
import CalendarScratch from "../../components/calendar/CalendarScratch";
import StyledScheduleButtonGroup from "../../components/schedules/StyledScheduleButtonGroup";

function MonthSchedulePage({ setCurrentTab, currentTab }) {
  return (
    <>
      <StyledScheduleButtonGroup
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
      />
      <CalendarScratch />
    </>
  );
}

export default MonthSchedulePage;
