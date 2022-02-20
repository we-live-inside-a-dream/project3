import React from "react";
import CalendarScratch from "../../components/calendar/CalendarScratch";

function MonthSchedulePage({ setCurrentTab, currentTab }) {
  return (
    <>
      <CalendarScratch
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
        style={{ position: "relative", display: "flex" }}
      />
    </>
  );
}

export default MonthSchedulePage;
