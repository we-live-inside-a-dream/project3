import { useState } from "react";
import StyledPage from "../../components/reusable/StyledPage";
import WeekSchedule from "../../components/week-schedule/WeekSchedule";
import Modal from "../../components/reusable/Modal";
// import EditSchedule from "../../components/edit-schedule/EditSchedule";
import EditScheduleSetInfo from "../../components/week-schedule/EditScheduleSetInfo";

import React from "react";

function WeekSchedulePage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <StyledPage>
        <WeekSchedule />
      </StyledPage>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <EditScheduleSetInfo onClose={() => setIsOpen(false)} />
      </Modal>{" "}
    </div>
  );
}

export default WeekSchedulePage;
