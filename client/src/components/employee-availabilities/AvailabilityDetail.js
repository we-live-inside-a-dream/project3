import StyledTable from "../reusable/tables/StyledTable";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";
import Modal from "../reusable/Modal";
import EditMaxHours from "./EditMaxHours";
import AvailabilityModal from "./AvailabilityModal";
import NamePicTableData from "../reusable/NamePicTableData";

function EmployeeAvailabilityDetail({ availabilityId }) {
  const [modalDay, setModalDay] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [maxHoursIsOpen, setMaxHoursIsOpen] = useState(false);
  const [availability, setAvailability] = useState();
  // const [id, setId] = useState(availabilityId);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [maxHoursPerWeek, setMaxHoursPerWeek] = useState("");
  // const [availabilityDays, setAvailabilityDays] = useState([]);

  useEffect(() => {
    const fetchAvailabilityById = async () => {
      let fetchResult = await fetch(
        `/api/availability/availability-day/${availabilityId}`
      );
      let theAvailability = await fetchResult.json();
      // console.log("fetching employee availability", theAvailability);
      setAvailability(theAvailability);
    };
    fetchAvailabilityById();
  }, [availabilityId]);
  console.log(availability?.firstName, availability?.lastName);
  // if (availability) {
  //   setFirstName(availability.firstName);
  //   setLastName(availability.lastName);
  //   setMaxHoursPerWeek(availability.maxHoursPerWeek);
  //   setAvailabilityDays(availability.days);
  // }

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

  return (
    <div>
      <h1
        style={{
          fontWeight: "400",
          fontFamily: "Arial, Helvetica, sans-serif",
          textAlign: "center",
          // textShadow: "1px 1px 2px grey",
          color: "#07889b",
          marginTop: "0px",
          marginBottom: "10px",
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
            <NamePicTableData
              firstName={availability?.firstName}
              lastName={availability?.lastName}
            />
            <td>
              {availability?.maxHoursPerWeek}
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
