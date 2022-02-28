import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  StyledLogIn,
  StyledFormWrapper,
  StyledForgotPassword,
  StyledInput,
  StyledButton,
  StyledContainer,
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
    console.log("here");
    let error = response.data;
    if (error?.status === "FAILED") {
      console.log("User requesting reset from Email.", error);
      setMessage(error.message);
    } else {
      console.log("SUCCESS THIS REQUEST");
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
              <h1>Forgot Password</h1>
              <div>
                <label>Email</label>
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
                    // setEmailMessageVal(emailValidation(event.target.value));
                  }}
                  onKeyPress={handleKeypress}
                />
                {message}
                <br />
                <StyledButton id="submit" type="submit" onClick={handleSubmit}>
                  Submit
                </StyledButton>
              </div>
            </StyledForgotPassword>
          </StyledFormWrapper>
        </StyledContainer>
      )}
    </>
  );
}
