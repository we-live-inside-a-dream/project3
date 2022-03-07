import React, { useState, useContext } from "react";
import moment from "moment";
import {
  StyledButton,
  StyledTextArea,
} from "../../reusable/Inputs/StyledEmployeeForm";
import AuthenticationContext from "../../login/AuthenticationContext";

function ShiftSwapConformModal({ shift, setShiftBidModalIsOpen }) {
  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;

  const formatTime = function (time) {
    let newTime = moment(time, "hh:mma").format("h:mma");
    return newTime;
  };
  const formatDate = function (date) {
    let newDate = moment(date).format("dddd MMMM Do, yyyy");
    return newDate;
  };

  async function updateShift(newShiftSwapRequest) {
    console.log("new shift swap request: ", newShiftSwapRequest);
    await fetch(`/api/schedule/schedule/update?id=${shift?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newShiftSwapRequest),
    });
  }
  async function postBidRequest() {
    let newShiftSwapRequest = {
      _id: shift._id,
      employeeId: shift.employeeId,
      lastName: shift.lastName,
      firstName: shift.firstName,
      start: shift.start,
      end: shift.end,
      date: shift.date,
      breaks: shift.breaks,
      swapRequestStatus: "pending",
      swapRequestDate: shift.swapRequestDate,
      swapBidRequest: "pending",
      reasonForSwap: shift.reason,
      shiftBidId: user._id,
      bidderFirstName: user.firstName,
      bidderLastName: user.lastName,
      bidRequestDate: new Date(),
      approvingManagerId: null,
      previousShiftOwnerId: shift.employeeId,
      previousShiftOwnerFirstName: shift.firstName,
      previousShiftOwnerLastName: shift.lastName,
    };

    console.log("New Shift...", newShiftSwapRequest);

    setShiftBidModalIsOpen(false);
  }

  return (
    <div style={{ padding: "40px" }}>
      <h3 style={{ color: "var(--accentColorTitle" }}>SHIFT BID REQUEST</h3>
      <h4>Are you sure you would like take the following shift?</h4>
      <p>{`Date: ${formatDate(shift.date)}`}</p>
      <p>{`Time: ${formatTime(shift.start)} - ${formatTime(shift.end)}`}</p>
      <p>{`Position: ${shift.position}`}</p>
      {/* {shift?.breaks.map((breaky, index) => {
        return (
          <p key={index}>{`${breaky.name}: ${breaky.start} - ${breaky.end}, ${
            breaky.paid === true ? "paid" : "unpaid"
          }`}</p>
        );
      })} */}

      <StyledButton onClick={postBidRequest}>CONFIRM</StyledButton>
      <StyledButton onClick={() => setShiftBidModalIsOpen(false)}>
        CANCEL
      </StyledButton>
    </div>
  );
}

export default ShiftSwapConformModal;
