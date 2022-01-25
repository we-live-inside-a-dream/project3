import StyledPage from "../../components/reusable/StyledPage";
import WeekSchedule from "../../components/week-schedule/WeekSchedule";
import WeekSchedulePractise from "../../components/week-schedule/WeekSchedulePractise";
import React from "react";

function WeekSchedulePage() {
  return (
    <div>
      <StyledPage>
        <WeekSchedule />
      </StyledPage>
    </div>
  );
}

export default WeekSchedulePage;
