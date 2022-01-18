import DynamicSchedule from "../StyledComponents/tables/DynamicSchedule";
import { useState } from "react";
import Modal from "../Modal";
import EditSchedule from "../EditSchedule";
import StyledPage from "../StyledComponents/StyledPage";

function DaySchedule() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledPage style={{ margin: "auto 50px" }}>
      <DynamicSchedule style={{ margin: " auto" }} />

      <button onClick={() => setIsOpen(true)}> Schedule</button>
      <Modal  open={isOpen} onClose={() => setIsOpen(false)}>
        <EditSchedule onClose={onclose} />
      </Modal>{" "}


    </StyledPage>
  );
}

export default DaySchedule;
