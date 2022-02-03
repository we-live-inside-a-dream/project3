import { useState } from "react";
import Select from "react-select";
import { StyledInput } from "../reusable/Inputs/StyledEmployeeForm";
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
  const [modalDiscardIsOpen, setModalDiscardIsOpen] = useState(false);

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
      {/* <Modal
        onClose={() => {
          setModalIsOpen(false);
        }}
        open={modalIsOpen}
      >
        <label>Absence:</label>
        <input></input>
      </Modal> */}
      <h2>Time Off Request</h2>
      <div>
        <label>Type:</label>
        <Select value={type} options={typeData} onChange={typeHandler} />
      </div>
      <div></div>
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
      <Modal
        onClose={() => {
          setModalConfirmIsOpen(false);
        }}
        open={modalConfirmIsOpen}
      >
        <button onClick={postData}>Confirm</button>
        <button onClick={() => setModalConfirmIsOpen(false)}>Cancel</button>
      </Modal>
      <div>
        <button onClick={confirmHandler}>Apply Time Off</button>
      </div>
      <Modal onClose={() => {
        setModalDiscardIsOpen(false)
      }}
      open={modalDiscardIsOpen}
      >Are you sure you want to discard your changes?
      <button >Discard Changes</button>
      <button onClick={() => {setModalDiscardIsOpen(false)}}>Cancel</button>
      </Modal>
    </div>
  );
};

export default EmployeeTimeOff;
