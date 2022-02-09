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
import moment from "moment";

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
  const authContext = useContext(AuthenticationContext);
  const user = authContext.user;

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
    console.log(value);
  }

  function onCommentInputUpdate(event, setter) {
    let newValue = event.target.value;
    setter(newValue);
  }

  let navigate = useNavigate();

  async function createEmployeeTimeOff(newEmployeeTimeOff) {
    await fetch(process.env.REACT_APP_ELECTRON_SERVER+"/api/timeOff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployeeTimeOff),
    });
  }

  async function postData() {
    let newEmployeeTimeOff = {
      type: type.value,
      employeeProfileId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      startTime: fns.format(new Date(startTime), "HH:mm").toString(),
      endTime: fns.format(new Date(endTime), "HH:mm").toString(),
      startDate,
      endDate,
      allDay: allDay,
      comment: comment,
    };
    console.log("posting Time Off", newEmployeeTimeOff);
    await createEmployeeTimeOff(newEmployeeTimeOff);
    navigate("/");
  }
  console.log("USER:", user?.firstName, user?.lastName);

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

          <label>
            Start Day:
            <BasicDatePicker
              type="date"
              id="single-day"
              name="day"
              value={startDate}
              onChange={(value) => {
                onInputUpdate(
                  fns.format(new Date(value), "yyyy-MM-dd").toString(),
                  setStartDate
                );
              }}
            />
          </label>

          <label>
            End Day: &nbsp;
            <BasicDatePicker
              type="date"
              id="single-day"
              name="day"
              value={endDate}
              onChange={(value) => {
                onInputUpdate(
                  fns.format(new Date(value), "yyyy-MM-dd").toString(),
                  setEndDate
                );
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
            <div style={{ padding: "20px" }}>
              <h3>Confirm Time Off</h3>
              <p>Type of time off:{type.label}</p>
              <p>Start Day: {moment(startDate).format("yy-MM-DD")}</p>
              <p>end Day: {moment(endDate).format("YYYY-MM-DD")}</p>
              {allDay === false && (
                <>
                  <p>Start Time: {moment(startTime).format("h:mm a")}</p>
                  <p>End Time: {moment(endTime).format("h:mm a")}</p>
                </>
              )}
              <p>Comments:{comment}</p>
              <div></div>

              <StyledButton onClick={postData}>Confirm</StyledButton>
              <StyledButton onClick={() => setModalConfirmIsOpen(false)}>
                Cancel
              </StyledButton>
            </div>
          </Modal>
          <div>
            <StyledButton
              style={{ marginLeft: "1px" }}
              onClick={confirmHandler}
            >
              Apply Time Off
            </StyledButton>
          </div>
        </StyledForm>
      </StyledFormWrapper>
    </div>
  );
};

export default EmployeeTimeOff;
