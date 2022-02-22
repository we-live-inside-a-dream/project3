import React, { useState } from "react";
import moment from "moment";
import {
  StyledButton,
  StyledTextArea,
} from "../../reusable/Inputs/StyledEmployeeForm";

function ShiftSwapConformModal({ shift, setSwapConfirmModalIsOpen }) {
  const [reasonForSwap, setReasonForSwap] = useState("");
  const formatTime = function (time) {
    let newTime = moment(time, "hh:mma").format("h:mma");
    return newTime;
  };
  const formatDate = function (date) {
    let newDate = moment(date).format("ddd, MMM, Do");
    return newDate;
  };
  const onSwapReasonInputUpdate = function (event, setter) {
    let newValue = event.target.value;
    setter(newValue);
  };

  async function updateShift(newShiftSwapRequest) {
    console.log("new user data", newShiftSwapRequest);
    await fetch(`/api/schedule/schedule/update?id=${shift?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newShiftSwapRequest),
    });
  }
  async function postSwapRequest() {
    let newShiftSwapRequest = {
      _id: shift._id,
      employeeId: shift.employeeId,
      lastName: shift.lastName,
      start: shift.start, //ISO date => HH:mm
      end: shift.end,
      date: shift.date,
      breaks: shift.breaks,
      swapRequestStatus: "pending",
      swapRequestDate: new Date(),
      reasonForSwap,
      bidRequestDate: null,
      shiftBidId: null,
      approvingManagerId: null,
      previousShiftOwnerId: shift.employeeId,
      previousShiftOwnerFirstName: shift.firstName,
      previousShiftOwnerLastName: shift.firstName,
    };

    console.log("New Shift...", newShiftSwapRequest);
    await updateShift(newShiftSwapRequest);
  }

  return (
    <div style={{ padding: "40px" }}>
      <h3 style={{ color: "var(--accentColorTitle" }}>SHIFT SWAP REQUEST</h3>
      <h4>
        Are you sure you would like to put the following <br /> shift up for
        grabs?
      </h4>
      <p>{`Date: ${formatDate(shift.date)}`}</p>
      <p>{`Time: ${formatTime(shift.start)} - ${formatTime(shift.end)}`}</p>
      <p>{`Position: ${shift.position}`}</p>
      <p>Breaks:</p>
      {shift?.breaks.map((breaky, index) => {
        return (
          <p key={index}>{`${breaky.name}: ${breaky.start} - ${breaky.end}, ${
            breaky.paid === true ? "paid" : "unpaid"
          }`}</p>
        );
      })}

      <label>Reason:</label>
      <StyledTextArea
        value={reasonForSwap}
        onChange={(event) => onSwapReasonInputUpdate(event, setReasonForSwap)}
      />

      <StyledButton onClick={postSwapRequest}>CONFIRM</StyledButton>
      <StyledButton onClick={() => setSwapConfirmModalIsOpen(false)}>
        CANCEL
      </StyledButton>
    </div>
  );
}

export default ShiftSwapConformModal;
