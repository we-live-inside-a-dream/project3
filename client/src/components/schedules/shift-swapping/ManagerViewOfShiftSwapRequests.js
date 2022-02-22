import React, { useEffect, useState, useContext } from "react";
import StyledTable from "../../reusable/tables/StyledTable";
import StyledEditButton from "../../reusable/Inputs/StyledEditButton";
import Modal from "../../reusable/Modal";
import AuthenticationContext from "../../login/AuthenticationContext";
import ManagerConfirmSwapModal from "./ManagerConfirmSwapModal";

function ManagerViewOfShiftSwapRequests() {
  const [swapRequests, setSwapRequests] = useState([]);
  const [decision, setDecision] = useState("");
  const [detailShift, setDetailShift] = useState();
  const [shiftApprovalModalIsOpen, setShiftApprovalModalIsOpen] =
    useState(false);

  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;

  useEffect(() => {
    async function findShiftSwapRequests() {
      let fetchedResult = await fetch(
        "/api/schedule/find-pending-swap-requests"
      );
      let retreivedSwapRequests = await fetchedResult.json();
      setSwapRequests(retreivedSwapRequests);
    }
    findShiftSwapRequests();
  }, []);
  console.log(typeof swapRequests);

  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            <th>SHIFT DATE</th>
            <th>POSITION</th>
            <th>BIDDEE</th>
            <th>BIDDER</th>
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
                        setSwapRequests([...swapRequests]);
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
                        setSwapRequests([...swapRequests]);
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
          shift={detailShift}
          setShiftApprovalModalIsOpen={setShiftApprovalModalIsOpen}
          decision={decision}
        />
      </Modal>
    </div>
  );
}

export default ManagerViewOfShiftSwapRequests;
