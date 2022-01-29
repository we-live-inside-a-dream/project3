import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AvailabilityDay from "./AvailabilityDay";
import {
  StyledInput,
  // StyledTimeDate,
} from "../reusable/Inputs/StyledEmployeeForm.js";
// import { InputLabel } from "@mui/material";
// import {
//   StyledButton,
//   StyledCheck,
//   StyledLabel,
// } from "../employee-list/StyledEmployeeForm";

const EmployeeAvailabilityForm = ({ existingValues, onSave, id }) => {
  let params = useParams();
  const [employeeId, setEmployeeId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [maxHoursPerWeek, setMaxHoursPerWeek] = useState(0);
  const [days, setDays] = useState([]); // will be a use context for managers settings
  const [day, setDay] = useState("");

  const [availability, setAvailability] = useState({
    days: [],
    day: "",
    maxHoursPerWeek: 0,
    firstName: "",
    lastName: "",
    employeeProfileId: "",
    // available: false,
    // allDay: false,
    // start: 0,
    // end: 0,
  });

  useEffect(() => {
    const fetchAvailabilityById = async () => {
      console.log(
        "from useEffect, trying to fetch endpoint for availability by id"
      );
      let fetchResult = await fetch("/api/availability/by-employee/" + id);
      console.log("fetch result", fetchResult);
      let theAvailability = await fetchResult.json();
      console.log("fetching availability for ", theAvailability);

      setAvailability(theAvailability);
    };
    fetchAvailabilityById();
  }, [id]);
  console.log("%%%%%%%%%THIS IS THE AVAILABILITY", availability);

  useEffect(() => {
    if (availability) {
      setEmployeeId(availability._id);
      setFirstName(availability.firstName);
      setLastName(availability.lastName);
      setMaxHoursPerWeek(availability.maxHoursPerWeek);
      setDays(availability.days); // will be a use context for managers settings
      setDay(availability.day);
    }
  }, [availability]);

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
      <label>
        Max weekly hours
        <StyledInput
          type="number"
          value={availability.maxHoursPerWeek}
          onChange={(e) =>
            setAvailability({
              ...availability,
              maxHoursPerWeek: e.target.value,
            })
          }
        />
      </label>
      {availability?.days?.map((day, index) => {
        return (
          <AvailabilityDay
            index={index}
            day={day}
            setAvailability={setAvailability}
            availability={availability}
          />
        );
      })}

      <button className="btn btn-primary" onClick={postData}>
        Save
      </button>
    </div>
  );
};

export default EmployeeAvailabilityForm;
