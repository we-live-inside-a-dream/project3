import React, { useEffect, useState } from "react";
import * as fns from "date-fns";

const ScheduleAvailability = ({ date, id }) => {
  const [renderAvailability, setRenderAvailability] = useState();
  const [maxHoursPerWeek, setMaxHoursPerWeek] = useState(0);
  const [availability, setAvailability] = useState({
    days: [],
    day: "",
    maxHoursPerWeek: 0,
  });

  useEffect(() => {
    function isEmployeeavailable() {
      let dayOfWeek = fns.getDay(new Date(date));
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
    isEmployeeavailable();
  }, [availability, date]);

  useEffect(() => {
    if (id) {
      const fetchAvailabilityById = async () => {
        let fetchResult = await fetch("/api/availability/by-employee/" + id);
        let theAvailability = await fetchResult.json();
        setAvailability(theAvailability);
        setMaxHoursPerWeek(theAvailability?.maxHoursPerWeek);
      };
      fetchAvailabilityById();
    }
  }, [id]);

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
      {renderAvailability}
      <br />
      maxhours:{maxHoursPerWeek}
    </div>
  );
};

export default ScheduleAvailability;
