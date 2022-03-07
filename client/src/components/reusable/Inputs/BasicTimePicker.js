import TimePicker from "@mui/lab/TimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import parseISO from "date-fns/parseISO";

const StyledBasicTimePicker = styled.div`
  /* padding: 5px; */
  margin-left: 0px;
`;
// dateAdapter={AdapterDateFns({lib:"date-fns"},{formats:"fullTime24h"})}>
export default function BasicTimePicker({ onChange, value, label }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledBasicTimePicker>
        <TimePicker
          format={"HH:mm"}
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
