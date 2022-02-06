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
  function onTimeInputUpdate(value, setter) {
    setter(value);
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
          <div>
            <label>Start Day:</label>
            <input
              type="date"
              id="single-day"
              name="day"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </div>
          <div>
            <label>End Day:</label>
            <input
              type="date"
              id="single-day"
              name="day"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
          </div>
          {/*  */}
          {/* <StyledCheck
          className="check"
          name="available"
          type="checkbox"
          value={available}
          checked={available === true}
          onChange={(e) => {
            setAvailable(e.target.checked);
            if (!e.target.checked) {
              setAllDay(false);
            }
          }}
        />
        Available
      </label>{" "}
      <br />
      {available === true && (
        <label className="check-label">
          <StyledCheck
            className="check"
            name="all-day"
            type="checkbox"
            value={allDay}
            checked={allDay === true}
            onChange={(e) => {
              setAllDay(e.target.checked);
              if (e.target.checked) {
                setStart(0);
                setEnd(0);
              }
            }}
          />
          Available all day
          <br />
        </label>
      )}
      {allDay === false && available === true ? (
        <div>
          <label>Start time</label>
          <StyledTimeDate
            name="all-day"
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />{" "}
          <label>End time</label>
          <StyledTimeDate
            name="all-day"
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
      ) : null} */}
          {/*  */}
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
                  // label=""
                  type="time"
                  value={startTime}
                  onChange={(value) => {
                    onTimeInputUpdate(value, setStartTime);
                  }}
                />
              </label>
              <label>
                End Time:
                <BasicTimePicker
                  // label="end time"
                  type="time"
                  value={endTime}
                  onChange={(value) => {
                    onTimeInputUpdate(value, setEndTime);
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
