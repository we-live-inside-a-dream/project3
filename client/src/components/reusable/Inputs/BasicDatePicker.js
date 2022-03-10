import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import parseISO from "date-fns/parseISO";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  width: 100%;
  input {
    padding: ${(props) => props.padding || "8.5px 14px"};
  }
`
export default function BasicDatePicker({ onChange, value, label, padding }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        format="yyyy/MM/dd"
        label={label}
        value={parseISO(value)}
        onChange={onChange}
        renderInput={(params) => <StyledTextField {...params} padding={padding}/>}
      />
    </LocalizationProvider>
  );
}
