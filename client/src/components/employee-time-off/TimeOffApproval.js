import { InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  StyledButton,
  StyledForm2,
  StyledFormWrapper,
  StyledTextArea,
} from "../reusable/Inputs/StyledEmployeeForm";
import moment from "moment";
import Modal from "../reusable/Modal";
import StyledTable from "../reusable/tables/StyledTable";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";

//fetch timeoffs

//display pending
//change from pending => approved
// change from pending => rejected
//display approved

const TimeOffApproval = () => {
  const [timeOff, setTimeOff] = useState();
  const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
  const [decision, setDecision] = useState("");
  const [timeOffValues, setTimeOffValues] = useState();
  const [status, setStatus] = useState();
  const [managerComment, setManagerComment] = useState();

  useEffect(() => {
    function filterTimeOff(time) {
      const timeOffFilter = time.filter((r) => r.status === "pending");
      console.log(timeOffFilter);
      setTimeOff(timeOffFilter);
    }
    const fetchTimeOff = async () => {
      let fetchResult = await fetch("/api/timeOff/list");
      let fetchedTimeOff = await fetchResult.json();
      console.log("time off...", fetchedTimeOff);
      filterTimeOff(fetchedTimeOff);
    };
    fetchTimeOff();
  }, [modalConfirmIsOpen]);

  async function updateTimeOff(updatedTime) {
    console.log("new user data", updatedTime);
    await fetch(`/api/timeOff/update?id=${timeOffValues._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTime),
    });
  }
  useEffect(() => {
    console.log(timeOff);
  }, [timeOff]);

  function postData() {
    let newValue = {
      status,
      managerComment,
    };
    setModalConfirmIsOpen(false);
    updateTimeOff(newValue);
  }

  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <div>
      <StyledTable padding={"5px"}>
        <thead>
          <tr>
            <th>NAME</th>
            <th>TYPE</th>
            <th>START</th>
            <th>END</th>
            <th>REASON</th>
            <th>APPROVE/DECLINE</th>
          </tr>
        </thead>
        <tbody>
          {timeOff?.map((t) => {
            return (
              <tr key={t._id} value={t}>
                <td>{`${t.firstName} ${t.lastName[0]}`}</td>
                <td>{`${t.type}`}</td>
                <td>{`${t.startDate}`}</td>
                <td>{`${t.startDate}`}</td>
                <td>{`${t.comment}`}</td>
                <td>
                  <div>
                    <StyledEditButton
                      style={{ margin: "5px 10px" }}
                      onClick={() => {
                        setDecision("approve");
                        setModalConfirmIsOpen(true);
                        setTimeOffValues(t);
                      }}
                    >
                      ✅
                    </StyledEditButton>
                    <StyledEditButton
                      style={{ margin: "5px 10px" }}
                      onClick={() => {
                        setStatus("reject");
                        setDecision("deny");
                        setModalConfirmIsOpen(true);
                        setTimeOffValues(t);
                      }}
                    >
                      ❌
                    </StyledEditButton>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      <Modal
        onClose={() => {
          setModalConfirmIsOpen(false);
        }}
        open={modalConfirmIsOpen}
      >
        <div style={{ padding: "20px" }}>
          <h3>
            {`Are you sure you would like to ${decision} 
             the following time off?`}
          </h3>
          <p>Employee:{timeOffValues?.firstName}</p>
          <p>Type of time off:{timeOffValues?.type}</p>
          <p>
            Start Day: {moment(timeOffValues?.startDate).format("yy-MM-DD")}
          </p>
          <p>End Day: {moment(timeOffValues?.endDate).format("YYYY-MM-DD")}</p>
          {timeOffValues?.allDay === false && (
            <>
              <p>Start Time: {timeOffValues?.startTime}</p>
              <p>End Time: {timeOffValues?.endTime}</p>
            </>
          )}
          <p>Comments:{timeOffValues?.comment}</p>
          <br />
          <label>Manger Comment:</label>
          <StyledTextArea
            value={managerComment}
            onChange={(e) => setManagerComment(e.target.value)}
          />

          {/* <InputLabel>Status</InputLabel>
          <Select
            id="name-input"
            defaultValue={timeOffValues?.status}
            onChange={(event) => {
              onInputUpdate(event.target.value, setStatus);
              console.log(event.target.value);
            }}
            style={{
              width: "100%",
            }}
          >
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"confirm"}>Confirm</MenuItem>
            <MenuItem value={"reject"}>Reject</MenuItem>
          </Select> */}
          <div></div>

          <StyledButton onClick={postData}>Confirm</StyledButton>
          <StyledButton onClick={() => setModalConfirmIsOpen(false)}>
            Cancel
          </StyledButton>
        </div>
      </Modal>
    </div>
  );
};

export default TimeOffApproval;
