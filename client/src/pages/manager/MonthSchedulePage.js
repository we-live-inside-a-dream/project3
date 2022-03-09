import React from "react";
import CalendarScratch from "../../components/calendar/CalendarScratch";

function MonthSchedulePage({
  setCurrentTab,
  currentTab,
  showButtonGroup,
  showPositions,
}) {
  return (
    <>
      <CalendarScratch
        showButtonGroup={showButtonGroup}
        showPositions={showPositions}
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
        style={{ position: "relative", display: "flex" }}
      />
    </>
  );
}

export default MonthSchedulePage;
