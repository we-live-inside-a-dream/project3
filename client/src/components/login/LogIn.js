import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  StyledLogIn,
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await axios.post("/api/auth/login", {
      email,
      password,
    });
    let user = response.data;
    console.log("LOG IN", response);
    authContext.logIn(user);
    navigate("/");
  };

  // const handleKeypress = (e) => {
  //   //it triggers by pressing the enter key
  //   if (e.keyCode === 13) {
  //     console.log("enter was pressed");
  //     handleSubmit();
  //   }
  // };

  return (
    <>
      <StyledLogIn />
      <StyledFormWrapper>
        <StyledForm>
          <h1>Log In</h1>
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
              onChange={(event) => {
                handleChange(event, setEmail);
              }}
              // onKeyPress={handleKeypress}
            />
            <label>Password</label>
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
              onChange={(event) => {
                handleChange(event, setPassword);
              }}
              // onKeyPress={handleKeypress}
            />
            <StyledButton
              id="submit"
              type="submit"
              // onKeyPress={handleKeypress}
              onClick={handleSubmit}
            >
              Log In
            </StyledButton>
          </div>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
}
