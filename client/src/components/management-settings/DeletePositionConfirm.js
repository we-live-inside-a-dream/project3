import React, { useState } from "react";
// import { updatePosition } from "../../../../server/models/positions";
import { StyledButton } from "../reusable/Inputs/StyledEmployeeForm";
import PositionsForm from "./PositionsForm";

function DeletePositionConfirm({ onClose, deletePosition }) {
  return (
    <div>
      <h3>Are you sure you want to delete this position?</h3>
      <div>
        <StyledButton onClick={deletePosition}>Confirm</StyledButton>
        <StyledButton onClick={onClose}>Cancel</StyledButton>
      </div>
    </div>
  );
}

export default DeletePositionConfirm;
