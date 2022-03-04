import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardBoxScale from "./DashboardBoxScale";
// import EmployeeUpcomingShiftList from "./EmployeeUpcomingShiftList";

function ScheduleBox() {
  let navigate = useNavigate();
  let content = "THIS LINK HAS SETTINGS/CONFIG for MANAGEMENT";

  return (
    <>
      <DashboardBoxScale
        padding="20px"
        top={0}
        left={0}
        transform={"Scale(1)"}
        transformOrigin={"top left"}
        title="SETTINGS"
        clickFunction={() => navigate("/ManagerSettingsPage")}
        content={content}
      />
    </>
  );
}

export default ScheduleBox;
