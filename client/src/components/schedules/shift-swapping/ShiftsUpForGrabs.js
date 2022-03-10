import React, { useEffect, useState, useContext } from "react";
import AuthenticationContext from "../../login/AuthenticationContext";
import StyledTable from "../../reusable/tables/StyledTable";
import moment from "moment";
import Bid from "./shiftBidIcon.jpg";
import Modal from "../../reusable/Modal";
import ShiftBidConfirmModal from "./ShiftBidConfirmModal";

function ShiftsUpForGrabs() {
  const [availableShifts, setAvailableShifts] = useState();
  const [shiftBidModalIsOpen, setShiftBidModalIsOpen] = useState(false);
  const [detailShift, setDetailShift] = useState();
  const authContext = useContext(AuthenticationContext);
  const [render, setRender] = useState(false);
  let user = authContext.user;

  useEffect(() => {
    async function fetchAvailableShifts() {
      let shiftList = await fetch(
        `/api/schedule/shifts-up-for-grabs?userId=${user?._id}`
      );
      let fetchedShiftList = await shiftList.json();
      setAvailableShifts(fetchedShiftList);
    }

    fetchAvailableShifts();
  }, [user?._id, render]);

  const reload = () => {
    setRender((prevCheck) => !prevCheck);
  };
  // console.log("THESE ARE THE AVAILABLE SHIFTS", availableShifts);
  const formatTime = function (time) {
    let newTime = moment(time, "hh:mma").format("h:mma");
    return newTime;
  };
  const formatDate = function (date) {
    let newDate = moment(date).format("ddd, MMM, Do");
    return newDate;
  };
  const renderStatus = function (value) {
    if (value?.swapRequestStatus === "pending" && value.shiftBidId !== null) {
      return "⏳";
    } else if (
      value?.swapRequestStatus === "approved" &&
      value?.shiftBidId !== null
    ) {
      return "✅";
    }
  };

  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            <th>POSITION</th>
            <th>DATE</th>
            <th>START</th>
            <th>END</th>
            <th>BID</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {availableShifts?.map((shifty, index) => {
            return (
              <tr key={index}>
                <td>{shifty.position}</td>
                <td>{formatDate(shifty.date)}</td>
                <td>{formatTime(shifty.start)}</td>
                <td>{formatTime(shifty.end)}</td>
                <td>
                  <div>
                    {shifty.shiftBidId === null ? (
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setDetailShift(shifty);
                          setShiftBidModalIsOpen(!shiftBidModalIsOpen);
                        }}
                      >
                        <img
                          src={Bid}
                          alt="to bid on shift"
                          style={{ height: "25px", width: "25px" }}
                        />
                      </div>
                    ) : null}
                  </div>
                </td>
                <td>{renderStatus(shifty)}</td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      <Modal
        open={shiftBidModalIsOpen}
        onClose={() => setShiftBidModalIsOpen(false)}
      >
        <ShiftBidConfirmModal
          reload={reload}
          shift={detailShift}
          employee={user}
          setShiftBidModalIsOpen={setShiftBidModalIsOpen}
          // date={modalDate}
        />
      </Modal>
    </div>
  );
}

export default ShiftsUpForGrabs;
