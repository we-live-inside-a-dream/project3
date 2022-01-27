import { useEffect, useState } from "react";
<<<<<<< HEAD
import EmployeeEditForm from "./EmployeeEditForm";
import { useParams } from "react-router-dom";

const EmployeeDetail = ({ employeeId }) => {
  let params = useParams();

  const [employee, setEmployee] = useState();

  useEffect(() => {
    const fetchEmployee = async () => {
      let fetchResult = await fetch(
        "/api/employeeProfile/getByProfileId/:profileId"
      );
      let fetchedEmployee = await fetchResult.json();
      console.log("Fetched Employee", fetchedEmployee);
      setEmployee(fetchedEmployee);
    };
    fetchEmployee();
  }, [params.id]);

  async function updateEmployee(updatedEmployee) {
    console.log(
      "Posting to employee id",
      employeeId,
      "with data",
      updatedEmployee
    );
    await fetch("/api/employeeProfile/update/" + employeeId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEmployee),
    });
  }
  return (
    <div>
      <h2>Employee information</h2>
      <div>
        <div>First Name</div>
        <div>{employee?.firstName}</div>
        <div>Last Name</div>
        <div>{employee?.lastName}</div>
        <div>Email</div>
        <div>{employee?.email}</div>
        <div>Password</div>
        <div>{employee?.password}</div>
        <div>Phone Number</div>
        <div>{employee?.phoneNumber}</div>
        <div>Positions</div>
        <ul>
          {employee?.positions.map((position, index) => (
            <li key={index}>{position}</li>
          ))}
        </ul>
        <div>Status</div>
        <div>{employee?.status}</div>
      </div>
      <EmployeeEditForm existingValues={employee} onSave={updateEmployee} />
    </div>
=======
import { useParams } from "react-router-dom";

import {
  StyledEmployeeForm,
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledError,
} from "./StyledEmployeeForm";

const EmployeeDetail = ({ employeeId }) => {
  let params = useParams();
  let profileId = params.id;

  const [employee, setEmployee] = useState();

  useEffect(() => {
    const fetchEmployee = async () => {
      let fetchResult = await fetch(
        "/api/employeeProfile/getByProfileId/" + profileId
      );
      let fetchedEmployee = await fetchResult.json();
      console.log("Fetched Employee", fetchedEmployee);
      setEmployee(fetchedEmployee);
    };
    fetchEmployee();
  }, [params.id]);

  // async function updateEmployee(updatedEmployee) {
  //   console.log("Posting to employee id", employeeId, "with data", updatedEmployee)
  //   await fetch('/api/employeeProfile/' +employeeId, {
  //     method: "POST",
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(updatedEmployee)
  // })
  // }
  return (
    <>
      <StyledEmployeeForm />
      <StyledFormWrapper>
        <StyledForm>
          <div>
            <h2>Employee information</h2>
            <div>
              <label>First Name</label>
              <div>{employee?.firstName}</div>
              <div>Last Name</div>
              <div>{employee?.lastName}</div>
              <div>Email</div>
              <div>{employee?.email}</div>
              <div>Password</div>
              <div>{employee?.password}</div>
              <div>Phone Number</div>
              <div>{employee?.phoneNumber}</div>
              <div>Positions</div>
              <ul>
                {employee?.positions.map((position, index) => (
                  <li key={index}>{position}</li>
                ))}
              </ul>
              <div>Status</div>
              <div>{employee?.status}</div>
            </div>
            {/* <EmployeeEditForm existingValues={employee} onSave={updateEmployee}/> */}
          </div>
        </StyledForm>
      </StyledFormWrapper>
    </>
>>>>>>> 0892e979a9c0591cee4dd8251731bf9dc7da4a50
  );
};

export default EmployeeDetail;
