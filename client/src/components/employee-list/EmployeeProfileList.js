import StyledTable from "../reusable/tables/StyledTable";
import StyledTableHeader from "../reusable/tables/StyledTableHeader";
import StyledTableRow from "../reusable/StyledTableRow";
import td from "../reusable/tables/StyledTableData.js";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NamePicTableData from "../reusable/NamePicTableData";

function EmployeeProfileList({ employeeProfileEdit }) {
  const [employees, setEmployees] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchEmployeesList = async () => {
      let fetchResult = await fetch(`/api/employeeProfile/employees`);
      let employeeList = await fetchResult.json();
      if (isMounted) {
        setEmployees(employeeList);
      }
    };
    fetchEmployeesList();
    return () => (isMounted = false);
  }, []);

  // selects the employee id to navigate to the page to edit that particular employee
  function selectProfileId(id) {
    navigate("/employeeDetail/edit/" + id);
  }
  //    selects employee from dropdown menu
  function selectProfile(id) {
    console.log("selectAvailability called on id", id);
    selectProfileId(id);
  }

  return (
    <div>
      <h1
        style={{
          fontWeight: "600",
          fontFamily: "Noto Sans, sans-serif",
          textAlign: "center",
          // textShadow: "1px 1px 2px grey",
          color: "var(--accentColorTitle)",
          marginTop: "0px",
          marginBottom: "10px",
          paddingBottom: "0px",
          paddingTop: "25px",
        }}
      >
        Employee Infomation
      </h1>

      <StyledTable
        style={{ paddingTop: "0px", marginTop: "0px", paddingBottom: "20px" }}
      >
        <thead>
          <tr>
            <StyledTableHeader>NAME</StyledTableHeader>
            <StyledTableHeader>EMAIL</StyledTableHeader>
            <StyledTableHeader>PHONE #</StyledTableHeader>
            <StyledTableHeader>POSITION(S)</StyledTableHeader>
            <StyledTableHeader>STATUS</StyledTableHeader>
            <StyledTableHeader>PERMISSIONS</StyledTableHeader>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee) => {
            return (
              <StyledTableRow key={employee._id}>
                <td>
                  <NamePicTableData
                    onClick={() => selectProfile(employee._id)}
                    firstName={employee.firstName}
                    lastName={employee.lastName}
                    edit="edit"
                    canEdit={employeeProfileEdit}
                  />
                </td>
                <td>{employee.email}</td>
                <td>{employee.phoneNumber}</td>
                <td>
                  <ul style={{ listStyleType: "none" }}>
                    {employee.positions.map((position, index) => {
                      return <li key={index}>{position}</li>;
                    })}
                  </ul>
                </td>
                <td>{employee.status}</td>
                <td>{employee.permissions}</td>
              </StyledTableRow>
            );
          })}
        </tbody>
      </StyledTable>
    </div>
  );
}

export default EmployeeProfileList;
