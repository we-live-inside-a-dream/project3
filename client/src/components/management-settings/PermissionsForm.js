import React, { useState, useEffect } from "react";
import PermissionsCheckboxes from "./permissionsCheckboxes";
import StyledButton from "../reusable/Inputs/StyledButton";
import { StyledForm2 } from "../reusable/Inputs/StyledEmployeeForm";

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
  const [permissionsId, setPermissionsId] = useState();
  const [appSettingsView, setAppSettingsView] = useState();
  const [appSettingsEdit, setAppSettingsEdit] = useState();

  const [permissionsList, setPermissionsList] = useState();
  const [existingValues, setExistingValues] = useState();

  useEffect(() => {
    async function getPermissionsList() {
      let fetchedResult = await fetch("/api/permissions/get-all");
      let fetchedPermissions = await fetchedResult.json();
      setExistingValues(fetchedPermissions);
    }
    getPermissionsList();
  }, []);
  // console.log("EXISTINGVALUES!!!!!!!!!!", existingValues);

  useEffect(() => {
    if (existingValues) {
      setPermissionsId(existingValues._id);
      setScheduleView(existingValues.scheduleView);
      setScheduleEdit(existingValues.scheduleEdit);
      setEmployeeProfileView(existingValues.employeeProfileView);
      setEmployeeProfileEdit(existingValues.employeeProfileEdit);
      setEmployeeAvailabilityView(existingValues.employeeAvailabilityView);
      setEmployeeAvailabilityEdit(existingValues.employeeAvailabilityEdit);
      setShiftSwapView(existingValues.shiftSwapView);
      setShiftSwapApprove(existingValues.shiftSwapApprove);
      setEmployeeTimeOffView(existingValues.employeeTimeOffView);
      setEmployeeTimeOffApprove(existingValues.employeeTimeOffApprove);
      setAppSettingsView(existingValues.appSettingsView);
      setAppSettingsEdit(existingValues.appSettingsEdit);
    }
  }, [existingValues]);

  async function createPermissions(newPermissions) {
    await fetch("/api/permissions/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPermissions),
    });
    setPermissionsList(newPermissions);
  }

  async function upDatePermissions(newPermissions) {
    await fetch(`/api/permissions/update?id=${permissionsId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPermissions),
    });
  }

  const postData = async function () {
    let newPermissions = {
      scheduleView,
      scheduleEdit,
      employeeProfileView,
      employeeProfileEdit,
      employeeAvailabilityView,
      employeeAvailabilityEdit,
      shiftSwapView,
      shiftSwapApprove,
      employeeTimeOffView,
      employeeTimeOffApprove,
      appSettingsView,
      appSettingsEdit,
    };
    console.log("TRYING TO POST DATA", newPermissions);
    if (permissionsList === null) {
      await createPermissions(newPermissions);
    } else await upDatePermissions(newPermissions);
  };

  return (
    <div>
      <StyledForm2>
        <h3>Schedules:</h3>
        <h5 style={{ margin: "0px 5px" }}>Can View</h5>
        <PermissionsCheckboxes
          permissionValue={scheduleView}
          permissionSetter={setScheduleView}
          // permissionSetter={(sv) => {
          //   console.log("THIS IS SV", sv);
          //   setScheduleView(sv);
          // }}
          postData={postData}
        />
        <h5 style={{ margin: "0px 5px" }}>Can Edit</h5>
        <PermissionsCheckboxes
          permissionValue={scheduleEdit}
          permissionSetter={setScheduleEdit}
          postData={postData}
        />
        <h3>Employee Profiles:</h3>
        <h5 style={{ margin: "0px 5px" }}>Can View</h5>
        <PermissionsCheckboxes
          permissionValue={employeeProfileView}
          permissionSetter={setEmployeeProfileView}
          postData={postData}
        />
        <h5 style={{ margin: "0px 5px" }}>Can Edit</h5>
        <PermissionsCheckboxes
          permissionValue={employeeProfileEdit}
          permissionSetter={setEmployeeProfileEdit}
          postData={postData}
        />
        <h3>Employee Availability:</h3>
        <h5 style={{ margin: "0px 5px" }}>Can View</h5>
        <PermissionsCheckboxes
          permissionValue={employeeAvailabilityView}
          permissionSetter={setEmployeeAvailabilityView}
          postData={postData}
        />
        <h5 style={{ margin: "0px 5px" }}>Can Edit</h5>
        <PermissionsCheckboxes
          permissionValue={employeeAvailabilityEdit}
          permissionSetter={setEmployeeAvailabilityEdit}
          postData={postData}
        />
        <h3>Employee Shift Swaps:</h3>
        <h5 style={{ margin: "0px 5px" }}>Can View</h5>
        <PermissionsCheckboxes
          permissionValue={shiftSwapView}
          permissionSetter={setShiftSwapView}
          postData={postData}
        />
        <h5 style={{ margin: "0px 5px" }}>Can Approve</h5>
        <PermissionsCheckboxes
          permissionValue={shiftSwapApprove}
          permissionSetter={setShiftSwapApprove}
          postData={postData}
        />
        <h3>Employee Time Off:</h3>
        <h5 style={{ margin: "0px 5px" }}>Can View</h5>
        <PermissionsCheckboxes
          permissionValue={employeeTimeOffView}
          permissionSetter={setEmployeeTimeOffView}
          postData={postData}
        />
        <h5 style={{ margin: "0px 5px" }}>Can Approve</h5>
        <PermissionsCheckboxes
          permissionValue={employeeTimeOffApprove}
          permissionSetter={setEmployeeTimeOffApprove}
          postData={postData}
        />
        <h3>Settings for App:</h3>
        <h5 style={{ margin: "0px 5px" }}>Can View</h5>
        <PermissionsCheckboxes
          permissionValue={appSettingsView}
          permissionSetter={setAppSettingsView}
          postData={postData}
        />
        <h5 style={{ margin: "0px 5px" }}>Can Edit</h5>
        <PermissionsCheckboxes
          permissionValue={appSettingsEdit}
          permissionSetter={setAppSettingsEdit}
          postData={postData}
        />

        <StyledButton style={{ marginTop: "25px" }} onClick={postData}>
          SUBMIT PERMISSIONS
        </StyledButton>
      </StyledForm2>
    </div>
  );
}

export default PermissionsForm;
