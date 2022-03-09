import { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
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
  permissionsValidation,
} from "../validateForms.js";
import { useManagerSettings } from "../reusable/context/ManagerSettingsProvider";
import AuthenticationContext from "../../components/login/AuthenticationContext";

const permissionsData = [
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
  edit,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [positions, setPositions] = useState([]);
  const [status, setStatus] = useState([]);
  const [permissions, setPermissions] = useState([]);
  // const [defaultStatus, setDefaultStatus] = useState([]);
  // const [defaultPermissions, setDefaultPermissions] = useState([]);
  const [emailMessageVal, setEmailMessageVal] = useState(null);
  const [phoneMessageVal, setPhoneMessageVal] = useState(null);
  const [fnameMessageVal, setFnameMessageVal] = useState(null);
  const [lnameMessageVal, setLnameMessageVal] = useState(null);
  const [posMessageVal, setPosMessageVal] = useState(null);
  const [statusMessageVal, setStatusMessageVal] = useState(null);
  const [passMessageVal, setPassMessageVal] = useState(null);
  const [permissMessageVal, setPermissMessageVal] = useState(null);
  const [shown, setShown] = useState(false);

  const value = useManagerSettings();
  const positionsList = value.positions;
  let navigate = useNavigate();
  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;

  console.log("EXISTINGVALUES,", existingValues);
  console.log("THE PERMISSIONS FOR THIS USER ARE:", user.permissions);
  console.log("THE NAME  OF THIS USER IS ", user.firstName);

  useEffect(() => {
    if (existingValues) {
      let currentPositions = [];
      positionsList?.forEach((line) => {
        if (existingValues?.positions?.includes(line.value)) {
          currentPositions.push(line);
        }
      });
      setPositions(currentPositions);
    }
  }, [existingValues, permissions, positionsList, status]);

  useEffect(() => {
    if (existingValues) {
      let currentStatus = statusData.find((line) =>
        existingValues?.status?.includes(line.value)
      );
      setStatus(currentStatus);
    }
  }, [existingValues]);
  console.log("CURRENT STATUS %%%%%%%%%%%%%%%%", status);

  useEffect(() => {
    if (existingValues) {
      let currentPermissions = permissionsData.find((line) =>
        existingValues?.permissions?.includes(line.value)
      );
      console.log("$$$$, current permissions", currentPermissions);
      setPermissions(currentPermissions);
    }
  }, [existingValues]);
  console.log("CURRENT PERMISSIONS %%%%%%%%%%%%%%%%", permissions);

  useEffect(() => {
    if (existingValues) {
      setFirstName(existingValues.firstName);
      setLastName(existingValues.lastName);
      setEmail(existingValues.email);
      setPhoneNumber(existingValues.phoneNumber);
      setPositions(
        existingValues.positions.map((item) => {
          return { value: item };
        })
      );
    }
  }, [existingValues]);

  function onInputUpdate(event, setter) {
    let newValue = event.target.value;
    setter(newValue);
  }

  const handlePositionChange = (newPositions) => {
    console.log(newPositions);
    setPositions(newPositions);
    console.log("this is positions", newPositions);
    setPosMessageVal(positionValidation(newPositions));
    console.log("Positions", positions);
  };
  console.log("this is positions", positions);

  const handlePermissionsChange = (newPermission) => {
    setPermissions(newPermission);
    console.log("this is permissions", permissions);
    setPermissMessageVal(permissionsValidation(newPermission));
    console.log("Permissions", permissions);
  };
  console.log("this is permissions", permissions);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setStatusMessageVal(statusValidation(newStatus));
  };
  console.log("status", status);

  async function createEmployee(newEmployee) {
    let response = await fetch("/api/employeeProfile/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    });
    let id = await response.json();
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
      posMessageVal ||
      statusMessageVal ||
      permissMessageVal
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
        "position:",
        posMessageVal,
        "status:",
        statusMessageVal,
        "permissions:",
        permissMessageVal
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
        "position:",
        posMessageVal,
        "status:",
        statusMessageVal,
        "permissions:",
        permissMessageVal
      );
    validation = null;
    return validation;
  }

  async function postData() {
    let newEmployeeInfo;
    if (!existingValues) {
      newEmployeeInfo = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password: "password12",
        positions: positions.map((p) => p.value),
        status: [status.value],
        permissions: [permissions.value],
      };
    } else {
      newEmployeeInfo = {
        firstName,
        lastName,
        email,
        phoneNumber,
        positions: positions.map((p) => p.value),
        status: [status.value],
        permissions: [permissions.value],
      };
    }
    validateForm();

    //happy if existing values and validate form is all good:
    console.log("********Saving new employee information", newEmployeeInfo);
    if (!existingValues && validation === null) {
      await createEmployee(newEmployeeInfo);
      console.log("just before tab is set to 2");
      setCurrentCreateTab(12);
    } else if (existingValues && validation === null) {
      await onSave(newEmployeeInfo);
      console.log("THIS IS THE USERS PERMISSIONS", user.permissions);
      user.permissions.includes("manager") ||
      user.permissions.includes("admimnistrator")
        ? navigate("/human-resources")
        : navigate("/profile");
    } else setShown(true);
  }

  return (
    <>
      <StyledForm>
        <h2>Employee Description</h2>
        <div></div>
        <div>
          <label style={{ marginBottom: "0px" }}>
            First Name
            <RedStar />
          </label>
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
            <p style={{ color: "red", fontSize: "10px", marginBottom: "0px" }}>
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
            <p style={{ color: "red", fontSize: "10px", marginBottom: "0px" }}>
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
        {edit !== false ? (
          <>
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
                value={positions}
                options={positionsList}
                onChange={handlePositionChange}
              ></Select>
            </div>
            <div>
              <label style={{ marginBottom: "10px", display: "block" }}>
                Permissions
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
                value={permissions}
                options={permissionsData}
                onChange={handlePermissionsChange}
              ></Select>
            </div>

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
                value={status}
                options={statusData}
                onChange={handleStatusChange}
              />
            </div>
          </>
        ) : null}

        <div>
          <StyledButton
            onClick={postData}
            style={{
              position: "relative",
              top: "1em",
              left: 0,
              marginLeft: 0,
              marginTop: "20px",
            }}
          >
            SAVE DETAILS
          </StyledButton>
        </div>
        <div>
          {shown === true ? (
            <p
              style={{
                color: "red",
                fontSize: "20px",
                marginBottom: "0px",
              }}
            >
              form is invalid
            </p>
          ) : null}
        </div>
      </StyledForm>
    </>
  );
};

export default EmployeeEditForm;
