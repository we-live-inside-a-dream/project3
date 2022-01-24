import React, { useEffect, useState } from "react";

function EditMaxHours({ existingValues }) {
  const [maxHoursPerWeek, setMaxHoursPerWeek] = useState(0);
  const [availabilityId, setAvailabilityId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [days, setDays] = useState([]);
  const [employeeProfileId, setEmployeeProfileId] = useState("");

  useEffect(() => {
    if (existingValues) {
      setAvailabilityId(existingValues._id);
      setMaxHoursPerWeek(existingValues.maxHoursPerWeek);
      setEmployeeProfileId(existingValues.employeeProfileId);
      setFirstName(existingValues.firstName);
      setLastName(existingValues.lastName);
      setDays(existingValues.days);
    }
  }, [existingValues]);

  async function updateMaxHours(updatedAvailability) {
    console.log(
      "Updating user:",
      firstName,
      "with max hours:",
      maxHoursPerWeek
    );
    await fetch(
      `/api/availability/availability-edit-maxhours?id=${availabilityId}`,
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
    
    
    }
  }

  return <div></div>;
}

export default EditMaxHours;
