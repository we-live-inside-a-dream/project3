import React, { useState} from "react";
import Select from "react-select";



const weekDaysData = [
    {value: "monday", label: "Monday"},
    {value: "tuesday", label: "Tuesday"},
    {value: "wednesday", label: "Wednesday"},
    {value: "thursday", label: "Thursday"},
    {value: "friday", label: "Friday"},
    {value: "saturday", label: "Saturday"},
    {value: "sunday", label: "Sunday"}
]
function BusinessDaysSettings() {
    const [createWeekDays, setCreateWeekDays] = useState()

    const createWeekDayHandler = (newWeekDay) => {
        setCreateWeekDays(newWeekDay);
        console.log("created weekday", newWeekDay);
      };

    // async function crateBusinessDays(newBusinessDays) {
    //     await fetch("/api/businessDays", {
    //         method: "POST",
    //         headers: { 
    //             "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newBusinessDays)
    //     })
    //     setCreateWeekDays(newBusinessDays)
    // }

    // async function postData() {
    //     let newBusinessDays = {
    //         createWeekDays: createWeekDays.value
    //     }
    // }
    
    return (
        <div>
            <input>Week Day</input>
            <input>Open Time</input>
            <input>Close Time</input>
            <Select 
            defaultValue={createWeekDays}
            options={weekDaysData}
            onChange={createWeekDayHandler}
            />
        </div>
    )
}

export default BusinessDaysSettings