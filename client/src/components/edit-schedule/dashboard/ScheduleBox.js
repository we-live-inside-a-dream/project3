import React from "react";
import { useNavigate } from "react-router-dom";
import DaySchedule from "../schedules/day-schedule/DaySchedule";
import DashboardBoxScale from "./DashboardBoxScale";

function ScheduleBox() {
  let navigate = useNavigate();

  return (
    <>
      <DashboardBoxScale
        padding="20px"
        top={0}
        left={0}
        transform={"Scale(.4)"}
        transformOrigin={"top left"}
        title="SCHEDULES"
        clickFunction={() => navigate("/schedules")}
        content={<DaySchedule />}
      />
    </>
  );
}

export default ScheduleBox;
