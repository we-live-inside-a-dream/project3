import DaySchedule from "../../components/schedules/day-schedule/DaySchedule";
import { useState } from "react";
import Modal from "../../components/reusable/Modal";
// import EditSchedule from "../../components/edit-schedule/EditSchedule";
import StyledButton from "../../components/reusable/Inputs/StyledButton";
import DaySchedulePosition from "../../components/schedules/day-schedule/DaySchedulePosition";

function DaySchedulePage({ setCurrentTab, currentTab, scheduleEdit }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {currentTab === 1 && (
        <DaySchedule
          style={{ margin: " auto" }}
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
          create={isOpen}
          scheduleEdit={scheduleEdit}
        />
      )}
      {currentTab === 2 && (
        <DaySchedulePosition
          style={{ margin: "auto" }}
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
          create={isOpen}
          scheduleEdit={scheduleEdit}
        />
      )}
      {/* <StyledButton onClick={() => setIsOpen(true)}>ADD SHIFT</StyledButton>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <EditSchedule onClose={() => setIsOpen(false)} />
      </Modal> */}
    </>
  );
}

export default DaySchedulePage;
