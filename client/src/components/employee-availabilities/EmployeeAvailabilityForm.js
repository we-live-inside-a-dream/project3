import { useEffect, useState } from "react";

const EmployeeAvailabilityForm = ({ existingValues, onSave }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [maxHoursPerWeek, setMaxHoursPerWeek] = useState(0);
  const [days, setDays] = useState(""); // will be a use context for managers settings
  const [day, setDay] = useState("");
  const [available, setAvailabile] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  //   useEffect(() => {
  //     if (existingValues) {
  //       setEmployeeId(existingValues.employee._id);
  //       setFirstName(existingValues.firstName);
  //       setLastName(existingValues.lastName);
  //       setMaxHoursPerWeek(existingValues.maxHoursPerWeek);
  //       setDays(existingValues.days); // will be a use context for managers settings
  //       setDay(existingValues.day);
  //       setAvailabile(existingValues.setAvailable);
  //       setAllDay(existingValues.allDay);
  //       setStart(existingValues.start);
  //       setEnd(existingValues.end);
  //     }
  //   }, [existingValues]);

  function onInputUpdate(event, setter) {
    let newValue = event.target.value;
    setter(newValue);
  }
  //   useEffect(() => {
  //     const fetchEmployeeById = async () => {
  //       console.log("from useEffect, trying to fetch endpoint");
  //       let fetchResult = await fetch(`/api/availability/availability-all`);
  //       console.log("fetch result", fetchResult);
  //       let theAvailabilityList = await fetchResult.json();
  //       console.log("fetching employee availability list", theAvailabilityList);

  //       setAvailabilityList(theAvailabilityList);
  //     };
  //     fetchAvailabilityList();
  //   }, []);
  //   console.log("AFTER USE EFFECT", availabilityList);

  async function postData() {
    let newAvailability = {
      employeeId,
      firstName,
      lastName,
      maxHoursPerWeek,
      days, // will be a use context for managers settings
      day,
      available,
      allDay,
      start,
      end,
    };
    console.log("Saving availability for: ", firstName, lastName);
    await onSave(newAvailability);
  }

  //   function onAddSuperpower() {
  //     let newSuperpowers = [...superpowers];
  //     newSuperpowers.push(powerToAdd);
  //     setPowerToAdd("");
  //     setSuperpowers(newSuperpowers);
  //   }

  //   function onRemoveSuperpower(index) {
  //     console.log("removing superpower at index", index);
  //     let newSuperpowers = [...superpowers];
  //     newSuperpowers.splice(index, 1);
  //     console.log("superpowers are now", newSuperpowers);
  //     setSuperpowers(newSuperpowers);
  //   }

  return (
    <div>
      <h2>
        {" "}
        {existingValues?.firstName && existingValues?.LastName
          ? `Recurring Availability for ${existingValues.firstName} ${existingValues.lastName}`
          : "New Employee Availability"}{" "}
      </h2>
      {/* <div>
        <label className="field-title">Name</label>
        <input
          value={superheroName}
          onChange={(event) => onInputUpdate(event, setSuperheroName)}
        />
        <label className="field-title">Alter Ego</label>
        <input
          value={alterEgo}
          onChange={(event) => onInputUpdate(event, setAlterEgo)}
        />
        <label className="field-title">Home City</label>
        <input
          value={homeCity}
          onChange={(event) => onInputUpdate(event, setHomeCity)}
        />
        <label className="field-title">Super Powers</label>
        <div className="field-value">
          {superpowers.map((power, index) => (
            <div key={index}>
              {power}
              <button
                className="btn-sm btn-danger"
                onClick={() => {
                  onRemoveSuperpower(index);
                }}
              >
                X
              </button>
            </div>
          ))}
          <div>
            <input
              value={powerToAdd}
              onChange={(event) => onInputUpdate(event, setPowerToAdd)}
            />
            <button className="btn-sm btn-primary" onClick={onAddSuperpower}>
              Add
            </button>
          </div>
        </div>
        <label className="field-title">Costume</label>
        <input
          value={costume}
          onChange={(event) => onInputUpdate(event, setCostume)}
        />
        <label className="field-title">Nemesis</label>
        <input
          value={nemesis}
          onChange={(event) => onInputUpdate(event, setNemesis)}
        />
      </div>
      <button className="btn btn-primary" onClick={postData}>
        Save Superhero
      </button> */}
    </div>
  );
};

export default EmployeeAvailabilityForm;
