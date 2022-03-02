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
  // const [password, setPassword] = useState();
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

  console.log("EXISTINGVALUES,", existingValues);

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
      let currentStatus = [];
      statusData.forEach((line) => {
        if (existingValues?.status?.includes(line.value)) {
          currentStatus.push(line);
        }
      });
      setStatus(currentStatus);
    }
  }, [existingValues]);
  console.log("CURRENT STATUS %%%%%%%%%%%%%%%%", status);

  useEffect(() => {
    if (existingValues) {
      let currentPermissions = [];
      permissionsData.forEach((line) => {
        if (existingValues?.permissions?.includes(line.value)) {
          currentPermissions.push(line);
        }
      });
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
      // setStatus({ value: existingValues.status[0] });
      // setPermissions({ value: existingValues.permissions[0] });

      // setStatus(
      //   existingValues.status.map((item) => {
      //     return { value: item };
      //   })
      // );
      // setPermissions(
      //   existingValues.permissions.map((item) => {
      //     return { value: item };
      //   })
      // );
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
    let newEmployeeInfo = {
      firstName,
      lastName,
      email,
      phoneNumber,
      positions: positions.map((p) => p.value),
      status: [status.value],
      permissions: [permissions.value],
    };
    validateForm();
    // console.log("validate form", validation);
    console.log("Saving new employee information", newEmployeeInfo);

    //happy if existing values and validate form is all good:
    if (existingValues === null && validation === null) {
      await createEmployee(newEmployeeInfo);
      console.log("just before tab is set to 2");
      setCurrentCreateTab(12);
    } else setShown(true);

    if (existingValues) {
      await onSave(newEmployeeInfo);
      navigate("/human-resources");
    }
  }

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
          {/* {password && (
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
          )} */}
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
                  // value={[{ value: "dog", label: "Dog" }]}
                  options={positionsList}
                  onChange={handlePositionChange}
                  // required="true"
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
                  // required="true"
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
                  // required="true"
                />
              </div>
            </>
          ) : null}

          <div>
            <StyledButton onClick={postData} style={{ marginLeft: "0px" }}>
              Save Details
            </StyledButton>
          </div>
          <div>
            {/* {shown === true ? (
              <p
                style={{
                  color: "red",
                  fontSize: "20px",
                  marginBottom: "0px",
                }}
              >
                form is invalid
              </p>
            ) : null} */}
          </div>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
};

export default EmployeeEditForm;
