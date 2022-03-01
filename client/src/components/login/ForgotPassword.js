import React, { useState } from "react";
import axios from "axios";
import {
  StyledLogIn,
  StyledFormWrapper,
  StyledForgotPassword,
  StyledInput,
  StyledButton,
  StyledContainer,
  ErrorMsg,
  ButtonGroup,
  StyledLabel,
  StyledHeading,
} from "./StyledLogIn";
import PasswordResetPending from "./PasswordResetPending";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState();
  const [resetSuccess, setRequestSuccess] = useState(false);

  // console.log(authContext);
  const handleChange = (event, setter) => {
    const value = event.target.value;
    setter(value);
  };

  const handleSubmit = async () => {
    let response = await axios.post(
      "/api/employeeProfile/requestPasswordReset",
      {
        email,
      }
    );
    let error = response.data;
    if (error?.status === "FAILED") {
      console.log("User requesting reset from Email.", error);
      setMessage(error.message);
    } else {
      setRequestSuccess(true);
    }
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      console.log("enter was pressed");
      handleSubmit();
    }
  };
  console.log(resetSuccess);
  return (
    <>
      {resetSuccess === true ? (
        <PasswordResetPending email={email} />
      ) : (
        <StyledContainer>
          <StyledLogIn />
          <StyledFormWrapper>
            <StyledForgotPassword type="submit">
              <StyledHeading>Forgot Password</StyledHeading>
              <StyledLabel>Email</StyledLabel>
              <StyledInput
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                placeholder="Enter your email address here.."
                onChange={(event) => {
                  handleChange(event, setEmail);
                }}
                onKeyPress={handleKeypress}
              />
              <ErrorMsg>{message}</ErrorMsg>
              <ButtonGroup>
                <StyledButton id="submit" type="submit" onClick={handleSubmit}>
                  Submit
                </StyledButton>
              </ButtonGroup>
            </StyledForgotPassword>
          </StyledFormWrapper>
        </StyledContainer>
      )}
    </>
  );
}
