// import React, { useState } from "react";
import Modal from "../../reusable/Modal";
import EditScheduleSelectInfo from "./EditScheduleSetInfo";

function WeekScheduleModal({ date, setModalOpen, shift, employee }) {
  let existingValues = {
    date: date,
    employeeId: employee._id,
    firstName: employee.firstName,
    lastName: employee.lastName,
  };
  console.log("THESE ARE THE EXISTING VALUES");
  return (
    <div>
      <Modal open={true} onClose={() => setModalOpen(false)}>
        <EditScheduleSelectInfo
          existingValues={existingValues}
          onClose={() => setModalOpen(false)}
        />
        **editDay**
      </Modal>
    </div>
  );
}

export default WeekScheduleModal;
