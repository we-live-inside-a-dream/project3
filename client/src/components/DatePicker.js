import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

export default function DayPicker(onDaySelected) {
  return (
    <div>
      <p>Please type a day:</p>
      <DayPickerInput onDayChange={onDaySelected} />
    </div>
  );
}
