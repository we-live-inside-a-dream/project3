import { InputLabel } from "@mui/material";
import React, { useState, useEffect } from "react";
import StyledButton from "../reusable/Inputs/StyledButton";

function PermissionsCheckboxes({ permissionSetter, permissionValue }) {
  const [employee, setEmployee] = useState(false);
  const [supervisor, setSupervisor] = useState(false);
  const [manager, setManager] = useState(false);
  const [administrator, setAdministrator] = useState(true);

  function setPermission() {
    let permissions = [
      employee === true ? "employee" : null,
      supervisor === true ? "supervisor" : null,
      manager === true ? "manager" : null,
      "administrator",
    ];

    let permissionArray = [...permissions];
    let filteredPermissionArray = permissionArray.filter(
      (permission) => permission !== null
    );
    permissionSetter([...filteredPermissionArray]);
  }

  function onInputChange(value, setter) {
    setter(value);
    setPermission();
  }

  return (
    <div style={{ display: "flex" }}>
      <InputLabel style={{ margin: "0px 10px" }}>
        <input
          type="checkbox"
          value={employee}
          checked={employee === true}
          onChange={(e) => {
            onInputChange(e.target.checked, setEmployee);
          }}
        ></input>
        Employee
      </InputLabel>
      <InputLabel style={{ margin: "0px 10px" }}>
        <input
          type="checkbox"
          value={supervisor}
          checked={supervisor === true}
          onChange={(e) => {
            onInputChange(e.target.checked, setSupervisor);
          }}
        ></input>
        Supervisor
      </InputLabel>
      <InputLabel style={{ margin: "0px 10px" }}>
        <input
          type="checkbox"
          value={manager}
          checked={manager === true}
          onChange={(e) => {
            onInputChange(e.target.checked, setManager);
          }}
        ></input>
        Manager
      </InputLabel>
      <InputLabel style={{ margin: "0px 10px" }}>
        <input
          type="checkbox"
          value={administrator}
          checked={administrator === true}
          onChange={(e) => {
            onInputChange(e.target.checked, setAdministrator);
          }}
        ></input>
        Administrator
      </InputLabel>
    </div>
  );
}

function PermissionsForm() {
  const [scheduleView, setScheduleView] = useState();
  const [scheduleEdit, setScheduleEdit] = useState();
  const [employeeProfileView, setEmployeeProfileView] = useState();
  const [employeeProfileEdit, setEmployeeProfileEdit] = useState();
  const [employeeAvailabilityView, setEmployeeAvailabilityView] = useState();
  const [employeeAvailabilityEdit, setEmployeeAvailabilityEdit] = useState();
  const [shiftSwapView, setShiftSwapView] = useState();
  const [shiftSwapApprove, setShiftSwapApprove] = useState();
  const [employeeTimeOffView, setEmployeeTimeOffView] = useState();
  const [employeeTimeOffApprove, setEmployeeTimeOffApprove] = useState();
  const [appSettingsView, setAppSettingsView] = useState();
  const [appSettingsEdit, setAppSettingsEdit] = useState();

  // const postData =
  //   function updatePermission
  console.log("scheduleView", scheduleView);
  console.log("scheduleEdit", scheduleEdit);
  return (
    <div>
      <h3>Schedules:</h3>
      <h5 style={{ margin: "0px 5px" }}>Can View</h5>
      <PermissionsCheckboxes
        permissionValue={scheduleView}
        permissionSetter={setScheduleView}
      />
      <h5 style={{ margin: "0px 5px" }}>Can Edit</h5>
      <PermissionsCheckboxes
        permissionValue={scheduleEdit}
        permissionSetter={setScheduleEdit}
      />
      <h3>Employee Profiles:</h3>
      <h5 style={{ margin: "0px 5px" }}>Can View</h5>
      <PermissionsCheckboxes
        permissionValue={employeeProfileView}
        permissionSetter={setEmployeeProfileView}
      />
      <h5 style={{ margin: "0px 5px" }}>Can Edit</h5>
      <PermissionsCheckboxes
        permissionValue={employeeProfileEdit}
        permissionSetter={setEmployeeProfileEdit}
      />
      <h3>Employee Availability:</h3>
      <h5 style={{ margin: "0px 5px" }}>Can View</h5>
      <PermissionsCheckboxes
        permissionValue={employeeAvailabilityView}
        permissionSetter={setEmployeeAvailabilityView}
      />
      <h5 style={{ margin: "0px 5px" }}>Can Edit</h5>
      <PermissionsCheckboxes
        permissionValue={employeeAvailabilityEdit}
        permissionSetter={setEmployeeAvailabilityEdit}
      />
      <h3>Employee Shift Swaps:</h3>
      <h5 style={{ margin: "0px 5px" }}>Can View</h5>
      <PermissionsCheckboxes
        permissionValue={shiftSwapView}
        permissionSetter={setShiftSwapView}
      />
      <h5 style={{ margin: "0px 5px" }}>Can Approve</h5>
      <PermissionsCheckboxes
        permissionValue={shiftSwapApprove}
        permissionSetter={setShiftSwapApprove}
      />
      <h3>Employee Time Off:</h3>
      <h5 style={{ margin: "0px 5px" }}>Can View</h5>
      <PermissionsCheckboxes
        permissionValue={employeeTimeOffView}
        permissionSetter={setEmployeeTimeOffView}
      />
      <h5 style={{ margin: "0px 5px" }}>Can Approve</h5>
      <PermissionsCheckboxes
        permissionValue={employeeTimeOffApprove}
        permissionSetter={setEmployeeTimeOffApprove}
      />
      <h3>Settings for App:</h3>
      <h5 style={{ margin: "0px 5px" }}>Can View</h5>
      <PermissionsCheckboxes
        permissionValue={appSettingsView}
        permissionSetter={setAppSettingsView}
      />
      <h5 style={{ margin: "0px 5px" }}>Can Edit</h5>
      <PermissionsCheckboxes
        permissionValue={appSettingsEdit}
        permissionSetter={setAppSettingsEdit}
      />

      <StyledButton
      //    onClick={postData}
      >
        SUBMIT
      </StyledButton>
    </div>
  );
}

export default PermissionsForm;
