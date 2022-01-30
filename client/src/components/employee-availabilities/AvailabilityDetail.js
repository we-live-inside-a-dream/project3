import StyledTable from "../reusable/tables/StyledTable";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";
import { useNavigate } from "react-router-dom";
import Modal from "../reusable/Modal";
import EditDayAvailability from "./EditDayAvailability";
import EditMaxHours from "./EditMaxHours";
import AvailabilityModal from "./AvailabilityModal";
import NamePicTableData from "../week-schedule/NamePicTableData";

function EmployeeAvailabilityDetail({ availabilityId }) {
  const [modalDay, setModalDay] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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
        `/api/availability/availability-day/${params.id}`
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
        style={{ paddingTop: "10px", marginTop: "20px", paddingBottom: "20px" }}
      >
        <thead>
          <tr>
            <th>NAME</th>
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
          <tr>
            <NamePicTableData existingValues={availability} />

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
                  <StyledEditButton
                    onClick={() => {
                      setModalDay(day);
                      setModalOpen(true);
                    }}
                  >
                    ✎
                  </StyledEditButton>
                </td>
              );
            })}
          </tr>
        </tbody>
      </StyledTable>
      {modalOpen && (
        <AvailabilityModal day={modalDay} setModalOpen={setModalOpen} />
      )}
    </div>
  );
}

export default EmployeeAvailabilityDetail;
