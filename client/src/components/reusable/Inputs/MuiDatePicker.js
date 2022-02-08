import React, { useState } from "react";
import "date-fns";
import { DatePicker, TimePicker, DateTimePicker } from "@material-ui/pickers";

function MuiDatePicker() {
  return (
    <div className="App">
      <div>
        <label>date</label>
        <DatePicker value={date} onChange={setDate} />
      </div>
    </div>
  );
}

//

export default MuiDatePicker;
