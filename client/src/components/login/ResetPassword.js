import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { passwordValidation } from "./LoginValidation";
import {
  StyledButton,
  StyledResetContainer,
  StyledInput,
  StyledLabel,
  StyledHeading,
  ButtonGroup,
  StyledResetPassword,
} from "./StyledLogIn";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  // const [newPassMessageVal, setNewPassMessageVal] = useState(null);
  const [validatedPassword, setValidatedPassword] = useState();
  const [message, setMessage] = useState();

  const { userId, resetString } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(userId, resetString);
  });
  const handleChange = (event, setter) => {
    const value = event.target.value;
    setter(value);
  };
  // let validation;
  // async function validateForm() {
  //   if (newPassMessageVal) {
  //     console.log("newPassword:", newPassMessageVal);
  //     validation = "Please make sure all fields are filled in properly.";
  //     return validation;
  //   } else console.log("newPassword:", newPassMessageVal);
  //   validation = null;
  //   return validation;
  // }
  // validateForm();
  // console.log("validate form", validation);
  const handleSubmit = async () => {
    // if (newPassword === confirmPassword) {
    //   setValidatedPassword(newPassword);
    // } else {
    //   setMessage("Passwords do not match");
    // }
    let newUserPassword = await axios.post(
      "/api/employeeProfile/resetPassword",
      {
        userId,
        resetString,
        validatedPassword,
      }
    );
    console.log("here");
    let response = newUserPassword.data;
    if (response?.status === "FAILED") {
      console.log("User requesting reset from Email.", response);
      setMessage(response.message);
    } else {
      console.log("Password has been updated successfully.", response);
      setMessage(response.message);
    }
    navigate("/login");
  };
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      console.log("enter was pressed");
      handleSubmit();
    }
  };
  return (
    <StyledResetContainer>
      <StyledResetPassword type="submit">
        <StyledHeading>Reset Password</StyledHeading>
        <StyledLabel>New Password</StyledLabel>
        <StyledInput
          margin="normal"
          required
          fullWidth
          name="newPassword"
          label="New Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={newPassword}
          placeholder="New Password.."
          onChange={(event) => {
            handleChange(event, setNewPassword);
            // setNewPassMessageVal(passwordValidation(event.target.value));
          }}
          onKeyPress={handleKeypress}
        />
        <StyledLabel>Confirm Password</StyledLabel>
        <StyledInput
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={confirmPassword}
          placeholder="Confirm Password.."
          onChange={(event) => {
            handleChange(event, setValidatedPassword);
            // setNewPassMessageVal(passwordValidation(event.target.value));
          }}
          onKeyPress={handleKeypress}
        />
        {message}
        <ButtonGroup>
          <StyledButton id="submit" type="submit" onClick={handleSubmit}>
            Submit
          </StyledButton>
        </ButtonGroup>
      </StyledResetPassword>
    </StyledResetContainer>
  );
};

export default ResetPassword;
