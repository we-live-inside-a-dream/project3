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
import { useManagerSettings } from "../../components/reusable/context/ManagerSettingsProvider";

function EmployeeAvailabilityDetail({
  userId,
  availabilityId,
  userAvailability,
  imageUrl,
  employeeProfileEdit,
}) {
  const [modalDay, setModalDay] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [maxHoursIsOpen, setMaxHoursIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [maxHoursPerWeek, setMaxHoursPerWeek] = useState(0);
  const [id, setId] = useState();
  const [availability, setAvailability] = useState({
    day: "",
    maxHoursPerWeek: 0,
    firstName: "",
    lastName: "",
    employeeProfileId: "",
  });
  const [perms, setPerms] = useState();
  const value = useManagerSettings();

  let params = useParams();
  useEffect(() => {
    if (params) {
      setId(params.id);
    }
    if (availabilityId) {
      setId(availabilityId);
    }

    // if (userId) {
    //   // setId(userId);
    //   setAvailability(userAvailability);
    //   setFirstName(userAvailability?.firstName);
    //   setlastName(userAvailability?.lastName);
    //   setMaxHoursPerWeek(userAvailability?.maxHoursPerWeek);
    // }
  }, [availabilityId, params]);
  useEffect(() => {
    if (value) {
      setPerms(value.employeeProfileEdit);
    }
    console.log("FROM THE EMPLOYEE DETAIL PAGE", perms);
  }, [perms, value]);

  useEffect(() => {
    if (!id) return;
    console.log("userId", userId);
    console.log("id", id);
    const fetchAvailabilityById = async () => {
      let fetchResult = await fetch("/api/availability/availability-day/" + id);
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
                imageUrl={`${firstName?.toLowerCase()}.jpg`}
                edit="edit"
                onClick={() => setModalOpen(true)}
                // imageUrl={imageUrl}
                canEdit={true}
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
