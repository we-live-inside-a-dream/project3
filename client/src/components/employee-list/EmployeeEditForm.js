import { useEffect, useState } from "react";
import Select from "react-select";
// import { useNavigate } from "react-router-dom";
import {
  // StyledEmployeeForm,
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
  RedStar,
} from "../reusable/Inputs/StyledEmployeeForm.js";
import {
  emailValidation,
  phoneNumberValidation,
  firstNameValidation,
  lastNameValidation,
  statusValidation,
  positionValidation,
  passwordValidation,
} from "../validateForms.js";

const positionData = [
  { value: "manager", label: "Manager" },
  { value: "supervisor", label: "Supervisor" },
  { value: "employee", label: "Employee" },
  { value: "admin", label: "Administrator" },
];

const statusData = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const EmployeeEditForm = ({
  onSave,
  setId,
  setCurrentCreateTab,
  existingValues,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [positions, setPositions] = useState([]);
  const [status, setStatus] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState(null);
  const [emailMessageVal, setEmailMessageVal] = useState(null);
  const [phoneMessageVal, setPhoneMessageVal] = useState(null);
  const [fnameMessageVal, setFnameMessageVal] = useState(null);
  const [lnameMessageVal, setLnameMessageVal] = useState(null);
  const [posMessageVal, setPosMessageVal] = useState(null);
  const [statusMessageVal, setStatusMessageVal] = useState(null);
  const [passMessageVal, setPassMessageVal] = useState(null);
  const [shown, setShown] = useState(false);
  // const [permissions, setPermissions] = useState("");

  // const [message, setMessage] = useState("");

  // const [positionToAdd, setPositionToAdd] = useState("");
  // let navigate = useNavigate();

  useEffect(() => {
    const typeFilter = statusData?.filter((r) => r.value === status);
    setDefaultStatus(typeFilter);
    console.log("this is status", status);
  }, [status]);

  // useEffect(() => {
  //   if (positionsData) {
  //     empNames.map((person) => {
  //       return contactsData.push({
  //         value: `${person._id}`,
  //         label: `${person.firstName} ${person.lastName[0]}`,
  //       });
  //     });
  //   }
  // }, [empNames]);

  useEffect(() => {
    if (existingValues) {
      setFirstName(existingValues.firstName);
      setLastName(existingValues.lastName);
      setEmail(existingValues.email);
      setPhoneNumber(existingValues.phoneNumber);
      setPositions(existingValues.positions);
      setStatus(existingValues.status);
    }
  }, [existingValues]);

  function onInputUpdate(event, setter) {
    let newValue = event.target.value;
    setter(newValue);
  }

  const handlePositionChange = (newPositions) => {
    // let array = []
    // newPositions.map((x) => array.push(x.value));
    // console.log("THIS IS OUR ARRAY", array);
    // console.log("new positions", newPositions)
    setPositions(newPositions);
    // setPermissions("")
    console.log("this is positions", positions);
    setPosMessageVal(positionValidation(newPositions));
    console.log("Positions", newPositions);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setStatusMessageVal(statusValidation(newStatus));
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
    let id = await response.json();
    // navigate("/createEmployee/" + newEmployee._id);
    console.log("just before the id is set to ", id);
    setId(id);
    console.log("the id for the created employee is:", response);
    // setCurrentTab(2);
  }
  let validation;
  async function validateForm() {
    if (
      emailMessageVal ||
      phoneMessageVal ||
      fnameMessageVal ||
      lnameMessageVal ||
      passMessageVal ||
      posMessageVal ||
      statusMessageVal
    ) {
      console.log(
        "email:",
        emailMessageVal,
        "phone:",
        phoneMessageVal,
        "first:",
        fnameMessageVal,
        "last:",
        lnameMessageVal,
        "password:",
        passMessageVal,
        "position:",
        posMessageVal,
        "status:",
        statusMessageVal
      );
      validation = "please make sure that all fields are valid";
      return validation;
    } else
      console.log(
        "email:",
        emailMessageVal,
        "phone:",
        phoneMessageVal,
        "first:",
        fnameMessageVal,
        "last:",
        lnameMessageVal,
        "password:",
        passMessageVal,
        "position:",
        posMessageVal,
        "status:",
        statusMessageVal
      );
    validation = null;
    return validation;
  }

  async function postData() {
    let newEmployeeInfo = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      positions: positions.map((p) => p.value),
      status: status.value,
      permissions: "",
    };
    validateForm();
    console.log("validate form", validation);
    console.log("Saving new employee information", newEmployeeInfo);

    //happy if existing values and validate form is all good:
    if (!existingValues && validation === null) {
      await createEmployee(newEmployeeInfo);
      console.log("just before tab is set to 2");
      setCurrentCreateTab(12);
    } else setShown(true);

    if (existingValues) {
      await onSave(newEmployeeInfo);
    }
    // return "this form needs serious help";
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
            <label style={{ marginBottom: "0px" }}>
              First Name
              <RedStar />
            </label>{" "}
            {firstName === "" ? (
              <p
                style={{ color: "red", fontSize: "10px", marginBottom: "0px" }}
              ></p>
            ) : null}
            <StyledInput
              value={firstName}
              onChange={(event) => {
                onInputUpdate(event, setFirstName);
                setFnameMessageVal(firstNameValidation(firstName));
              }}
              required
            />
          </div>
          <div>
            <label>
              Last Name
              <RedStar />
            </label>
            {lastName === "" ? (
              <p
                style={{ color: "red", fontSize: "10px", marginBottom: "0px" }}
              ></p>
            ) : null}
            <StyledInput
              value={lastName}
              onChange={(event) => {
                onInputUpdate(event, setLastName);
                setLnameMessageVal(lastNameValidation(lastName));
              }}
            />
          </div>
          <div>
            <label>
              Email
              <RedStar />
            </label>
            {!emailMessageVal ? (
              <p
                style={{ color: "red", fontSize: "10px", marginBottom: "0px" }}
              ></p>
            ) : null}
            {emailMessageVal ? (
              <p
                style={{ color: "red", fontSize: "10px", marginBottom: "0px" }}
              >
                {emailMessageVal}
              </p>
            ) : null}
            <StyledInput
              type="email"
              value={email}
              onChange={(event) => {
                onInputUpdate(event, setEmail);
                setEmailMessageVal(emailValidation(email));
              }}
            />
          </div>
          {password && (
            <div>
              <label>
                password
                <RedStar />
              </label>

              {!passMessageVal ? (
                <p
                  style={{
                    color: "red",
                    fontSize: "10px",
                    marginBottom: "0px",
                  }}
                ></p>
              ) : null}
              {passMessageVal ? (
                <p
                  style={{
                    color: "red",
                    fontSize: "10px",
                    marginBottom: "0px",
                  }}
                >
                  {passMessageVal}
                </p>
              ) : null}

              <StyledInput
                value={password}
                type="password"
                onChange={(event) => {
                  onInputUpdate(event, setPassword);
                  setPassMessageVal(passwordValidation(password));
                }}
              />
            </div>
          )}
          <div>
            <label>
              Phone Number
              <RedStar />
            </label>
            {!phoneMessageVal ? (
              <p
                style={{ color: "red", fontSize: "10px", marginBottom: "0px" }}
              ></p>
            ) : null}
            {phoneMessageVal ? (
              <p
                style={{ color: "red", fontSize: "10px", marginBottom: "0px" }}
              >
                {phoneMessageVal}
              </p>
            ) : null}
            <StyledInput
              value={phoneNumber}
              onChange={(event) => {
                onInputUpdate(event, setPhoneNumber);
                setPhoneMessageVal(phoneNumberValidation(phoneNumber));
              }}
            />
          </div>
          <div>
            <label style={{ marginBottom: "10px", display: "block" }}>
              Positions
              <RedStar />
            </label>{" "}
            {!positions ? (
              <p
                style={{
                  color: "red",
                  fontSize: "10px",
                  marginBottom: "0px",
                }}
              ></p>
            ) : null}
            <Select
              isMulti
              name="employee position"
              defaultValue={positions}
              options={positionData}
              onChange={handlePositionChange}
              className="basic-multi-select"
              classNamePrefix="select"
            ></Select>
            {/* <Select
              value={positions}
              options={positionData}
              onChange={handlePositionChange}
              required="true"
            /> */}
          </div>
          <StyledButton onClick={postData}>Save Details</StyledButton>
          

          <div>
            <label style={{ marginBottom: "10px", display: "block" }}>
              Status
              <RedStar />
            </label>
            
            {!status ? (
              <p
                style={{
                  color: "red",
                  fontSize: "10px",
                  marginBottom: "0px",
                }}
              ></p>
            ) : null}
            <Select
              defaultValue={defaultStatus}
              options={statusData}
              onChange={handleStatusChange}
              required="true"
            />
          </div>
          <div>
          {shown === true ? <p style={{
                  color: "red",
                  fontSize: "20px",
                  marginBottom: "0px",
                }}>form is invalid</p> : null}
          </div>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
};

export default EmployeeEditForm;
