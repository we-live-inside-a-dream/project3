import Modal from "../reusable/Modal";
import EmployeeTimeOff from "./EmployeeTimeOff";

function EmployeeTimeOffModal() {
    return(
        <Modal open={true} onClose={() => setModalIsOpen(false)}>
            <EmployeeTimeOff />
        </Modal>
    
    )
}

{/* <Modal open={true} onClose={() => setModalOpen(false)}>
        <EditDayAvailability
          existingValues={day}
          onClose={() => setModalOpen(false)}
        />
        **editDay**
      </Modal> */}