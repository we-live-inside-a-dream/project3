import { useState } from "react";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import DaySchedulePage from "../common/DaySchedulePage";
import WeekSchedulePage from "./WeekSchedulePage";
import MonthSchedulePage from "./MonthSchedulePage";

// import StyledButtonGroup from "../../components/schedules/StyledScheduleButtonGroup";
import React from "react";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";

function SchedulePage() {
  const [currentTab, setCurrentTab] = useState(1);
  //   const CurrentTabContext = React.createContext(currentTab);
  return (
    <>
      <StyledPage>
        <StyledPageTitle style={{ gridTemplateRow: "1" }}>
          SCHEDULES
        </StyledPageTitle>
        {currentTab === 1 && <DaySchedulePage setCurrentTab={setCurrentTab} />}
        {currentTab === 2 && <WeekSchedulePage setCurrentTab={setCurrentTab} />}
        {currentTab === 3 && (
          <MonthSchedulePage setCurrentTab={setCurrentTab} />
        )}
      </StyledPage>
    </>
  );
}

export default SchedulePage;
