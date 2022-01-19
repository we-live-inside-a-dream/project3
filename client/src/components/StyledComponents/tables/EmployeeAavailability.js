import StyledTable from "./StyledTable";
import React from "react";
import { useState, useEffect } from "react";
import EmployeesList from "../../pages/EmployeesList";

function EmployeeAvailabilityList() {
  const [availabilityList, setAvailabilityList] = useState([]);

  useEffect(() => {
    const fetchAvailabilityList = async () => {
      let fetchResult = await fetch(`/api/availability-all`);
      console.log("fetch result", fetchResult);
      let theAvailabilityList = await fetchResult.json();
      console.log("fetching employee availability list", theAvailabilityList);

      setAvailabilityList(theAvailabilityList);
    };
    fetchAvailabilityList();
  }, [availabilityList]);
  console.log("AFTER USE EFFECT", availabilityList);
  let businessDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
        Employee Availability List
      </h1>
      ;
      <StyledTable
        style={{ paddingTop: "0px", marginTop: "0px", paddingBottom: "20px" }}
      >
        <thead>
          <th>NAME</th>
          <th>Max Weekly Hours</th>
          {businessDays.map((day, index) => {
            return <th key={index}>{day}</th>;
          })}

          <th>PERMISSIONS</th>
        </thead>
        <tbody>
          {availabilityList?.map((employee, index) => {
            return (
              <tr>
                <td>
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
                </td>
                <td>{employee.maxHoursPerWeek}</td>
                {EmployeesList.map(())}

                <td>{employee.status === true ? "active" : "inactive"}</td>
                <td>{employee.permissions}</td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </div>
  );
}

export default EmployeeAvailabilityList;
