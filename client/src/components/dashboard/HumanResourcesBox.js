import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardBoxScale from "./DashboardBoxScale";
import EmployeeAvailabilityList from "../employee-availabilities/EmployeeAvailabilityList";

function ScheduleBox() {
  let navigate = useNavigate();

  return (
    <>
      <DashboardBoxScale
        padding="0px 34px"
        top={0}
        left={0}
        transform={"Scale(.24)"}
        transformOrigin={"top left"}
        title="EMPLOYEES"
        clickFunction={() => navigate("/human-resources")}
        content={<EmployeeAvailabilityList />}
      />
    </>
  );
}

export default ScheduleBox;
