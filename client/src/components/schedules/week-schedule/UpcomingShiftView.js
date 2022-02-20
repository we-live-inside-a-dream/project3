import React from "react";
import moment from "moment";

function UpcomingShiftView({ shift, employee }) {
  const formatTime = function (time) {
    let newTime = moment(time, "hh:mma").format("h:mma");
    return newTime;
  };
  const formatDate = function (date) {
    let newDate = moment(date).format("ddd, MMM, Do");
    return newDate;
  };
  return (
    <div>
      <h3>Shift Details</h3>
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

export default UpcomingShiftView;
