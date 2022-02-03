import TimePicker from "@mui/lab/TimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import styled from "styled-components";



const StyledBasicTimePicker = styled.div`

padding:5px;

`
// dateAdapter={AdapterDateFns({lib:"date-fns"},{formats:"fullTime24h"})}>
export default function BasicTimePicker({ onChange, value, label }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StyledBasicTimePicker>
      <TimePicker
        label={label}
        value={value}
        minutesStep={5}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
        />
        </StyledBasicTimePicker>
    </LocalizationProvider>
  );
}
