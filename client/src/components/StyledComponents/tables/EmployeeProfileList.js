import StyledTable from "./StyledTable";
import StyledTableHeader from "./StyledTableHeader";
import StyledTableRow from "./StyledTableRow";
import StyledTableData from "./StyledTableData.js";
import React from "react";

let employees = [
  {
    name: "Julie Weir",
    email: "address@gmail.com",
    phone: "xxx-xxx-xxxx",
    positions: ["cashier", "sales"],
    active: true,
    permissions: "manager",
  },
  {
    name: "Derek Birtwistle",
    email: "address@gmail.com",
    phone: "xxx-xxx-xxxx",
    positions: ["cashier", "supervisor"],
    active: true,
    permissions: "admin",
  },
  {
    name: "Reza Naeim",
    email: "address@gmail.com",
    phone: "xxx-xxx-xxxx",
    positions: ["cashier", "driver"],
    active: true,
    permissions: "user",
  },
  {
    name: "Brian Sauco",
    email: "address@gmail.com",
    phone: "xxx-xxx-xxxx",
    positions: ["cashier"],
    active: true,
    permissions: "user",
  },
];

function EmployeeProfileList() {
  return (
    <div>
      <StyledTable>
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
                  <div style={{ display: "inline-flex" }}>
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
                      {" "}
                      {employee.name}
                    </div>
                  </div>
                  <div style={{ height: "5px" }} />
                </StyledTableData>
                <StyledTableData>{employee.email}</StyledTableData>
                <StyledTableData>{employee.phone}</StyledTableData>
                <StyledTableData>{employee.positions}</StyledTableData>
                <StyledTableData>
                  {employee.active === true ? "active" : "inactive"}
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
