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
import { emailValidation } from "./LoginValidation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailMessageVal, setEmailMessageVal] = useState(null);

  let validation;
  async function validateForm() {
    if (emailMessageVal) {
      console.log("email:", emailMessageVal);
      validation = "Please make sure all fields are filled in properly.";
      return validation;
    } else console.log("email:", emailMessageVal);
    validation = null;
    return validation;
  }
  validateForm();
  console.log("validate form", validation);

  // console.log(authContext);
  const handleChange = (event, setter) => {
    const value = event.target.value;
    setter(value);
  };

  const handleSubmit = async (e) => {
    let response = await axios.post("/api/employeeProfile/requestPasswordReset", {
      email,
    });
    let userEmail = response.data;
    console.log("User requesting reset from Email.", response)
    
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      console.log("enter was pressed");
      handleSubmit();
    }
  };

  return (
    <StyledContainer>
      <StyledLogIn />
      <StyledFormWrapper>
        <StyledForgotPassword type="submit">
          <h1>Forgot Password</h1>
          <div>
            <label>Email</label>
            {!emailMessageVal ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0px",
                }}
              ></p>
            ) : null}
            {emailMessageVal ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0px",
                }}
              >
                {emailMessageVal}
              </p>
            ) : null}
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
                setEmailMessageVal(emailValidation(event.target.value));
              }}
              onKeyPress={handleKeypress}
            />
            <StyledButton id="submit" type="submit" onClick={handleSubmit}>
              Submit
            </StyledButton>
          </div>
        </StyledForgotPassword>
      </StyledFormWrapper>
    </StyledContainer>
  );
}
