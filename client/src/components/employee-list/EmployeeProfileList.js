import StyledTable from "../reusable/tables/StyledTable";
import StyledTableHeader from "../reusable/tables/StyledTableHeader";
import StyledTableRow from "../reusable/StyledTableRow";
import StyledTableData from "../reusable/tables/StyledTableData.js";
import React from "react";
import { useState, useEffect } from "react";

function EmployeeProfileList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployeesList = async () => {
      let fetchResult = await fetch(`/api/employeeProfile/employees`);
      console.log("fetch result", fetchResult);
      let employeeList = await fetchResult.json();
      console.log("fetching employee list", employeeList);
      setEmployees(employeeList);
    };
    fetchEmployeesList();
  }, []);
  console.log("AFTER USE EFFECT", employees);

  return (
    <div>
      <h1
        style={{
          fontWeight: "400",
          fontFamily: "Arial, Helvetica, sans-serif",
          textAlign: "center",
          textShadow: "1px 1px 2px grey",
          color: "#4488AB",
          marginTop: "0px",
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
          <StyledTableHeader>NAME</StyledTableHeader>
          <StyledTableHeader>EMAIL</StyledTableHeader>
          <StyledTableHeader>PHONE#</StyledTableHeader>
          <StyledTableHeader>POSITION(S)</StyledTableHeader>
          <StyledTableHeader>STATUS</StyledTableHeader>
          <StyledTableHeader>PERMISSIONS</StyledTableHeader>
        </thead>
        <tbody>
          {employees?.map((employee, index) => {
            return (
              <StyledTableRow>
                <StyledTableData>
                  <div
                    style={{
                      display: "inline-flex",
                      padding: "0px 20px",
                      alignItems: "left",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "grey",
                        height: "3rem",
                        width: "2rem",
                        marginRight: "10px",
                      }}
                    ></div>
                    <div
                      style={{
                        margin: "auto 10px auto 10px",
                        color: "#4488AB",
                        fontWeight: "600",
                      }}
                    >
                      {employee.firstName}
                      <br />
                      {employee.lastName}
                    </div>
                  </div>
                  <div style={{ height: "5px" }} />
                </StyledTableData>
                <StyledTableData>{employee.email}</StyledTableData>
                <StyledTableData>{employee.phoneNumber}</StyledTableData>
                <StyledTableData>
                  <ul style={{ listStyleType: "none" }}>
                    {employee.positions.map((position, index) => {
                      return <li key={{ index }}>{position}</li>;
                    })}
                  </ul>
                </StyledTableData>
                <StyledTableData>
                  {employee.status === true ? "active" : "inactive"}
                </StyledTableData>
                <StyledTableData>{employee.permissions}</StyledTableData>
              </StyledTableRow>
            );
          })}
        </tbody>
      </StyledTable>
    </div>
  );
}

export default EmployeeProfileList;
