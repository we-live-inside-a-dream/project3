import React from "react";
import CalendarScratch from "../../components/calendar/CalendarScratch";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import MonthSchedulePage from "../manager/MonthSchedulePage";

function MyEventsPage({ setCurrentTab, currentTab }) {
  return (
    <>
      <StyledPage>
        <StyledPageTitle>EVENTS CALENDAR</StyledPageTitle>
        <MonthSchedulePage
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
          style={{ position: "relative", display: "flex" }}
        />
      </StyledPage>
    </>
  );
}

export default MyEventsPage;
