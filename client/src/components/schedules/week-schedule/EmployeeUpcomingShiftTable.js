import React, { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../../login/AuthenticationContext";
import moment from "moment";
import StyledTable from "../../reusable/tables/StyledTable";
import Modal from "../../reusable/Modal";
import UpcomingShiftView from "./UpcomingShiftView";

function EmployeeUpcomingShiftList() {
  const [shifts, setShifts] = useState([]);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  const [detailShift, setDetailShift] = useState();
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

  // console.log("today is ", today);

  const formatTime = function (time) {
    let newTime = moment(time, "hh:mma").format("h:mma");
    return newTime;
  };
  const formatDate = function (date) {
    let newDate = moment(date).format("ddd, MMM, Do");
    return newDate;
  };
  const viewShiftDetatails = function () {
    setDetailModalIsOpen(!detailModalIsOpen);
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
                onClick={() => {
                  setDetailShift(shift);
                  setDetailModalIsOpen(true);
                }}
              >
                <td>{formatDate(shift.date)}</td>
                <td>position</td>
                <td>{formatTime(shift.start)}</td>
                <td>{formatTime(shift.end)}</td>
                <td>ICON</td>
                <td>check or x</td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      {/* <Modal
        open={detailModalIsOpen}
        onClose={() => setDetailModalIsOpen(false)}
      >
        <UpcomingShiftView
          shift={detailShift}
          // employee={modalEmployee}
          setDetailModalIsOpen={setDetailModalIsOpen}
          // date={modalDate}
        />
      </Modal> */}
    </div>
  );
}

export default EmployeeUpcomingShiftList;
