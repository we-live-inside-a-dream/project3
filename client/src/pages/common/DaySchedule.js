import DynamicSchedule from "../../components/day-schedule/DynamicSchedule";
import { useState } from "react";
import Modal from "../../components/reusable/Modal";
import EditSchedule from "../../components/edit-schedule/EditSchedule";
import StyledPage from "../../components/reusable/StyledPage";
import StyledButton from "../../components/reusable/Inputs/StyledButton";

function DaySchedule() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledPage style={{ margin: "auto 50px" }}>
      <DynamicSchedule style={{ margin: " auto" }} />

      <StyledButton onClick={() => setIsOpen(true)}> Schedule</StyledButton>
      <Modal  open={isOpen} onClose={() => setIsOpen(false)}>
        <EditSchedule onClose={() => setIsOpen(false)} />
      </Modal>{" "}
    </StyledPage>
  );
}

export default DaySchedule;
