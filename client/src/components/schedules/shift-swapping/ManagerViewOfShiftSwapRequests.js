import React, { useEffect, useState, useContext } from "react";
import StyledTable from "../../reusable/tables/StyledTable";
import StyledEditButton from "../../reusable/Inputs/StyledEditButton";
import Modal from "../../reusable/Modal";
// import AuthenticationContext from "../../login/AuthenticationContext";
import ManagerConfirmSwapModal from "./ManagerConfirmSwapModal";

function ManagerViewOfShiftSwapRequests() {
  const [swapRequests, setSwapRequests] = useState([]);
  const [decision, setDecision] = useState("");
  const [detailShift, setDetailShift] = useState();
  const [shiftApprovalModalIsOpen, setShiftApprovalModalIsOpen] =
    useState(false);
  const [render, setRender] = useState(false);

  // const authContext = useContext(AuthenticationContext);
  // let user = authContext.user;

  useEffect(() => {
    async function findShiftSwapRequests() {
      let fetchedResult = await fetch(
        "/api/schedule/find-pending-swap-requests"
      );
      let retreivedSwapRequests = await fetchedResult.json();
      setSwapRequests(retreivedSwapRequests);
    }
    findShiftSwapRequests();
  }, [render]);

  const reload = () => {
    setRender((prevCheck) => !prevCheck);
  };

  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            <th>SHIFT DATE</th>
            <th>POSITION</th>
            <th>FROM</th>
            <th>TO</th>
            <th>REASON</th>
            <th>APPROVE/DECLINE</th>
          </tr>
        </thead>
        <tbody>
          {swapRequests?.map((request) => {
            return (
              <tr key={request._id}>
                <td>{request.date}</td>
                <td>{request.position}</td>
                <td>{`${request?.firstName} ${request?.lastName[0]}`}</td>
                <td>{`${request?.bidderFirstName} ${request?.bidderLastName}`}</td>
                <td>{request?.reasonForSwap}</td>
                <td>
                  <div>
                    <StyledEditButton
                      style={{ margin: "5px 10px" }}
                      onClick={() => {
                        setDetailShift(request);
                        setDecision("approved");
                        setShiftApprovalModalIsOpen(true);
                      }}
                    >
                      ✅
                    </StyledEditButton>
                    <StyledEditButton
                      style={{ margin: "5px 10px" }}
                      onClick={() => {
                        setDetailShift(request);
                        setDecision("denied");
                        setShiftApprovalModalIsOpen(true);
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
        open={shiftApprovalModalIsOpen}
        onClose={() => setShiftApprovalModalIsOpen(false)}
      >
        <ManagerConfirmSwapModal
          reload={reload}
          shift={detailShift}
          setShiftApprovalModalIsOpen={() => setShiftApprovalModalIsOpen(false)}
          decision={decision}
          swapRequestValues={detailShift}
          swapRequests={swapRequests}
          setSwapRequests={setSwapRequests}
        />
      </Modal>
    </div>
  );
}

export default ManagerViewOfShiftSwapRequests;
