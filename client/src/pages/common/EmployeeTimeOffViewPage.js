import React, { useContext, useEffect, useState } from "react";
import {navigate} from 'react-router-dom' 
import EmployeeTimeOffForm from "../../components/employee-time-off/EmployeeTimeOffForm";
import AuthenticationContext from "../../components/login/AuthenticationContext";
import {
  StyledButton,
  StyledForm,
  StyledForm2,
  StyledFormWrapper,
} from "../../components/reusable/Inputs/StyledEmployeeForm";
import StyledPage from "../../components/reusable/styled-page/StyledPage";
import StyledPageTitle from "../../components/reusable/styled-page/StyledPageTitle";
import StyledTable from "../../components/reusable/tables/StyledTable";
import ApprovalSymbol from "../../components/dashboard/ApprovalSymbol";
import StyledEditButton from "../../components/reusable/Inputs/StyledEditButton";
import Modal from "../../components/reusable/Modal";

const EmployeeTimeOffViewPage = ({ setIsTimeOff, isTimeOff }) => {
  const [timeOff, setTimeOff] = useState(null);
  const [timeOffValues, setTimeOffValues] = useState(null);
  const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const authContext = useContext(AuthenticationContext);
  const user = authContext.user;

  // const navigation = useNavigate()

  useEffect(() => {
    //  if (!user._Id) return;
    const fetchTimeOff = async () => {
      console.log("userrrrr", user._id);
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

  // async function deleteTimeOff(id) {
  //   console.log("This is the delete id", id)
  //   let result = await fetch(`/api/timeOff/deleteTimeOff?id=${id}`, {
  //     method: "DELETE",
  //   });
  //   console.log("this is the result", result)
  // }
  // const deleteTimeOff = async (id) => {
  //   await fetch(`/api/timeOff/deleteTimeOff?id=${id}`, {
  //     method: "DELETE",
  //   });
  // };

  async function deleteTimeOff(id) {
   await fetch('/api/timeOff/deleteTime/' + id, {
     method: "DELETE",
   })
  }

  function statusConvert(status) {
    if (status === "confirm") {
      return "Approved";
    } else if (status === "reject") {
      return "Denied";
    } else return "Pending";
  }

  return (
    <div>
      <StyledPage>
        <StyledPageTitle style={{ marginBottom: "10px" }}>
          TIME OFF REQUESTS
        </StyledPageTitle>

        {timeOff?.length > 0 ? (
          <StyledTable padding={"5px"}>
            <thead>
              <tr>
                <th>STATUS</th>
                {/* <th>NAME</th> */}
                <th>TYPE</th>
                <th>START DATE</th>
                <th>END DATE</th>
                <th>COMMENTS</th>
                <th>EDIT/DELETE</th>
              </tr>
            </thead>
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
                    {/* <td>{`${t.firstName} ${t.lastName[0]}`}</td> */}

                    <td>
                      {<ApprovalSymbol time={t} />}
                      {`${statusConvert(t.status)}`}
                    </td>
                    <td>{`${t.type}`}</td>
                    <td>{`${t.startDate}`}</td>
                    <td>{`${t.endDate}`}</td>
                    {/* <td>{`${t.status}`}</td> */}
                    <td>{`${t.comment}`}</td>
                    <td>
                      <div>
                        <StyledEditButton
                          fontSize="25px"
                          // margin={"0"}
                          // padding={"0"}
                          onClick={() => {
                            setModalConfirmIsOpen(true);
                            setTimeOffValues(t);
                            console.log("this is t", t);
                          }}
                        >
                          ✎
                        </StyledEditButton>
                        <StyledEditButton
                          // fontSize="20px"
                          margin={"0px 20px"}
                          // padding={"0"}
                          onClick={() => {
                            // setModalConfirmIsOpen(true);
                            // setTimeOffValues(t);
                            // setSelectedId(t._id)
                            deleteTimeOff(t._id);
                            console.log("this is t", t);
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
        ) : (
          <EmployeeTimeOffForm />
        )}
      </StyledPage>
      <Modal
        onClose={() => {
          setModalConfirmIsOpen(false);
        }}
        open={modalConfirmIsOpen}
      >
        <EmployeeTimeOffForm
          existingValues={timeOffValues}
          onSave={updateTimeOff}
        />
      </Modal>
    </div>
  );
};

export default EmployeeTimeOffViewPage;
