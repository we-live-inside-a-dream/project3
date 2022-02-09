import { useEffect, useState } from "react";
import AvailabilityDay from "./AvailabilityDay";
import {
  StyledInput,
  StyledFormWrapper,
  StyledForm,
  StyledButton,
  // StyledTimeDate,
} from "../reusable/Inputs/StyledEmployeeForm.js";
import { Navigate, useNavigate } from "react-router-dom";

const EmployeeAvailabilityForm = ({ existingValues, create, edit, theId }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [maxHoursPerWeek, setMaxHoursPerWeek] = useState(0);
  const [days, setDays] = useState([]); // will be a use context for managers settings
  const [day, setDay] = useState("");

  const [availability, setAvailability] = useState({});

  // if (create) {
  //   setAvailability({
  //     days: [],
  //     day: "",
  //     maxHoursPerWeek: 0,
  //     firstName: "",
  //     lastName: "",
  //     employeeProfileId: "",
  //   });
  // }

  let navigate = useNavigate();

  useEffect(() => {
    const fetchAvailabilityById = async () => {
      console.log(
        "from useEffect, trying to fetch endpoint for availability by id"
      );
      let fetchResult = await fetch(process.env.REACT_APP_ELECTRON_SERVER+`/api/availability/by-employee/${theId}`);
      console.log("fetch result", fetchResult);
      let theAvailability = await fetchResult.json();
      console.log("fetching availability for ", theAvailability);

        setAvailability(theAvailability);
      };

      fetchAvailabilityById();
  }, [theId]);

  useEffect(() => {
    if (existingValues) {
      setAvailability(existingValues);
    }
  }, [existingValues]);

  useEffect(() => {
    // if (!create) {
    if (availability) {
      setEmployeeId(availability.employeeProfileId);
      setFirstName(availability.firstName);
      setLastName(availability.lastName);
      setMaxHoursPerWeek(availability.maxHoursPerWeek);
      setDays(availability.days); // will be a use context for managers settings
      setDay(availability.day);
    }
    // } else {
    //   setAvailability({
    //     days: [],
    //     day: "",
    //     maxHoursPerWeek: 0,
    //     firstName: "",
    //     lastName: "",
    //     employeeProfileId: "",
    //   });
    // }
    // }
  }, [availability, create]);

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
    navigate("/availabilities");
  }

  async function updateAvailability(updatedAvailability) {
    console.log(" 'creating' availability for", firstName, lastName);
    await fetch(process.env.REACT_APP_ELECTRON_SERVER+"/api/availability/availability/" + availability._id, {
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
              min={0}
              value={availability?.maxHoursPerWeek}
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
