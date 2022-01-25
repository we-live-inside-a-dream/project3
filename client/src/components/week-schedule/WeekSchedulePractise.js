import React from "react";

function WeekSchedulePractise() {
  // const weekArray = []

  //   var now = new Date();
  var weekArray = [];
  //   for (var d = new Date(2012, 0, 1); d <= now; d.setDate(d.getDate() + 1)) {
  //     weekArray.push(new Date(d));
  //   }

  return (
    <div>
      {weekArray.map((day, index) => {
        return <p key={index}>{day}</p>;
      })}
    </div>
  );
}

export default WeekSchedulePractise;
