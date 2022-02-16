import React, { useContext, useEffect, useState } from "react";
import EmployeeTimeOff from "../../components/employee-time-off/EmployeeTimeOff";
import AuthenticationContext from "../../components/login/AuthenticationContext";
import {
  StyledButton,
  StyledFormWrapper,
} from "../../components/reusable/Inputs/StyledEmployeeForm";
import Modal from "../../components/reusable/Modal";
import StyledTable from "../../components/reusable/tables/StyledTable";

const EmployeeTimeOffViewPage = () => {
  const [timeOff, setTimeOff] = useState(null);
  const [timeOffValues, setTimeOffValues] = useState(null);
  const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
  const authContext = useContext(AuthenticationContext);
  const user = authContext.user;

  useEffect(() => {
    // if (!user._Id) return;
    const fetchTimeOff = async () => {
      console.log("userrrrr", user._Id);
      let fetchResult = await fetch(`/api/timeOff/listEmployee?id=${user._id}`);
      let fetchedTimeOff = await fetchResult.json();
      console.log("fetch time off", fetchedTimeOff);
      setTimeOff(fetchedTimeOff);
    };
    fetchTimeOff();
  }, [user._id]);

  async function updateTimeOff(updatedTimeOff) {
    console.log("posting to user Id", user._id, "with Data", updatedTimeOff);
    await fetch(`/api/timeOff/update?id=${timeOffValues._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTimeOff),
    });
  }

  return (
    <div>
      <StyledFormWrapper>
        <StyledTable padding={"5px"}>
          <thead></thead>
          <tbody>
            {timeOff?.map((t) => {
              return (
                <tr
                  key={t._id}
                  value={t}
                  style={{
                    padding: "10px",
                    textAlign: "center",
                    height: "auto",
                  }}
                >
                  <td>{`${t.firstName} ${t.lastName[0]}`}</td>
                  <td>{`${t.type}`}</td>
                  <td>{`${t.startDate}`}</td>
                  <td>{`${t.endDate}`}</td>
                  <td>{`${t.status}`}</td>
                  <StyledButton
                    margin={"0"}
                    padding={"0"}
                    onClick={() => {
                      setModalConfirmIsOpen(true);
                      setTimeOffValues(t);
                      console.log("this is t", t);
                    }}
                  >
                    Edit
                  </StyledButton>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      </StyledFormWrapper>
      <Modal
        onClose={() => {
          setModalConfirmIsOpen(false);
        }}
        open={modalConfirmIsOpen}
      >
        <EmployeeTimeOff
          existingValues={timeOffValues}
          onSave={updateTimeOff}
        />
      </Modal>
    </div>
  );
};

export default EmployeeTimeOffViewPage;
