import { InputLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledButton from "../reusable/Inputs/StyledButton";
import StyledInput from "../reusable/Inputs/StyledInput";

function EditMaxHours({ existingValues }) {
  const [maxHoursPerWeek, setMaxHoursPerWeek] = useState(0);
  const [availabilityId, setAvailabilityId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [days, setDays] = useState([]);
  const [employeeProfileId, setEmployeeProfileId] = useState("");

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (existingValues) {
        setAvailabilityId(existingValues._id);
        setMaxHoursPerWeek(existingValues.maxHoursPerWeek);
        setEmployeeProfileId(existingValues.employeeProfileId);
        setFirstName(existingValues.firstName);
        setLastName(existingValues.lastName);
        setDays(existingValues.days);
      }
    }
    return () => (isMounted = false);
  }, [existingValues]);

  async function updateMaxHours(updatedAvailability) {
    console.log(
      "Updating user:",
      firstName,
      "with max hours:",
      maxHoursPerWeek
    );
    await fetch(
      "/api/availability/availability-update-maxhours/" + existingValues._id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAvailability),
      }
    );
  }
  async function postData() {
    let updatedAvailability = {
      firstName,
      lastName,
      maxHoursPerWeek,
      employeeProfileId,
      days,
    };
    console.log("posting updated maxHours for", firstName);
    await updateMaxHours(updatedAvailability);
  }

  return (
    <div>
      <h2>Update Max Hours Per Week</h2>
      <InputLabel>Max Hours</InputLabel>
      <StyledInput
        type="number"
        value={maxHoursPerWeek}
        onChange={(e) => setMaxHoursPerWeek(parseInt(e.target.value))}
      />
      <StyledButton onClick={postData}>SAVE</StyledButton>
    </div>
  );
}

export default EditMaxHours;
