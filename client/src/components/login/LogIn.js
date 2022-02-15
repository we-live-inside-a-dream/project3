import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import {
  StyledLogIn,
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledError,
} from "./StyledLogIn";
import AuthenticationContext from "./AuthenticationContext";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const authContext = useContext(AuthenticationContext);

  const navigate = useNavigate();
  // console.log(authContext);
  const handleChange = (event, setter) => {
    setEmailError("");
    setPasswordError("");
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
              placeholder="Email..."
              onChange={(event) => {
                handleChange(event, setEmail);
              }}
            />
            {emailError && <StyledError>{emailError}</StyledError>}

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
              placeholder="Password..."
              onChange={(event) => {
                handleChange(event, setPassword);
              }}
              onKeyPress={handleKeypress}
            />
            {passwordError && <StyledError>{passwordError}</StyledError>}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <StyledButton id="submit" type="submit" onClick={handleSubmit}>
              Log In
            </StyledButton>
            <Grid container>
              <Grid item>
                <Link to="#">Forgot Password</Link>
              </Grid>
            </Grid>
          </div>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
}
