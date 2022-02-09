import { useContext, useState } from "react";
import Select from "react-select";
import StyledButton from "../reusable/Inputs/StyledButton";
import Modal from "../reusable/Modal";
import BasicTimePicker from "../reusable/Inputs/BasicTimePicker";
import {
  StyledCheck,
  StyledTextArea,
  StyledForm,
  StyledFormWrapper,
} from "../reusable/Inputs/StyledEmployeeForm";
import * as fns from "date-fns";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../../components/login/AuthenticationContext";
import BasicDatePicker from "../reusable/Inputs/BasicDatePicker";

const typeData = [
  { value: "vacation-paid", label: "Vacation Paid" },
  { value: "vacation-unpaid", label: "Vacation Unpaid" },
  { value: "canada-day", label: "Canada Day" },
  { value: "sick-day", label: "Sick Day" },
  { value: "dead", label: "Im Dead" },
];

const EmployeeTimeOff = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [comment, setComment] = useState("");
  const [allDay, setAllDay] = useState(true);
  const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
  const [modalAbsenceIsOpen, setModalAbsenceIsOpen] = useState(false);
  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;

  console.log(startTime);

  function confirmHandler() {
    setModalConfirmIsOpen(true);
  }

  const typeHandler = (newType) => {
    setType(newType);
    console.log("Vacation type", newType);
  };

  function onInputUpdate(value, setter) {
    setter(value);
  }

  function onCommentInputUpdate(event, setter) {
    let newValue = event.target.value;
    setter(newValue);
  }

  let navigate = useNavigate();

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
      employeeProfileId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      startTime: fns.format(new Date(startTime), "HH:mm").toString(),
      endTime: fns.format(new Date(endTime), "HH:mm").toString(),
      startDate: startDate,
      endDate: endDate,
      allDay: allDay,
      comment: comment,
    };
    console.log("posting Time Off", newEmployeeTimeOff);
    await createEmployeeTimeOff(newEmployeeTimeOff);
    navigate("/");
  }
  console.log("USER:", user.firstName, user.lastName);

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

          <label>
            Start Day:
            <BasicDatePicker
              type="date"
              id="single-day"
              name="day"
              value={startDate}
              onChange={(value) => {
                onInputUpdate(value, setStartDate);
              }}
            />
          </label>

          <label>
            End Day:
            <BasicDatePicker
              type="date"
              id="single-day"
              name="day"
              value={endDate}
              onChange={(value) => {
                onInputUpdate(value, setEndDate);
              }}
            />
          </label>

          {startDate === endDate && (
            <>
              <label>
                All Day
                <StyledCheck
                  className="check"
                  name="all-day"
                  type="checkbox"
                  value={allDay}
                  checked={allDay === true}
                  onChange={(e) => {
                    setAllDay(e.target.checked);
                    if (e.target.checked) {
                      setStartTime("");
                      setEndTime("");
                    }
                  }}
                />
              </label>
              <div></div>
            </>
          )}
          {allDay === false && (
            <>
              <label>
                Start Time:
                <BasicTimePicker
                  type="time"
                  value={startTime}
                  onChange={(value) => {
                    onInputUpdate(value, setStartTime);
                  }}
                />
              </label>
              <label>
                End Time:
                <BasicTimePicker
                  type="time"
                  value={endTime}
                  onChange={(value) => {
                    onInputUpdate(value, setEndTime);
                  }}
                />
              </label>
            </>
          )}
          <div></div>
          <div></div>
          <div>
            <label>Comments:</label>
            <StyledTextArea
              value={comment}
              onChange={(event) => onCommentInputUpdate(event, setComment)}
            />
          </div>
          <div></div>
          <Modal
            onClose={() => {
              setModalConfirmIsOpen(false);
            }}
            open={modalConfirmIsOpen}
          >
            <p>Type of time off:{type.label}</p>
            {/* <p>Start Day: {startDate}</p> */}
            {/* <p>end Day: {endDate}</p> */}
            <p>Start Time: {startTime.value}</p>
            <p>End Time: {endTime}</p>
            <p>Comments:{comment}</p>
            <div></div>

            <StyledButton onClick={postData}>Confirm</StyledButton>
            <StyledButton onClick={() => setModalConfirmIsOpen(false)}>
              Cancel
            </StyledButton>
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
