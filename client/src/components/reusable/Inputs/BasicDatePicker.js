import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


function BasicDatePicker({onChange, value, label}) {

//   const handleChange = (newValue) => {
//     setValue(newValue);
//   };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
 
        <DesktopDatePicker
          label={label}
          inputFormat="yyyy-mm-dd"
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
        />

    </LocalizationProvider>
  );
}
export default BasicDatePicker
