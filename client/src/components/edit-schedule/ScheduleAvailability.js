import React, { useEffect, useState } from "react";
import * as fns from "date-fns";

const ScheduleAvailability = ({ date, id }) => {
  const [renderAvailability, setRenderAvailability] = useState();
  const [renderTimeoff, setRenderTimeoff] = useState();
  const [maxHoursPerWeek, setMaxHoursPerWeek] = useState(0);
  const [timeoff, setTimeoff] = useState([]);
  // const [timeBookedOff, setTimeBookedOff] = useState(false);
  const [availability, setAvailability] = useState({
    days: [],
    day: "",
    maxHoursPerWeek: 0,
  });

  useEffect(() => {
    setRenderTimeoff(null);
    function isEmployeeavailable() {
      let dayOfWeek = fns.getDay(new Date(date));
      console.log("isEmpAvail!");
      // dayOfweek is the index for days array monday=0, sunday=6
      const availableToday = availability?.days[dayOfWeek];

      if (!availableToday?.available) {
        setRenderAvailability("employee is unavailable");
      } else if (!availableToday?.allDay) {
        setRenderAvailability(
          `employee is available between ${availableToday?.start} and ${availableToday?.end}`
        );
      } else {
        setRenderAvailability("employee is free to suffer!!");
      }
    }
    function isTimeoff() {
      timeoff.forEach((time) => {
        if (time.startDate <= date && time.endDate >= date) {
          if (time.startDate === time.endDate) {
            if (!time.allDay) {
              setRenderTimeoff(
                ` ${time.startDate} hours are ${time.startTime} to ${time.endTime} scheduled off `
              ); // scheduled off but not all day
            } else {
              setRenderTimeoff(`employee is off ${time.startDate}`);
            } // scheduled off all day
          } else {
            setRenderTimeoff(
              `approved ${time.type} ${time.startDate} to ${time.endDate}`
            );
          } //multiple days off
          // setRenderTimeoff("Time off true");
        } else {
          return "im here";
          setRenderTimeoff(null);
        }
      });
    }
    isTimeoff();
    isEmployeeavailable();
  }, [availability, date]);

  useEffect(() => {
    if (id) {
      const fetchAvailabilityById = async () => {
        let fetchResult = await fetch(
          "/api/availability/by-employee/off/" + id
        );
        let theAvailability = await fetchResult.json();
        console.log(theAvailability);
        setAvailability(theAvailability.availabilities);
        setMaxHoursPerWeek(theAvailability?.availabilities.maxHoursPerWeek);
        setTimeoff(theAvailability.vacation);
      };
      fetchAvailabilityById();
    }
  }, [id]);

  useEffect(() => {
    console.log("time off function", renderTimeoff);
  }, [renderTimeoff]);

  // useEffect(()=>{
  //     let AvailableToday = function (dayObject) {
  //         // console.log("rendering availability for ", dayObject);
  //         if (dayObject.available === false) {
  //             return setRenderAvailability("--");
  //         } else if (dayObject.available === true && dayObject.allDay === true) {
  //             return setRenderAvailability("all day");
  //         } else if (dayObject.available === true && dayObject.allDay === false) {
  //             return setRenderAvailability(`${
  //                 dayObject.start > 12 ? dayObject.start - 12 : dayObject.start
  //             } - ${dayObject.end > 12 ? dayObject.end - 12 : dayObject.end}`);
  //         } else return "?";
  //     };

  //     AvailableToday(availability)
  // },[availability])

  return (
    <div>
      {renderTimeoff ? renderTimeoff : renderAvailability}
      <br />
      <br />
      maxhours:{maxHoursPerWeek}
    </div>
  );
};

export default ScheduleAvailability;

// function isTimeoff(time) {
//   let returnValue;
//   if (
//     date === time.startDate &&
//     date === time.endDate &&
//     time.allDay === true
//   ) {
//     returnValue = `Employee is booked off for all of ${time.startTime}`;
//   } else if (
//     date === time.startDate &&
//     date === time.endDate &&
//     time.allDay === false
//   ) {
//     returnValue = `Employee is booked off on ${time.startDay} from ${time.startTime} to ${time.endTime}`;
//   } else if (date >= time.startDate && date <= time.endTime) {
//     returnValue = `Employee is booked off from ${time.startDate} to ${time.endDate}`;
//   } else returnValue = null;
//   return returnValue;
// }
