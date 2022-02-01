import { useState } from "react";
import Select from "react-select";
import { StyledInput } from "../reusable/Inputs/StyledEmployeeForm";




const typeData = [
  { value: "vacation-paid", label: "Vacation Paid" },
  { value: "vacation-unpaid", label: "Vacation Unpaid" },
  { value: "canada-day", label: "Canada Day" },
  { value: "sick-day", label: "Sick Day" },
];


const EmployeeTimeOff = () => {
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [type, setType] = useState([])
  const [Comment, setComment] = useState("")
  const [absence, setAbsence] = useState();
  const [modalIsOpen, setModalIsOpen] = useState();

  function deleteHandler() {
    setModalIsOpen(true);
  }

  function confirmHandler() {
    setModalIsOpen(true);
  }

  const typeHandler = (newType) => {
    setType(newType)
    console.log('Vacation type', newType)

  }

  function onInputUpdate(event, setter) {
    let newValue = event.target.value;
    setter(newValue);
  }

  return (
    <div>
      <h2>Time Off Request</h2>
      <div>
      <label>Type:</label>
      <Select
        value={type}
        options={typeData}
        onChange={typeHandler}
      />
      </div>
      <div>
      <label>Absence:</label>
      <input></input>
      </div>
      <div>
      <label>Start:</label>
      <input
        type="date"
        id="single-day"
        name="day"
        value={startDay}
        onChange={(e) => {
          setStartDay(e.target.value);
        }}
      />
      </div>
      <div>
      <label>End:</label>
      <input
        type="date"
        id="single-day"
        name="day"
        value={endDay}
        onChange={(e) => {
          setEndDay(e.target.value);
        }}
      />
      </div>
      <div>
      <label>Comment:</label>
      <StyledInput value={Comment} onChange={(event) => onInputUpdate(event, setComment)} />
      </div>
      <div>
      <button onClick={confirmHandler}>Apply Time Off</button>
      <button onClick={deleteHandler}>Discard</button>
      </div>
    </div>
  );
};

export default EmployeeTimeOff;
