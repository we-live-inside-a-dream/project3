import { useState } from "react";
// import StyledPage from "../../components/reusable/styled-page/StyledPage";
import WeekSchedule from "../../components/schedules/week-schedule/WeekSchedule";
import Modal from "../../components/reusable/Modal";
// import EditSchedule from "../../components/edit-schedule/EditSchedule";
import EditScheduleSetInfo from "../../components/schedules/week-schedule/EditScheduleSetInfo";
import WeekSchedulePosition from "../../components/schedules/week-schedule/WeekSchedulePosition";

import React from "react";

function WeekSchedulePage({ setCurrentTab, currentTab, scheduleEdit }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {currentTab === 3 && (
        <WeekSchedule
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
          scheduleEdit={scheduleEdit}
        />
      )}
      {currentTab === 4 && (
        <WeekSchedulePosition
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
          scheduleEdit={scheduleEdit}
        />
      )}
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <EditScheduleSetInfo onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}

export default WeekSchedulePage;
