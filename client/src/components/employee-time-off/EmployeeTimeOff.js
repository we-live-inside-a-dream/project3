import { useState } from "react";
import Select from "react-select";
import { StyledInput, StyledForm, StyledFormWrapper } from "../reusable/Inputs/StyledEmployeeForm";
import StyledButton from '../reusable/Inputs/StyledButton'
import Modal from "../reusable/Modal";

const typeData = [
  { value: "vacation-paid", label: "Vacation Paid" },
  { value: "vacation-unpaid", label: "Vacation Unpaid" },
  { value: "canada-day", label: "Canada Day" },
  { value: "sick-day", label: "Sick Day" },
  { value: "dead", label: "Im Dead" },
];

const EmployeeTimeOff = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [type, setType] = useState([]);
  const [comment, setComment] = useState("");
  const [absence, setAbsence] = useState();
  const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
  const [modalAbsenceIsOpen, setModalAbsenceIsOpen] = useState(false);

  function confirmHandler() {
    setModalConfirmIsOpen(true);
  }

  const typeHandler = (newType) => {
    setType(newType);
    console.log("Vacation type", newType);
  };

  function onInputUpdate(event, setter) {
    let newValue = event.target.value;
    setter(newValue);
  }

  async function createEmployeeTimeOff(newEmployeeTimeOff) {
    await fetch("/api/timeOff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployeeTimeOff),
    });
  }

  async function postData() {
    let newEmployeeTimeOff = {
      type: [type.value],
      start,
      end,
      comment,
    };
    console.log("posting Time Off", newEmployeeTimeOff);
    await createEmployeeTimeOff(newEmployeeTimeOff);
  }

  return (
    <div>
      <StyledFormWrapper>
      <StyledForm>
        
        <h2>Time Off Request</h2>
        <div></div>
        <div>
          
          <label>Type:</label>
          <Select value={type} options={typeData} onChange={typeHandler} />
        </div>
        <div></div>
        <Modal
        onClose={() => {
          setModalAbsenceIsOpen(false);
        }}
        open={modalAbsenceIsOpen}
      >
        <label>Absence:</label>
        <input></input>
      </Modal>
        <div>
          <label>Start:</label>
          <input
            type="date"
            id="single-day"
            name="day"
            value={start}
            onChange={(e) => {
              setStart(e.target.value);
            }}
          />
        </div>
        <div>
          <label>End:</label>
          <input
            type="date"
            id="single-day"
            name="day"
            value={end}
            onChange={(e) => {
              setEnd(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Comment:</label>
          <StyledInput
            value={comment}
            onChange={(event) => onInputUpdate(event, setComment)}
          />
        </div>
        <div></div>
        <Modal
          onClose={() => {
            setModalConfirmIsOpen(false);
          }}
          open={modalConfirmIsOpen}
        >
          <StyledButton onClick={postData}>Confirm</StyledButton>
          <StyledButton onClick={() => setModalConfirmIsOpen(false)}>Cancel</StyledButton>
        </Modal>
        <div>
          <StyledButton onClick={confirmHandler}>Apply Time Off</StyledButton>
        </div>
      </StyledForm>
      </StyledFormWrapper>
    </div>
  );
};

export default EmployeeTimeOff;
