import React, { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../../login/AuthenticationContext";
import moment from "moment";
import StyledTable from "../../reusable/tables/StyledTable";
import Modal from "../../reusable/Modal";
import UpcomingShiftView from "./UpcomingShiftView";
import ShiftSwapConfirmModal from "../shift-swapping/ShiftSwapConfirmModal";
import StyledButton from "../../reusable/Inputs/StyledButton";
import ShiftsUpForGrabs from "../shift-swapping/ShiftsUpForGrabs";

function EmployeeUpcomingShiftList() {
  const [shifts, setShifts] = useState([]);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  const [detailShift, setDetailShift] = useState();
  const [swapConfirmModalIsOpen, setSwapConfirmModalIsOpen] = useState(false);
  const [shiftsUpForGrabsIsOpen, setShiftsUpForGrabsIsOpen] = useState(false);
  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;
  let id = user?._id;
  console.log(id);

  let today = moment().format("yyyy-MM-DD");

  useEffect(() => {
    const getUpcomingShiftsById = async function () {
      let employeeLst = await fetch(
        `/api/schedule/employee-id?id=${id}&today=${today}`
      );
      let nameIdList = await employeeLst.json();
      setShifts(nameIdList);
    };
    getUpcomingShiftsById();
  }, [id, today]);
  console.log("THE EMPLOYEE's shift LIST IS", shifts);
  console.log("today is ", today);

  const formatTime = function (time) {
    let newTime = moment(time, "hh:mma").format("h:mma");
    return newTime;
  };
  const formatDate = function (date) {
    let newDate = moment(date).format("ddd, MMM, Do");
    return newDate;
  };
  const findStatusSymbol = function (shift) {
    if (shift.swapRequestStatus === "pending") {
      return "⏳";
    } else if (shift.swapRequestStatus === "declined") {
      return "❌";
    } else if (shift.swapRequestStatus === "approved") {
      return "✅";
    } else return null;
  };

  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            <th>DATE</th>
            <th>POSITION</th>
            <th>START</th>
            <th>END</th>
            <th>SWAP</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {shifts?.map((shift, index) => {
            return (
              <tr
                // onClick={viewShiftDetails}
                style={{ cursor: "pointer" }}
                // onClick={() => {
                //   setDetailShift(shift);
                //   setDetailModalIsOpen(true);
                // }}
              >
                <td
                  onClick={() => {
                    setDetailShift(shift);
                    setDetailModalIsOpen(true);
                  }}
                >
                  {formatDate(shift.date)}
                </td>
                <td
                  onClick={() => {
                    setDetailShift(shift);
                    setDetailModalIsOpen(true);
                  }}
                >
                  {shift.position}
                </td>
                <td
                  onClick={() => {
                    setDetailShift(shift);
                    setDetailModalIsOpen(true);
                  }}
                >
                  {formatTime(shift.start)}
                </td>
                <td
                  onClick={() => {
                    setDetailShift(shift);
                    setDetailModalIsOpen(true);
                  }}
                >
                  {formatTime(shift.end)}
                </td>
                <td
                  style={{ color: "blue", fontSize: "30px", fontWeight: "800" }}
                  onClick={() => {
                    setSwapConfirmModalIsOpen(true);
                    setDetailShift(shift);
                  }}
                >
                  ⇄
                </td>
                <td>{findStatusSymbol(shift)}</td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      <StyledButton
        onClick={() => setShiftsUpForGrabsIsOpen(!shiftsUpForGrabsIsOpen)}
      >
        VIEW AVAILABLE SHIFTS
      </StyledButton>
      <Modal
        open={detailModalIsOpen}
        onClose={() => setDetailModalIsOpen(false)}
      >
        <UpcomingShiftView
          shift={detailShift}
          setShifts={setShifts}
          shifts={shifts}
          // employee={modalEmployee}
          setDetailModalIsOpen={setDetailModalIsOpen}
          // date={modalDate}
        />
      </Modal>
      <Modal
        open={swapConfirmModalIsOpen}
        onClose={() => setSwapConfirmModalIsOpen(false)}
      >
        <ShiftSwapConfirmModal
          shifts={shifts}
          setShifts={setShifts}
          shift={detailShift}
          setSwapConfirmModalIsOpen={setSwapConfirmModalIsOpen}
        />
      </Modal>
      {shiftsUpForGrabsIsOpen ? <ShiftsUpForGrabs user={user} /> : null}
    </div>
  );
}

export default EmployeeUpcomingShiftList;
