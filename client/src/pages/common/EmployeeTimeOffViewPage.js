import React, { useContext, useEffect, useState } from "react";
import EmployeeTimeOffForm from "../../components/employee-time-off/EmployeeTimeOffForm";
import AuthenticationContext from "../../components/login/AuthenticationContext";
import ClockLoader from "react-spinners/ClockLoader";
import { StyledButton } from "../../components/reusable/Inputs/StyledEmployeeForm";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import StyledTable from "../../components/reusable/tables/StyledTable";
import ApprovalSymbol from "../../components/dashboard/ApprovalSymbol";
import StyledEditButton from "../../components/reusable/Inputs/StyledEditButton";
import Modal from "../../components/reusable/Modal";

const EmployeeTimeOffViewPage = () => {
  const [timeOffRequests, setTimeOffRequests] = useState(null);
  const [timeOffValues, setTimeOffValues] = useState(null);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalApplyIsOpen, setModalApplyIsOpen] = useState(false);
  const [timeToDelete, setTimeToDelete] = useState();
  const [renderPage, setRenderPage] = useState();
  const authContext = useContext(AuthenticationContext);
  const user = authContext.user;

  console.log("this is time off", timeOffRequests);

  useEffect(() => {
    const fetchTimeOff = async () => {
      console.log("userrrrr", user._id);
      let fetchResult = await fetch(`/api/timeOff/listEmployee?id=${user._id}`);
      let fetchedTimeOff = await fetchResult.json();
      console.log("fetch time off", fetchedTimeOff);
      setTimeOffRequests(fetchedTimeOff);
      setRenderPage(false);
      setLoading(true);
    };
    fetchTimeOff();
  }, [user._id, renderPage, setTimeOffRequests]);

  async function updateTimeOff(updatedTimeOff) {
    console.log("posting to user Id", user._id, "with Data", updatedTimeOff);
    await fetch(`/api/timeOff/update?id=${timeOffValues._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTimeOff),
    });
    let updatedTimeOffList = timeOffRequests.map((timeOff) => {
      if (timeOff._id === timeOffValues._id) {
        return updatedTimeOff;
      } else {
        return timeOff;
      }
    });
    setTimeOffRequests(updatedTimeOffList);
  }

  async function deleteTimeOff() {
    console.log("FROM THE DELETE", timeToDelete);
    await fetch("/api/timeOff/delete/" + timeToDelete, {
      method: "DELETE",
    });
    let removedTimeOff = await timeOffRequests.filter(
      (t) => t._id !== timeToDelete
    );
    setTimeOffRequests(removedTimeOff);
  }

  function statusConvert(status) {
    if (status === "approved") {
      return "Approved";
    } else if (status === "denied") {
      return "Denied";
    } else return "Pending";
  }

  return (
    <div style={{ position: "relative" }}>
      <StyledPage>
        {!loading ? (
          <div
            style={{
              height: "320px",
              width: "320px",
              borderRadius: "50%",
              border: "3px solid var(--mainHeader)",
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              margin: "auto",
            }}
          >
            <ClockLoader
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "Center",
                width: "100%",
                height: "100vh",
              }}
              color={"var(--mainHeader)"}
              loading={loading}
              size={300}
            />
          </div>
        ) : (
          <div>
            <StyledPageTitle style={{ marginBottom: "10px" }}>
              Time Off Requests
            </StyledPageTitle>
            <StyledTable padding={"5px"}>
              <thead>
                <tr>
                  <th>TYPE</th>
                  <th>START DATE</th>
                  <th>END DATE</th>
                  <th>COMMENTS</th>
                  <th style={{ padding: "20px" }}>EDIT/DELETE</th>
                  <th>MANAGER COMMENTS</th>
                  <th style={{ padding: "20px" }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {timeOffRequests?.map((t) => {
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
                      <td>{`${t.type}`}</td>
                      <td>{`${t.startDate}`}</td>
                      <td>{`${t.endDate}`}</td>
                      {/* <td>{`${t.status}`}</td> */}
                      <td>{`${t.comment}`}</td>

                      <td>
                        <div>
                          <StyledEditButton
                            margin={"0px 10px 0px 10px"}
                            fontSize="25px"
                            onClick={() => {
                              setModalEditIsOpen(true);
                              setTimeOffValues(t);
                              console.log("this is t", t);
                            }}
                          >
                            ✎
                          </StyledEditButton>

                          <StyledEditButton
                            margin={"0px 10px 0px 10px"}
                            onClick={() => {
                              setTimeToDelete(t._id);
                              setModalConfirmIsOpen(true);
                            }}
                          >
                            ❌
                          </StyledEditButton>
                        </div>
                      </td>
                      <td>{t.managerComment}</td>
                      <td>
                        {<ApprovalSymbol time={t} />}
                        {`${statusConvert(t.status)}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <StyledButton
                margin={"0"}
                onClick={() => setModalApplyIsOpen(true)}
                style={{
                  position: "absolute",
                  marginTop: "1em",
                }}
              >
                REQUEST TIME OFF
              </StyledButton>
            </StyledTable>

            {timeOffRequests?.length < 1 ? (
              <div style={{ marginLeft: "33%" }}>
                {" "}
                <h1>You have no Time Off requests</h1>{" "}
              </div>
            ) : null}
          </div>
        )}
      </StyledPage>
      <Modal onClose={() => setModalApplyIsOpen(false)} open={modalApplyIsOpen}>
        <EmployeeTimeOffForm
          setModalApplyIsOpen={setModalApplyIsOpen}
          setTimeOffRequests={setTimeOffRequests}
          reload={() => setRenderPage(true)}
        />
      </Modal>

      <Modal
        onClose={() => {
          setModalEditIsOpen(false);
        }}
        open={modalEditIsOpen}
      >
        <EmployeeTimeOffForm
          existingValues={timeOffValues}
          onSave={updateTimeOff}
          setTimeOffRequests={setTimeOffRequests}
          timeOffRequests={timeOffRequests}
          setModalEditIsOpen={setModalEditIsOpen}
          reload={() => setRenderPage(true)}
        />
      </Modal>
      <Modal
        onClose={() => {
          setModalConfirmIsOpen(false);
        }}
        open={modalConfirmIsOpen}
      >
        <div>
          <h3>Are you sure you want to DELETE your time off request?</h3>
        </div>
        <StyledButton
          onClick={() => {
            deleteTimeOff();
            setModalConfirmIsOpen(false);
          }}
        >
          Delete
        </StyledButton>
        <StyledButton onClick={() => setModalConfirmIsOpen(false)}>
          Cancel
        </StyledButton>
      </Modal>
    </div>
  );
};

export default EmployeeTimeOffViewPage;
