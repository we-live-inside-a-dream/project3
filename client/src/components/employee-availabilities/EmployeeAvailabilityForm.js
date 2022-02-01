import { useEffect, useState } from "react";
import AvailabilityDay from "./AvailabilityDay";
import {
  StyledInput,
  StyledFormWrapper,
  StyledForm,
  StyledButton,
  // StyledTimeDate,
} from "../reusable/Inputs/StyledEmployeeForm.js";
import { Navigate } from "react-router-dom";

const EmployeeAvailabilityForm = ({
  existingValues,
  setCurrentTab,
  onSave,
  theId,
}) => {
  console.log(theId, "is the id inside the availability form!!!!!!!!!!!!");
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
  });

  console.log("ONCE INSIDE THE AVAIL FORM THE ID IS", theId);
  useEffect(() => {
    const fetchAvailabilityById = async () => {
      console.log(
        "from useEffect, trying to fetch endpoint for availability by id"
      );
      let fetchResult = await fetch(`/api/availability/by-employee/${theId}`);
      console.log("fetch result", fetchResult);
      let theAvailability = await fetchResult.json();
      console.log("fetching availability for ", theAvailability);

      setAvailability(theAvailability);
    };

    fetchAvailabilityById();
  }, [theId]);

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
    let updatedAvailability = {
      employeeId,
      firstName,
      lastName,
      maxHoursPerWeek,
      days, // will be a use context for managers settings
    };
    console.log("Saving availability for: ", firstName, lastName);
    await updateAvailability(updatedAvailability);
  }

  async function updateAvailability(updatedAvailability) {
    console.log(" 'creating' availability for", firstName, lastName);
    await fetch("/api/availability/availability/" + availability._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAvailability),
    });
    // Navigate("/employeeList");
  }

  return (
    <div>
      <StyledFormWrapper>
        <StyledForm>
          <h2>{`Edit Recurring Availability for ${availability?.firstName} ${availability?.lastName}`}</h2>
          <label style={{ textTransform: "upperCase" }}>
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

          <StyledButton className="btn btn-primary" onClick={postData}>
            SAVE AVAILABILITY DETAILS
          </StyledButton>
        </StyledForm>
      </StyledFormWrapper>
    </div>
  );
};

export default EmployeeAvailabilityForm;
