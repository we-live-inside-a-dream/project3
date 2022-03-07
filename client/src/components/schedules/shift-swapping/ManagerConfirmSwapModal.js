import React, { useState, useContext } from "react";
import moment from "moment";
import {
  StyledButton,
  StyledTextArea,
} from "../../reusable/Inputs/StyledEmployeeForm";
import AuthenticationContext from "../../login/AuthenticationContext";

function ManagerConfirmSwapModal({
  shift,
  setShiftApprovalModalIsOpen,
  decision,
  swapRequestValues,
  swapRequests,
  setSwapRequests,
}) {
  const [managerMessage, setManagerMessage] = useState();
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
  let decisionVerb = function (decision) {
    if (decision === "approved") {
      return "approve";
    }
    if (decision === "denied") {
      return "deny";
    }
  };

  const handleMessageInput = function (value, setter) {
    setter(value);
  };
  async function updateShift(newShiftSwapManagerDecision) {
    console.log("new shift swap request: ", newShiftSwapManagerDecision);
    await fetch(`/api/schedule/schedule/update?id=${shift?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newShiftSwapManagerDecision),
    });
  }
  async function postBidRequest() {
    let newShiftSwapManagerDecision = {
      _id: shift._id,
      employeeId: decision === "approved" ? shift.shiftBidId : shift.employeeId,
      lastName: decision === "approved" ? shift.bidderLastName : shift.lastName,
      firstName:
        decision === "approved" ? shift.bidderFirstName : shift.firstName,
      start: shift.start,
      end: shift.end,
      date: shift.date,
      breaks: shift.breaks,
      swapRequestStatus: decision === "approved" ? "approved" : "denied",
      swapRequestDate: shift.swapRequestDate,
      swapBidRequest: decision === "approved" ? "approved" : "denied",
      reasonForSwap: shift.reasonForSwap,
      shiftBidId: shift.shiftBidId,
      bidderFirstName: shift.bidderFirstName,
      bidderLastName: shift.bidderLastName,
      bidRequestDate: shift.bidRequestDate,
      approvingManagerId: user?._id,
      previousShiftOwnerId: shift.employeeId,
      previousShiftOwnerFirstName: shift.firstName,
      previousShiftOwnerLastName: shift.lastName,
      managerMessage: managerMessage,
    };

    console.log("New Shift...", newShiftSwapManagerDecision);
    await updateShift(newShiftSwapManagerDecision);
    let updatedSwapRequestList = swapRequests.map((swap) => {
      if (swap._id === swapRequestValues._id) {
        return newShiftSwapManagerDecision;
      } else {
        return swap;
      }
    });
    setSwapRequests(updatedSwapRequestList);
    setShiftApprovalModalIsOpen();
  }

  return (
    <div style={{ padding: "40px" }}>
      <h3 style={{ color: "var(--accentColorTitle" }}>SHIFT BID REQUEST</h3>
      <h4>{`Are you sure you would like ${decisionVerb(
        decision
      )} the following shift swap? `}</h4>
      <p>{`Date: ${formatDate(shift.date)}`}</p>
      <p>{`Time: ${formatTime(shift.start)} - ${formatTime(shift.end)}`}</p>
      <p>{`Position: ${shift.position}`}</p>
      <label>Decision Message:</label>
      <StyledTextArea
        onChange={(event) =>
          handleMessageInput(event.target.value, setManagerMessage)
        }
      ></StyledTextArea>
      <StyledButton
        onClick={() => {
          postBidRequest();
        }}
      >
        CONFIRM
      </StyledButton>
      <StyledButton onClick={() => setShiftApprovalModalIsOpen(false)}>
        CANCEL
      </StyledButton>
    </div>
  );
}

export default ManagerConfirmSwapModal;
