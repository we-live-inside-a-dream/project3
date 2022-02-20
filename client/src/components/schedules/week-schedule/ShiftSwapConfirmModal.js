import React from "react";
import moment from "moment";

function ShiftSwapConformModal({ shift }) {
  const formatTime = function (time) {
    let newTime = moment(time, "hh:mma").format("h:mma");
    return newTime;
  };
  const formatDate = function (date) {
    let newDate = moment(date).format("ddd, MMM, Do");
    return newDate;
  };

  // async function postSwapRequest() {
  //   let newShift = {
  //     _id: shift._id,
  //     employeeId: shift.employeeId,
  //     lastName: shift.lastName,
  //     start: shift.start, //ISO date => HH:mm
  //     end: shift.end,
  //     date: shift.date,
  //     breaks: shift.breaks,
  //   };

  //   console.log("New Shift...", newShift);
  //   await updateShift(newShift);
  // }

  return (
    <div style={{ padding: "30px" }}>
      <h3>SHIFT SWAP REQUEST</h3>
      <h4>
        Are you sure you would like to put the following shift up for grabs?
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
    </div>
  );
}

export default ShiftSwapConformModal;
