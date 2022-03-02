import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  StyledLogIn,
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledContainer,
  StyledHeading,
  StyledLabel,
  ButtonGroup,
  TextLink,
  LinkContainer,
  ErrorMsg,
  // ErrorMsg,
} from "./StyledLogIn";
import AuthenticationContext from "./AuthenticationContext";
import { emailValidation, passwordValidation } from "./LoginValidation";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailMessageVal, setEmailMessageVal] = useState(null);
  const [passMessageVal, setPassMessageVal] = useState(null);

  let validation;
  async function validateForm() {
    if (emailMessageVal === "" || passMessageVal === "") {
      console.log("email:", emailMessageVal, "password:", passMessageVal);
      validation = "Please make sure all fields are filled in properly.";
      return validation;
    } else console.log("email:", emailMessageVal, "password:", passMessageVal);
    validation = null;
    return validation;
  }
  validateForm();
  console.log("validate form", validation);

  const authContext = useContext(AuthenticationContext);

  const navigate = useNavigate();
  // console.log(authContext);
  const handleChange = (event, setter) => {
    const value = event.target.value;
    setter(value);
  };

  const handleSubmit = async (e) => {
    let response = await axios.post("/api/auth/login", {
      email,
      password,
    });

    let user = response.data;
    console.log("LOG IN", response);
    authContext.logIn(user);
    navigate("/");
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
        <StyledForm type="submit">
          <StyledHeading>Log In</StyledHeading>
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
            placeholder="Email.."
            onChange={(event) => {
              handleChange(event, setEmail);
            }}
          />
          <StyledLabel>Password</StyledLabel>
          <StyledInput
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            placeholder="Password.."
            onChange={(event) => {
              handleChange(event, setPassword);
            }}
            // onSubmit={setPassMessageVal(passwordValidation(password))}
            onKeyPress={handleKeypress}
          />
          {!emailMessageVal ? (
            <ErrorMsg
              style={{
                color: "red",
                fontSize: "12px",
                marginBottom: "0px",
              }}
            ></ErrorMsg>
          ) : null}
          {emailMessageVal ? (
            <ErrorMsg
              style={{
                color: "red",
                fontSize: "12px",
                marginBottom: "0px",
              }}
            >
              {emailMessageVal}
            </ErrorMsg>
          ) : null}
          {!passMessageVal ? (
            <ErrorMsg
              style={{
                color: "red",
                fontSize: "12px",
                marginBottom: "0px",
              }}
            ></ErrorMsg>
          ) : null}
          {passMessageVal ? (
            <ErrorMsg
              style={{
                color: "red",
                fontSize: "12px",
                marginBottom: "0px",
              }}
            >
              {passMessageVal}
            </ErrorMsg>
          ) : null}
          <ButtonGroup>
            <StyledButton id="submit" type="submit" onClick={handleSubmit}>
              Log In
            </StyledButton>
          </ButtonGroup>
          <LinkContainer>
            <TextLink to="/forgotpassword">Forgot Password?</TextLink>
          </LinkContainer>
        </StyledForm>
      </StyledFormWrapper>
    </StyledContainer>
  );
}
