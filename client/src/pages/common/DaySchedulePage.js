import DaySchedule from "../../components/schedules/day-schedule/DaySchedule";
import { useState } from "react";
import Modal from "../../components/reusable/Modal";
import EditSchedule from "../../components/edit-schedule/EditSchedule";
import StyledButton from "../../components/reusable/Inputs/StyledButton";

function DaySchedulePage({ setCurrentTab, currentTab }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <DaySchedule
        style={{ margin: " auto" }}
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
      />
      <StyledButton onClick={() => setIsOpen(true)}>ADD SHIFT</StyledButton>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <EditSchedule onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}

export default DaySchedulePage;
