import React, { useState } from "react";
import Modal from "../reusable/Modal";
import EditDayAvailability from "./EditDayAvailability";

function AvailabilityModal({ day, setModalOpen }) {
  return (
    <div>
      <Modal open={true} onClose={() => setModalOpen(false)}>
        <EditDayAvailability
          existingValues={day}
          onClose={() => setModalOpen(false)}
        />
        **editDay**
      </Modal>
    </div>
  );
}

export default AvailabilityModal;
