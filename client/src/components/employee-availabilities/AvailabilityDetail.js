import StyledTable from "../reusable/tables/StyledTable";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";
import Modal from "../reusable/Modal";
import EditMaxHours from "./EditMaxHours";
import AvailabilityModal from "./AvailabilityModal";
import NamePicTableData from "../reusable/NamePicTableData";
import StyledPage from "../reusable/styled-page/StyledPage";

function EmployeeAvailabilityDetail({}) {
  const [modalDay, setModalDay] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [maxHoursIsOpen, setMaxHoursIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [maxHoursPerWeek, setMaxHoursPerWeek] = useState(0);
  const [availability, setAvailability] = useState({
    days: [],
    day: "",
    maxHoursPerWeek: 0,
    firstName: "",
    lastName: "",
    employeeProfileId: "",
  });
  let params = useParams();
  let id = params.id;

  useEffect(() => {
    const fetchAvailabilityById = async () => {
      let fetchResult = await fetch(process.env.REACT_APP_ELECTRON_SERVER+"/api/availability/availability-day/" + id);
      let theAvailability = await fetchResult.json();
      console.log("fetching employee availability", theAvailability);
      setAvailability(theAvailability);
      setFirstName(theAvailability.firstName);
      setlastName(theAvailability.lastName);
      setMaxHoursPerWeek(theAvailability.maxHoursPerWeek);
    };
    fetchAvailabilityById();
  }, [id]);
  console.log(availability?.firstName, availability?.lastName);

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
      <StyledPage>
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
          style={{
            paddingTop: "10px",
            marginTop: "20px",
            paddingBottom: "20px",
          }}
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
                firstName={firstName}
                lastName={lastName}
                edit="edit"
                onClick={() => setModalOpen(true)}
              />
              <td>
                {maxHoursPerWeek}
                <br />
              </td>
              {availability?.days?.map((day, index) => {
                return (
                  <td key={index}>
                    {renderAvailability(day)}
                    <br />
                  </td>
                );
              })}
            </tr>
          </tbody>
        </StyledTable>
      </StyledPage>
      {modalOpen && (
        <AvailabilityModal
          edit="edit"
          existingValues={availability}
          setModalOpen={setModalOpen}
          theId={id}
        />
      )}
    </div>
  );
}

export default EmployeeAvailabilityDetail;
