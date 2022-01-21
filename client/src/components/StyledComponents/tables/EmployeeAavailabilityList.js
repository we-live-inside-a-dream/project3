import StyledTable from "./StyledTable";
import React from "react";
import { useState, useEffect } from "react";
import StyledButton from "../Inputs/StyledButton";
import { useNavigate } from "react-router-dom";

function EmployeeAvailabilityList() {
  const [availabilityList, setAvailabilityList] = useState([]);
  const navigate = useNavigate();

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

  function setSelectedEmployeeId(id) {
    navigate("/availability/availability-edit/" + id);
  }

  function selectEmployee(id) {
    console.log("selectEmployeeAvailability called on id", id);
    setSelectedEmployeeId(id);
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
          {availabilityList?.map((employee, index) => {
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
                      {employee.firstName}
                      <br />
                      {employee.lastName}
                      <br />
                      <StyledButton
                        onClick={() => selectEmployee(employee._id)}
                      >
                        EDIT
                      </StyledButton>
                    </div>
                  </div>
                  <div style={{ height: "5px" }} />
                </td>
                <td>{employee.maxHoursPerWeek}</td>
                {employee?.days?.map((day, index) => {
                  return <td key={index}>{renderAvailability(day)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </div>
  );
}

export default EmployeeAvailabilityList;
