import React from "react";
import { useNavigate } from "react-router-dom";
// import DaySchedule from "../schedules/day-schedule/DaySchedule";
import WeekSchedule from "../schedules/week-schedule/WeekSchedule";
import DashboardBoxScale from "./DashboardBoxScale";

function ScheduleBox() {
  let navigate = useNavigate();

  return (
    <>
      <DashboardBoxScale
        padding="20px"
        top={0}
        left={0}
        transform={"Scale(.3)"}
        transformOrigin={"top left"}
        title="SCHEDULES"
        clickFunction={() => navigate("/schedules")}
        content={<WeekSchedule />}
      />
    </>
  );
}

export default ScheduleBox;
