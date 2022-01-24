import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StyledInput } from "../employee-list/StyledEmployeeForm";
import { InputLabel } from "@mui/material";
import { StyledButton } from "../employee-list/StyledEmployeeForm";

const EmployeeAvailabilityForm = ({ existingValues, onSave }) => {
  let params = useParams();
  const [employeeId, setEmployeeId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [maxHoursPerWeek, setMaxHoursPerWeek] = useState(0);
  const [days, setDays] = useState([]); // will be a use context for managers settings
  const [day, setDay] = useState("");
  const [available, setAvailable] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [availability, setAvailability] = useState({
    days: [],
    day: "",
    available: false,
    allDay: false,
    start: 0,
    end: 0,
  });

  useEffect(() => {
    const fetchAvailabilityById = async (id) => {
      console.log(
        "from useEffect, trying to fetch endpoint for availability by id"
      );
      let fetchResult = await fetch(
        "/api/availability/availability/" + params.id
      );
      console.log("fetch result", fetchResult);
      let theAvailability = await fetchResult.json();
      console.log("fetching availability for ", theAvailability);

      setAvailability(theAvailability);
    };
    fetchAvailabilityById();
  }, [params.id]);

  useEffect(() => {
    if (availability) {
      setEmployeeId(availability._id);
      setFirstName(availability.firstName);
      setLastName(availability.lastName);
      setMaxHoursPerWeek(availability.maxHoursPerWeek);
      setDays(availability.days); // will be a use context for managers settings
      setDay(availability.day);
      setAvailable(availability.setAvailable);
      setAllDay(availability.allDay);
      setStart(availability.start);
      setEnd(availability.end);
    }
  }, []);

  async function postData() {
    let newAvailability = {
      employeeId,
      firstName,
      lastName,
      maxHoursPerWeek,
      days, // will be a use context for managers settings
    };
    console.log("Saving availability for: ", firstName, lastName);
    await onSave(newAvailability);
  }

  let businessDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  function onAddDay() {
    let day = {};
    let newDay = [...days];
    newDay.push(day);
    setDays(newDay);
    console.log("these are the days", days);
  }
  return (
    <div>
      <h2>{`Edit Recurring Availability for ${availability.firstName} ${availability.lastName}`}</h2>
      <InputLabel>
        Max weekly hours
        <input type="text" value={availability.maxHoursPerWeek}></input>
      </InputLabel>
      {availability?.days?.map((day, index) => {
        return (
          <div key={index}>
            <p>{businessDays[index]}</p>

            <label className="check-label">
              <input
                className="check"
                name="available"
                type="checkbox"
                value={day.available}
                checked={day.available === true}
                onChange={(e) => setAvailable(e.target.value)}
              />
              Available
            </label>
            {day.available === true ? (
              <label className="check-label">
                <input
                  className="check"
                  name="all-day"
                  type="checkbox"
                  value={day.allDay}
                  checked={day.allDay === true}
                  onChange={(e) => setAllDay(e.target.checked)}
                />
                Available all day
              </label>
            ) : null}
            {day.allDay === false ? (
              <div>
                <label>Start time</label>
                <input
                  name="all-day"
                  type="number"
                  value={day.start}
                  onChange={(e) => setStart(e.target.value)}
                />

                <label>End time</label>
                <input
                  className="check"
                  name="all-day"
                  type="number"
                  value={day.end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            ) : null}
            <StyledButton fontSize={"1.5em"} padding={"0"} onClick={onAddDay}>
              +
            </StyledButton>
          </div>
        );
      })}

      <button className="btn btn-primary" onClick={postData}>
        Save
      </button>
    </div>
  );
};

export default EmployeeAvailabilityForm;
