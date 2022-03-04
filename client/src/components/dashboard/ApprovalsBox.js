import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardBoxScale from "./DashboardBoxScale";
// import EmployeeUpcomingShiftList from "./EmployeeUpcomingShiftList";

function ScheduleBox() {
  let navigate = useNavigate();
  let content = "THERE ARE SOME PENDING APPROVALS";

  return (
    <>
      <DashboardBoxScale
        padding="20px"
        top={0}
        left={0}
        transform={"Scale(1)"}
        transformOrigin={"top left"}
        title="MANAGER APPROVALS"
        clickFunction={() => navigate("/managerApprovalsPage")}
        content={content}
      />
    </>
  );
}

export default ScheduleBox;
