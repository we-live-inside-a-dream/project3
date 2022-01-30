import DaySchedule from "../../components/schedules/day-schedule/DaySchedule";
import { useState } from "react";
import Modal from "../../components/reusable/Modal";
import EditSchedule from "../../components/edit-schedule/EditSchedule";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledButton from "../../components/reusable/Inputs/StyledButton";

function DaySchedulePage({ setCurrentTab }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <DaySchedule style={{ margin: " auto" }} setCurrentTab={setCurrentTab} />
      <StyledButton onClick={() => setIsOpen(true)}>
        **Add Schedule**
      </StyledButton>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <EditSchedule onClose={() => setIsOpen(false)} />
      </Modal>{" "}
    </>
  );
}

export default DaySchedulePage;
