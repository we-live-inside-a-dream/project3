import { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
  StyledEmployeeForm,
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledError,
} from "./StyledEmployeeForm";

const positionData = [
  { value: "manager", label: "Manager" },
  { value: "supervisor", label: "Supervisor" },
];

const statusData = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const EmployeeEditForm = ({ existingValues, onSave }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [positions, setPositions] = useState([]);
  const [status, setStatus] = useState("");

  const [focused, setFocused] = useState(false);
  // const [positionToAdd, setPositionToAdd] = useState("");

  useEffect(() => {
    if (existingValues) {
      setFirstName(existingValues.firstName);
      setLastName(existingValues.lastName);
      setEmail(existingValues.email);
      setPassword(existingValues.password);
      setPhoneNumber(existingValues.phoneNumber);
      setPositions(existingValues.positions);
      setStatus(existingValues.status);
    }
  }, [existingValues]);

  function onInputUpdate(event, setter) {
    let newValue = event.target.value;
    setter(newValue);
  }

  const handlePositionChange = (newPosition) => {
    setPositions(newPosition);
    console.log("Positions", newPosition);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    console.log("status", newStatus);
  };

  let navigate = useNavigate();

  async function createEmployee(newEmployee) {
    // const newEmployee = {firstName: "", lastName: ""}
    await fetch("/api/employeeProfile/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
      // body: newEmployee
    });
    navigate("/employeeList");
  }

  async function postData() {
    let newEmployeeInfo = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      positions: [positions.value],
      status: status.value,
    };
    console.log("Saving new employee information", newEmployeeInfo);
    await createEmployee(newEmployeeInfo);
  }

  // function onAddPosition() {
  //   positions.push(positionToAdd);
  //   setPositionToAdd("");
  //   setPositions(positions);
  // }

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
            {/* shit show starts from here... */}
            <label>Positions</label>
            <Select
              value={positions}
              options={positionData}
              onChange={handlePositionChange}
            />
            <br />

            <label>Status</label>
            <Select
              value={status}
              options={statusData}
              onChange={handleStatusChange}
            />
            <br />
            <StyledButton onClick={postData}>Save Details</StyledButton>
          </div>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
};

export default EmployeeEditForm;
