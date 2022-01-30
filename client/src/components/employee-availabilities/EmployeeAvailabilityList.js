import StyledTable from "../reusable/tables/StyledTable";
import React from "react";
import { useState, useEffect } from "react";
import StyledButton from "../reusable/Inputs/StyledButton";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";
import { useNavigate } from "react-router-dom";
import { Menu, Select, MenuItem, InputLabel } from "@mui/material";
import NamePicTableData from "../week-schedule/NamePicTableData";

function EmployeeAvailabilityList() {
  const [availabilityList, setAvailabilityList] = useState([]);
  const [selectedAvailabilityId, setSelectedAvailabilityId] = useState("");
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
    navigate("/availability-detail/" + id);
  }
  //selects employee from dropdowm menu
  function selectAvailabilityById(id) {
    console.log("selectAvailability called on id", id);
    selectAvailabilityId(id);
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
