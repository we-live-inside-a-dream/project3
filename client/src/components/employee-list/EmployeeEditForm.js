import { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import {
  // StyledEmployeeForm,
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
} from "../reusable/Inputs/StyledEmployeeForm.js";

const positionData = [
  { value: "manager", label: "Manager" },
  { value: "supervisor", label: "Supervisor" },
];

const statusData = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const EmployeeEditForm = ({ onSave, setId, setCurrentTab }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [positions, setPositions] = useState([]);
  const [status, setStatus] = useState("");
  const [existingValues, setExistingValues] = useState();
  // const [positionToAdd, setPositionToAdd] = useState("");
  let navigate = useNavigate();
  const params = useParams();
  const theId = params.theId;

  useEffect(() => {
    async function fetchExistingValues() {
      let fetchResult = await fetch(
        `/api/employeeProfile/getByProfileId/${theId}`
      );
      console.log(
        "fetch result for finding employee contact info",
        fetchResult
      );
      let employeeInfo = await fetchResult.json();
      console.log("fetching employee list", employeeInfo);
      setExistingValues(employeeInfo);
    }
    fetchExistingValues();
  }, [theId]);

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

  async function createEmployee(newEmployee) {
    // const newEmployee = {firstName: "", lastName: ""}
    let response = await fetch("/api/employeeProfile/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
      // body: newEmployee
    });
    let id = await response.text();
    // navigate("/createEmployee/" + newEmployee._id);
    setId(id);
    console.log("the id for the created employee is:", response);
    setCurrentTab(2);
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
    if (existingValues) {
      await onSave(newEmployeeInfo);
    } else {
      await createEmployee(newEmployeeInfo);
      navigate("/employeeList");
    }
  }

  // function onAddPosition() {
  //   positions.push(positionToAdd);
  //   setPositionToAdd("");
  //   setPositions(positions);
  // }

  return (
    <>
      {/* <StyledEmployeeForm />  */}
      <StyledFormWrapper>
        <StyledForm>
          <h2>Employee Description</h2>
          <div></div>
          <div>
            <label>First Name</label>
            <StyledInput
              value={firstName}
              onChange={(event) => onInputUpdate(event, setFirstName)}
            />
          </div>
          <div>
            <label>Last Name</label>
            <StyledInput
              value={lastName}
              onChange={(event) => onInputUpdate(event, setLastName)}
            />
          </div>
          <div>
            <label>Email</label>
            <StyledInput
              value={email}
              onChange={(event) => onInputUpdate(event, setEmail)}
            />
          </div>
          <div>
            <label>password</label>
            <StyledInput
              value={password}
              type="password"
              onChange={(event) => onInputUpdate(event, setPassword)}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <StyledInput
              value={phoneNumber}
              onChange={(event) => onInputUpdate(event, setPhoneNumber)}
            />
          </div>
          <div>
            <label style={{ marginBottom: "10px", display: "block" }}>
              Positions
            </label>
            <Select
              value={positions}
              options={positionData}
              onChange={handlePositionChange}
            />
          </div>
          <StyledButton onClick={postData}>Save Details</StyledButton>
          <div>
            <label style={{ marginBottom: "10px", display: "block" }}>
              Status
            </label>
            <Select
              value={status}
              options={statusData}
              onChange={handleStatusChange}
            />
          </div>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
};

export default EmployeeEditForm;
