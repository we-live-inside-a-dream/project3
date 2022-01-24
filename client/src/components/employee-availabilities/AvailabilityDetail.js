import StyledTable from "../reusable/tables/StyledTable";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";
import { useNavigate } from "react-router-dom";
import Modal from "../reusable/Modal";
import EditDayAvailability from "./EditDayAvailability";
import EditMaxHours from "./EditMaxHours";

function EmployeeAvailabilityDetail({ availabilityId }) {
  const [dayIsOpen, setDayIsOpen] = useState(false);
  const [maxHoursIsOpen, setMaxHoursIsOpen] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [selectedAvailabilityId, setSelectedAvailabilityId] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const fetchAvailabilityById = async () => {
      console.log("from useEffect, trying to fetch  for availability detail");
      let fetchResult = await fetch(
        `/api/availability/availability/${params.id}`
      );
      console.log("fetch result", fetchResult);
      let theAvailability = await fetchResult.json();
      console.log("fetching employee availability list", theAvailability);

      setAvailability(theAvailability);
    };
    fetchAvailabilityById();
  }, [params.id]);
  console.log("AFTER USE EFFECT", availability);

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
    // console.log("rendering availability for ", dayObject);
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

  // selects the employee id to davigate to the pagee to edit that particular employee
  function selectAvailabilityId(id) {
    navigate("/availability-edit/" + id);
  }
  //    selects employee from dropdowm menu
  function selectAvailability(id) {
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
            <th>NAME</th>
            <th>Max Weekly Hours</th>
            {businessDays.map((day, index) => {
              return <th key={index}>{day}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {/* {availabilityList?.map((availability, index) => { */}
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
                  {availability.firstName}
                  <br />
                  {availability.lastName}
                  <br />
                  {/* <StyledEditButton
                    onClick={() => selectAvailabilityById(availability._id)}
                  >
                    ✎
                  </StyledEditButton> */}
                </div>
              </div>
              <div style={{ height: "5px" }} />
            </td>
            <td>
              {availability.maxHoursPerWeek}
              <br />
              <StyledEditButton
                onClick={() => setMaxHoursIsOpen(!maxHoursIsOpen)}
              >
                ✎
              </StyledEditButton>
              <Modal
                open={maxHoursIsOpen}
                onClose={() => setMaxHoursIsOpen(false)}
              >
                <EditMaxHours
                  existingValues={availability}
                  onClose={() => setMaxHoursIsOpen(false)}
                />
                ** max hours**
              </Modal>
            </td>
            {availability?.days?.map((day, index) => {
              return (
                <td key={index}>
                  {renderAvailability(day)}
                  <br />
                  <StyledEditButton onClick={() => setDayIsOpen(!dayIsOpen)}>
                    ✎
                  </StyledEditButton>
                  {/* <Modal open={dayIsOpen} onClose={() => setDayIsOpen(false)}>
                    <EditDayAvailability
                      // existingValues={day}
                      onClose={() => setDayIsOpen(false)}
                    />
                    **editDay**
                  </Modal> */}
                </td>
              );
            })}
          </tr>
        </tbody>
      </StyledTable>
    </div>
  );
}

export default EmployeeAvailabilityDetail;
