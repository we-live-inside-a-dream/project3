import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

export default function DatePicker({ selectTheDay, setDay }) {
  //   useEffect(() => {
  //     datePickerRef.current.showDayPicker();
  //   }, [datePickerRef]);

  return (
    <div>
      <p>Please type a day:</p>
      <DayPickerInput
        // ref={datePickerRef}
        hideOnDayClick={true}
        onDayChange={(day) => {
          setDay(
            day.toLocaleDateString([], {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            })
          );
          //   datePickerRef.current.showDayPicker();
        }}
      />
    </div>
  );
}
