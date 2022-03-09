import React from "react";
import CalendarScratch from "../../components/calendar/CalendarScratch";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import MonthSchedulePage from "../manager/MonthSchedulePage";

function MyEventsPage({ setCurrentTab, currentTab }) {
  return (
    <>
      <StyledPage>
        <StyledPageTitle>Event Calendar</StyledPageTitle>
        <MonthSchedulePage
          showButtonGroup={false}
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
          style={{ position: "relative", display: "flex" }}
        />
      </StyledPage>
    </>
  );
}

export default MyEventsPage;
