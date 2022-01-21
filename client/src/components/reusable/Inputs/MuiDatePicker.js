import React, { useState } from "react";
import "date-fns";
import { DatePicker, TimePicker, DateTimePicker } from "@material-ui/pickers";

function MuiDatePicker() {
  const [date, setDate] = useState(new Date());
  const [start, setStart] = useState();
  console.log();

  return (
    <div className="App">
      <div>
        <label>date</label>
        <DatePicker value={date} onChange={setDate} />
      </div>

      <div>
        <label>Hour</label>
        <TimePicker value={date} onChange={setDate} />
      </div>

      <div>
        <label>Date and Time</label>
        <DateTimePicker value={date} onChange={setDate} />
      </div>
    </div>
  );
}

//   <DayPickerInput
//         ref={datePickerRef}
//         hideOnDayClick={true}
//         onDayChange={(day) => {
//           setDate(
//             day.toLocaleDateString([], {
//               day: "numeric",
//               month: "numeric",
//               year: "numeric",
//             })
//           );
//             datePickerRef.current.showDayPicker();
//         }}
//       />

export default MuiDatePicker;
