import { useState } from "react";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import DaySchedulePage from "../common/DaySchedulePage";
import WeekSchedulePage from "./WeekSchedulePage";
import MonthSchedulePage from "./MonthSchedulePage";
import React from "react";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";

function ScheduleMenuPage() {
  const [currentTab, setCurrentTab] = useState(1);
  return (
    <>
      <StyledPage>
        <StyledPageTitle style={{ gridTemplateRow: "1", marginBottom: "40px" }}>
          SCHEDULES
        </StyledPageTitle>
        {currentTab === 1 && (
          <DaySchedulePage
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
          />
        )}
        {currentTab === 2 && (
          <WeekSchedulePage
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
          />
        )}
        {currentTab === 3 && (
          <MonthSchedulePage
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
          />
        )}
      </StyledPage>
    </>
  );
}

export default ScheduleMenuPage;