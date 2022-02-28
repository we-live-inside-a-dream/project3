import React from "react";
import {
  StyledContainer,
  StyledTitle,
  StyledSubtitle,
  StyledBox,
} from "./StyledLogIn";

const PasswordResetPending = ({ email }) => {
  return (
    <div>
      <StyledContainer>
        <StyledBox>
          <StyledTitle>
            <h1>Reset link has been sent to your email address.</h1>
            <StyledSubtitle>
              <p>
                Please check your inbox at: <b>{email}</b>
              </p>
            </StyledSubtitle>
          </StyledTitle>
        </StyledBox>
      </StyledContainer>
    </div>
  );
};

export default PasswordResetPending;
