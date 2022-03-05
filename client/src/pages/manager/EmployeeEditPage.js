import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeEditForm from "../../components/employee-list/EmployeeEditForm";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import AuthenticationContext from "../../components/login/AuthenticationContext";

const EmployeeEditPage = () => {
  let params = useParams();
  let employeeId = params.id;
  let navigate = useNavigate();
  const [employee, setEmployee] = useState();
  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;

  useEffect(() => {
    let isMounted = true;
    const fetchEmployee = async () => {
      let fetchResult = await fetch(
        "/api/employeeProfile/getByProfileId/" + employeeId
      );
      let fetchedEmployee = await fetchResult.json();
      console.log("Fetched Employee", fetchedEmployee);
      if (isMounted) setEmployee(fetchedEmployee);
    };
    fetchEmployee();
    return () => {
      isMounted = false;
    };
  }, [employeeId]);

  async function updateEmployee(updatedEmployee) {
    console.log(
      "Posting to employee id",
      employeeId,
      "with data",
      updatedEmployee
    );
    await fetch(`/api/employeeProfile/update?id=${employeeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEmployee),
    });
  }
  return (
    <StyledPage>
      <EmployeeEditForm existingValues={employee} onSave={updateEmployee} />
    </StyledPage>
  );
};

export default EmployeeEditPage;
