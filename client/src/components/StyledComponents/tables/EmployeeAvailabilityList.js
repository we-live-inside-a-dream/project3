import StyledTable from "./StyledTable";
import React from "react";
import { useState, useEffect } from "react";
import StyledButton from "../Inputs/StyledButton";
import { useNavigate } from "react-router-dom";
import { Menu, Select, MenuItem, InputLabel } from "@mui/material";

function EmployeeAvailabilityList() {
  const [availabilityList, setAvailabilityList] = useState([]);
  const [employeeProfileId, setSelectedEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching employee data!");
      let fetchResult = await fetch("/api/employeeProfile/employees");
      let employeeList = await fetchResult.json();
      setEmployees(employeeList);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAvailabilityList = async () => {
      console.log("from useEffect, trying to fetch endpoint");
      let fetchResult = await fetch(`/api/availability/availability-all`);
      console.log("fetch result", fetchResult);
      let theAvailabilityList = await fetchResult.json();
      console.log("fetching employee availability list", theAvailabilityList);

      setAvailabilityList(theAvailabilityList);
    };
    fetchAvailabilityList();
  }, []);
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
  //
  let renderAvailability = function (dayObject) {
    if (dayObject.availabile === false) {
      return "--";
    } else if (dayObject.availabile === true && dayObject.allDay === true) {
      return "all day";
    } else if (dayObject.availabile === true && dayObject.allDay === false) {
      return `${
        dayObject.start > 12 ? dayObject.start - 12 : dayObject.start
      } - ${dayObject.end > 12 ? dayObject.end - 12 : dayObject.end}`;
    } else return "?";
  };

  //selects the employee id to davigate to the pagee to edit that particular employee
  function selectEmployeeId(id) {
    navigate("/availability/availability-edit/" + id);
  }
  //selects employee from dropdowm menu
  function selectEmployee(id) {
    console.log("selectEmployeeAvailability called on id", id);
    selectEmployeeId(id);
  }

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
        Employee Recurring Availability List
      </h1>

      <StyledTable
        style={{ paddingTop: "0px", marginTop: "0px", paddingBottom: "20px" }}
      >
        <thead>
          <tr>
            <th>NAME</th>
            <th>Max Weekly Hours</th>
            {businessDays.map((day, index) => {
              return <th key={index}>{day}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {availabilityList?.map((person, index) => {
            return (
              <tr key={index}>
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
                      {person.firstName}
                      <br />
                      {person.lastName}
                      <br />
                      <StyledButton onClick={() => selectEmployee(person._id)}>
                        EDIT
                      </StyledButton>
                    </div>
                  </div>
                  <div style={{ height: "5px" }} />
                </td>
                <td>{person.maxHoursPerWeek}</td>
                {person?.days?.map((day, index) => {
                  return <td key={index}>{renderAvailability(day)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      <InputLabel id="demo-simple-select-helper-label">
        Employee Name
      </InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="name-imput"
        value={employeeProfileId}
        label="name"
        // onChange={(event) => onInputUpdate(event, selectEmployeeId(id))}
        style={{
          width: "300px",
          fontSize: "1em",
          textAlign: "center",
          color: "#4488AB",
          backgroundColor: "white",
          border: "2px solid #4488AB",
          filter: "dropShadow(5px 5px 10px grey)",
        }}
      >
        {/* {employee} */}
        <MenuItem value="name">
          <em>None</em>
        </MenuItem>
        {employees?.map((person, index) => {
          return (
            <MenuItem key={index} value={person._id}>
              {person.firstName}
              {person.lastName}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}

export default EmployeeAvailabilityList;
