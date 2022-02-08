import Modal from "../reusable/Modal";
// import EditDayAvailability from "./EditDayAvailability";
import EmployeeAvailabilityForm from "./EmployeeAvailabilityForm";

function AvailabilityModal({ existingValues, setModalOpen, theId }) {
  return (
    <div>
      <Modal open={true} onClose={() => setModalOpen(false)}>
        <EmployeeAvailabilityForm
          existingValues={existingValues}
          theId={theId}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default AvailabilityModal;
