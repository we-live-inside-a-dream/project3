import { InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  StyledButton,
  StyledForm2,
  StyledFormWrapper,
} from "../reusable/Inputs/StyledEmployeeForm";
import moment from "moment";
import Modal from "../reusable/Modal";
import StyledTable from "../reusable/tables/StyledTable";

//fetch timeoffs

//display pending
//change from pending => approved
// change from pending => rejected
//display approved

const TimeOffApproval = () => {
  const [timeOff, setTimeOff] = useState();
  const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
  const [timeOffValues, setTimeOffValues] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    function filterTimeOff(time) {
      const timeOffFilter = time.filter((r) => r.status == "pending");
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

  function onInputUpdate(value, setter) {
    // console.log(value);
    setter(value);
  }
  function postData() {
    let newValue = {
      status,
    };
    setModalConfirmIsOpen(false);
    updateTimeOff(newValue);
  }

  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <div>
      <StyledFormWrapper>
        <StyledForm2>
          <h1>
            <InputLabel style={{ fontSize: "30px" }}>
              Pending Time Off
            </InputLabel>
          </h1>
          <StyledTable padding={"5px"}>
            <thead></thead>
            <tbody>
              {timeOff?.map((t) => {
                return (
                  <tr
                    key={t._id}
                    value={t}
                    onClick={() => {
                      setModalConfirmIsOpen(true);
                      setTimeOffValues(t);
                    }}
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      height: "auto",
                    }}
                  >
                    <td>{`${t.firstName} ${t.lastName[0]}`}</td>
                    <td>{`${t.type}`}</td>
                    <td>{`${t.startDate}`}</td>
                    <td>{`${t.startDate}`}</td>
                    <td>{`${t.status}`}</td>
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
              <h3>Confirm Time Off</h3>
              <p>Employee:{timeOffValues?.firstName}</p>
              <p>Type of time off:{timeOffValues?.type}</p>
              <p>
                Start Day: {moment(timeOffValues?.startDate).format("yy-MM-DD")}
              </p>
              <p>
                End Day: {moment(timeOffValues?.endDate).format("YYYY-MM-DD")}
              </p>
              {timeOffValues?.allDay === false && (
                <>
                  <p>Start Time: {timeOffValues?.startTime}</p>
                  <p>End Time: {timeOffValues?.endTime}</p>
                </>
              )}
              <p>Comments:{timeOffValues?.comment}</p>
              <InputLabel>Status</InputLabel>
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
              </Select>
              <div></div>

              <StyledButton onClick={postData}>Confirm</StyledButton>
              <StyledButton onClick={() => setModalConfirmIsOpen(false)}>
                Cancel
              </StyledButton>
            </div>
          </Modal>
        </StyledForm2>
      </StyledFormWrapper>
    </div>
  );
};

export default TimeOffApproval;
