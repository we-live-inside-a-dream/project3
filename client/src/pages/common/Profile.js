import React, { useContext, useEffect, useState } from "react";
import EmployeeAvailabilityDetail from "../../components/employee-availabilities/AvailabilityDetail";
import EmployeeAvailabilityForm from "../../components/employee-availabilities/EmployeeAvailabilityForm";
import AvailabilityDetail from "../../components/employee-availabilities/AvailabilityDetail";
import EmployeeAvailabilityEditPage from "../manager/EmployeeAvailabilityEditPage";
import EmployeeEditPage from "../manager/EmployeeEditPage";
import AuthenticationContext from "../../components/login/AuthenticationContext";
import EmployeeAvailabilityList from "../../components/employee-availabilities/EmployeeAvailabilityList";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import EmployeeEditForm from "../../components/employee-list/EmployeeEditForm";

const Profile = () => {
  const authContext = useContext(AuthenticationContext);
  const user = authContext.user;
  const id = user._id;
  const [availability, setAvailability] = useState();
  const [employeeProfileView, setEmployeeProfileView] = useState(false);
  const [availabilityView, setAvailabilityView] = useState(false);
  const [employee, setEmployee] = useState();
  const [employeeEdit, setEmployeeEdit] = useState(false);
  const edit = false;

  useEffect(() => {
    if (id) {
      const fetchAvailabilityById = async () => {
        let fetchResult = await fetch(`/api/availability/by-employee/${id}`);
        let theAvailability = await fetchResult.json();
        setAvailability(theAvailability);
      };
      fetchAvailabilityById();
    }
  }, [id]);
  console.log("THE AVAILABILITY #####################", availability);

  useEffect(() => {
    let isMounted = true;
    const fetchEmployee = async () => {
      let fetchResult = await fetch(
        "/api/employeeProfile/getByProfileId/" + id
      );
      let fetchedEmployee = await fetchResult.json();
      console.log("Fetched Employee", fetchedEmployee);
      if (isMounted) setEmployee(fetchedEmployee);
    };
    fetchEmployee();
    return () => {
      isMounted = false;
    };
  }, [id]);

  async function updateEmployee(updatedEmployee) {
    console.log("Posting to employee id", id, "with data", updatedEmployee);
    await fetch(`/api/employeeProfile/update?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEmployee),
    });
  }

  return (
    <div>
      <StyledPage>
        <StyledPageTitle style={{ marginBottom: "40px" }}>
          User Profile
        </StyledPageTitle>

        <h3
          style={{ color: "var(--accentColorTitle)", cursor: "pointer" }}
          onClick={() => setEmployeeProfileView(!employeeProfileView)}
        >
          Employee Profile Settings
          {employeeProfileView === false ? "▾" : "▴"}
        </h3>
        {employeeProfileView === true && (
          <EmployeeEditForm
            style={{ justifyContent: "left" }}
            edit={edit}
            existingValues={employee}
            onSave={updateEmployee}
          />
        )}

        <h3
          style={{ color: "var(--accentColorTitle)", cursor: "pointer" }}
          onClick={() => setAvailabilityView(!availabilityView)}
        >
          Availability Settings {availabilityView === false ? "▾" : "▴"}
        </h3>
        {availabilityView === true && (
          //   <AvailabilityDetail availabilityId={availability?._id} />
          <EmployeeAvailabilityForm
            style={{ margin: "0px auto" }}
            existingValues={availability}
            theId={user._id}
          />
        )}
        {/* <h3
          style={{ color: "var(--accentColorTitle)", cursor: "pointer" }}
          onClick={() => setAvailabilityView(!availabilityView)}
        >
          Employee Permissions Settings {permissionsView === false ? "▾" : "▴"}
        </h3>
        {permissionsView === true && (
          <h3>HERE IS WHERE SOME CONTENT WILL BE!!!</h3>
        )} */}
      </StyledPage>
    </div>
  );
};

export default Profile;
