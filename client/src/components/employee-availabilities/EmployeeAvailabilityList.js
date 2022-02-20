import StyledTable from "../reusable/tables/StyledTable";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NamePicTableData from "../reusable/NamePicTableData";

function EmployeeAvailabilityList() {
  const [availabilityList, setAvailabilityList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchAvailabilityList = async () => {
      // console.log("from useEffect, trying to fetch endpoint");
      let fetchResult = await fetch(`/api/availability/availability-all`);
      // console.log("fetch result", fetchResult);
      let theAvailabilityList = await fetchResult.json();
      // console.log("fetching employee availability list", theAvailabilityList);

      setAvailabilityList(theAvailabilityList);
    };
    if (isMounted) {
      fetchAvailabilityList();
    }
    return () => (isMounted = false);
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
    if (dayObject.available === false) {
      return "--";
    } else if (dayObject.available === true && dayObject.allDay === true) {
      return "all day";
    } else if (dayObject.available === true && dayObject.allDay === false) {
      return `${
        dayObject.start > 12 ? dayObject.start - 12 : dayObject.start
      } - ${dayObject.end > 12 ? dayObject.end - 12 : dayObject.end}`;
    } else return "?";
  };

  //selects the employee id to davigate to the pagee to edit that particular employee
  function selectAvailabilityId(id) {
    // console.log("FROM JUST BEFORE NAVIGATE");
    navigate("/avail-detail/" + id);
  }
  //selects employee from dropdowm menu
  function selectAvailabilityById(id) {
    // console.log("selectAvailability called on id", id);
    selectAvailabilityId(id);
  }

  return (
    <div>
      <h1
        style={{
          fontWeight: "400",
          fontFamily: "Arial, Helvetica, sans-serif",
          textAlign: "center",
          // textShadow: "1px 1px 2px grey",
          color: "var(--accentColorTitle)",
          marginTop: "0px",
          marginBottom: "10px",
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
            <th style={{ padding: "10px 20px" }}>NAME</th>
            <th style={{ padding: "10px 30px" }}>Max Hrs/Week</th>
            {businessDays.map((day, index) => {
              return (
                <th key={index} style={{ padding: "10px 30px" }}>
                  {day}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {availabilityList?.map((availability, index) => {
            return (
              <tr key={index}>
                <NamePicTableData
                  firstName={availability.firstName}
                  lastName={availability.lastName}
                  existingValues={availability}
                  edit="edit"
                  onClick={() => selectAvailabilityById(availability._id)}
                />

                <td>{availability.maxHoursPerWeek}</td>
                {availability?.days?.map((day, index) => {
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
