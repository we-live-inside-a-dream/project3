import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardBoxScale from "./DashboardBoxScale";
import EmployeeUpcomingShiftList from "./EmployeeUpcomingShiftList";

function ScheduleBox() {
  let navigate = useNavigate();

  return (
    <>
      <DashboardBoxScale
        padding="20px"
        top={0}
        left={0}
        transform={"Scale(1)"}
        transformOrigin={"top left"}
        title="UPCOMING SHIFTS"
        clickFunction={() => navigate("/my-page")}
        content={<EmployeeUpcomingShiftList />}
      />
    </>
  );
}

export default ScheduleBox;
