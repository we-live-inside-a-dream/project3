import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  StyledLogIn,
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledResetInput,
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

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            placeholder="user@email.com"
            onChange={(event) => {
              handleChange(event, setEmail);
            }}
            onKeyPress={handleKeypress}
          />
          <StyledLabel>Password</StyledLabel>
          <StyledResetInput
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            placeholder="********"
            onChange={(event) => {
              handleChange(event, setPassword);
            }}
            onKeyPress={handleKeypress}
          />
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
