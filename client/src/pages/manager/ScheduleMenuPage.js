import { useState, useEffect } from "react";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import DaySchedulePage from "../common/DaySchedulePage";
import WeekSchedulePage from "./WeekSchedulePage";
import MonthSchedulePage from "./MonthSchedulePage";
import React from "react";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import { useManagerSettings } from "../../components/reusable/context/ManagerSettingsProvider";

function ScheduleMenuPage() {
  const [currentTab, setCurrentTab] = useState(1);
  const [perms, setPerms] = useState();
  const value = useManagerSettings();

  useEffect(() => {
    let allPermissions = value?.permissions;
    setPerms(allPermissions);
  }, [value?.permissions]);

  console.log("PERMISSIONS!!!!!!!!!!!!!!!!!", perms);

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
            scheduleEdit={perms?.scheduleEdit}
          />
        )}
        {currentTab === 2 && (
          <DaySchedulePage
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
            scheduleEdit={perms?.scheduleEdit}
          />
        )}

        {currentTab === 3 && (
          <WeekSchedulePage
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
            scheduleEdit={perms?.scheduleEdit}
          />
        )}
        {currentTab === 4 && (
          <WeekSchedulePage
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
            scheduleEdit={perms?.scheduleEdit}
          />
        )}
        {currentTab === 5 && (
          <MonthSchedulePage
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
            scheduleEdit={perms?.scheduleEdit}
            showButtonGroup={true}
            showPositions={false}
          />
        )}
      </StyledPage>
    </>
  );
}

export default ScheduleMenuPage;
