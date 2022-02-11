import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import parseISO from "date-fns/parseISO";

// dateAdapter={AdapterDateFns({lib:"date-fns"},{formats:"fullTime24h"})}>
export default function BasicDatePicker({ onChange, value, label }) {
  // console.log(value, label, onChange)
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        format={"yyyy/MM/dd"}
        label={label}
        value={parseISO(value)}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
