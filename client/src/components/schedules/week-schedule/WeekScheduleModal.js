// import React, { useState } from "react";
import EditSchedule from "../../edit-schedule/EditSchedule";
import Modal from "../../reusable/Modal";

function WeekScheduleModal({ date, setModalOpen, shift, employee }) {
  let existingValues = {
    date: date,
    employeeId: employee._id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    start: "",
    end: "",
    breaks: [],
  };
  console.log("THESE ARE THE EXISTING VALUES");
  return (
    <div>
      <Modal open={true} onClose={() => setModalOpen(false)}>
        <EditSchedule
          existingValues={existingValues}
          onClose={() => setModalOpen(false)}
          shiftId={shift?._id}
        />
        {/* <EditSchedule /> */}
        **editDay**
      </Modal>
    </div>
  );
}

export default WeekScheduleModal;
