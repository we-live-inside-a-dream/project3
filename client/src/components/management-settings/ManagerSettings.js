import React from "react";
import StyledForm, {
  StyledButton,
} from "../reusable/Inputs/StyledEmployeeForm";
import StyledPage from "../reusable/styled-page/StyledPage";
import StyledPageTitle from "../reusable/styled-page/StyledPageTitle";
function ManagerSettings() {
  let onInputUpdate = function (event, setter) {};
  return (
    <div>
      <StyledPage>
        <StyledPageTitle>Manager Settings</StyledPageTitle>
        <StyledForm>
          <div>
            <label>Event Name:</label>
            <StyledInput
              type="text"
              value={position}
              onChange={(event) => onInputUpdate(event, setTitle)}
            />
            <StyledButton>+</StyledButton>
          </div>
        </StyledForm>
      </StyledPage>
    </div>
  );
}

export default ManagerSettings;
