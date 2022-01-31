import { useState } from "react";
// import StyledPage from "../../components/reusable/styled-page/StyledPage";
import WeekSchedule from "../../components/schedules/week-schedule/WeekSchedule";
import Modal from "../../components/reusable/Modal";
// import EditSchedule from "../../components/edit-schedule/EditSchedule";
import EditScheduleSetInfo from "../../components/schedules/week-schedule/EditScheduleSetInfo";

import React from "react";

function WeekSchedulePage({ setCurrentTab }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <WeekSchedule setCurrentTab={setCurrentTab} />
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <EditScheduleSetInfo onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}

export default WeekSchedulePage;
