import DaySchedule from "../../components/schedules/day-schedule/DaySchedule";
import { useState } from "react";
import Modal from "../../components/reusable/Modal";
import EditSchedule from "../../components/edit-schedule/EditSchedule";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledButton from "../../components/reusable/Inputs/StyledButton";

function DaySchedulePage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* <StyledPage c> */}
      <DaySchedule style={{ margin: " auto" }} />
      <StyledButton onClick={() => setIsOpen(true)}>
        **Add Schedule**
      </StyledButton>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <EditSchedule onClose={() => setIsOpen(false)} />
      </Modal>{" "}
      {/* </StyledPage> */}
    </>
  );
}

export default DaySchedulePage;
