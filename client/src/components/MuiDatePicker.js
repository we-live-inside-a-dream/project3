import React, { useState } from 'react'
import 'date-fns'
import { DatePicker, TimePicker, DateTimePicker } from '@material-ui/pickers';

function MuiDatePicker() {
    const [dateSelected, setDateSelected] = useState(new Date())
  
    console.log("date selected",dateSelected)
  
    return (
      <div className="App">
        <div>
          <lable>date</lable>
          <DatePicker value={dateSelected} onChange={setDateSelected}/>
        </div>
  
        <div>
          <lable>Hour</lable>
          <TimePicker value={dateSelected} onChange={setDateSelected}/>
        </div>
  
        <div>
          <lable>Date and Time</lable>
          <DateTimePicker value={dateSelected} onChange={setDateSelected}/>
        </div>
        
      </div>
    );
  }

  export default MuiDatePicker