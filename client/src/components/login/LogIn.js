import { useEffect, useState } from "react";
import {
  StyledEmployeeForm,
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  sharedStyles,
  StyledTextArea,
  StyledButton,
  StyledFieldset,
  StyledError,
} from "../reusable/StyledEmployeeForm";

const EmployeeEditForm = ({ existingValues, onSave }) => {
  const [firstName, setFirstName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState([]);

  const [positionToAdd, setPositionToAdd] = useState("");

  useEffect(() => {
    if (existingValues) {
      setEmail(existingValues.email);
      setPassword(existingValues.password);
    }
  }, [existingValues]);

  function onInputUpdate(event, setter) {
    let newValue = event.target.value;
    setter(newValue);
  }

  async function createEmployee({ newEmployee }) {
    await fetch("/api/employeeProfile/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    });
  }

  async function postData() {
    let newEmployeeInfo = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      positions,
      status,
    };
    console.log("Saving new employee information", newEmployeeInfo);
    await createEmployee(newEmployeeInfo);
  }

  function onAddPosition() {
    positions.push(positionToAdd);
    setPositionToAdd("");
    setPositions(positions);
  }

  return (
    <>
      <StyledEmployeeForm />
      <StyledFormWrapper>
        <StyledForm>
          <h2>Employee Description</h2>

          <div>
            <label>First Name</label>
            <StyledInput
              value={firstName}
              onChange={(event) => onInputUpdate(event, setFirstName)}
            />
            <label>Last Name</label>
            <StyledInput
              value={lastName}
              onChange={(event) => onInputUpdate(event, setLastName)}
            />
            <label>Email</label>
            <StyledInput
              value={email}
              onChange={(event) => onInputUpdate(event, setEmail)}
            />
            <label>password</label>
            <StyledInput
              value={password}
              type="password"
              onChange={(event) => onInputUpdate(event, setPassword)}
            />
            <label>Phone Number</label>
            <StyledInput
              value={phoneNumber}
              onChange={(event) => onInputUpdate(event, setPhoneNumber)}
            />
            <label>Positions</label>
            <div>
              {positions.map((position, index) => (
                <div key={index}>{position}</div>
              ))}
              <div>
                <StyledInput
                  value={positionToAdd}
                  onChange={(event) => onInputUpdate(event, setPositionToAdd)}
                />
                <StyledButton onClick={onAddPosition}>Add</StyledButton>
              </div>
              {/* <StyledInput
                  value={positions}
                  onChange={(event) => onInputUpdate(event, setPositions)}
                /> */}
              <label>Status</label>
              <StyledInput
                value={status}
                onChange={(event) => onInputUpdate(event, setStatus)}
              />

              <StyledButton onClick={postData}>Save Details</StyledButton>
            </div>
          </div>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
};
