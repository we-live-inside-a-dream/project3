import DynamicSchedule from "../StyledComponents/tables/DynamicSchedule";
import { useState } from "react";
import Modal from "../StyledComponents/Modal";
import EditSchedule from "../editSchedule/EditSchedule";
import StyledPage from "../StyledComponents/StyledPage";
import StyledButton from "../StyledComponents/Inputs/StyledButton";

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
