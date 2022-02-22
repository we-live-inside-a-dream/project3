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
} from "./StyledLogIn";
import AuthenticationContext from "./AuthenticationContext";
import { emailValidation, passwordValidation } from "./LoginValidation";
import { StyledContainer } from "./LoginStyle";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailMessageVal, setEmailMessageVal] = useState(null);
  const [passMessageVal, setPassMessageVal] = useState(null);

  let validation;
  async function validateForm() {
    if (emailMessageVal || passMessageVal) {
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
            <h1>Log In</h1>
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
                placeholder="Email.."
                onChange={(event) => {
                  handleChange(event, setEmail);
                  setEmailMessageVal(emailValidation(event.target.value));
                }}
              />
              <label>Password</label>
              {!passMessageVal ? (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginBottom: "0px",
                  }}
                ></p>
              ) : null}
              {passMessageVal ? (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginBottom: "0px",
                  }}
                >
                  {passMessageVal}
                </p>
              ) : null}
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
                  setPassMessageVal(passwordValidation(event.target.value));
                }}
                onKeyPress={handleKeypress}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <StyledButton id="submit" type="submit" onClick={handleSubmit}>
                Log In
              </StyledButton>
              <Grid container>
                <Grid item>
                  <Link to="/forgotpassword">Forgot Password</Link>
                </Grid>
              </Grid>
            </div>
          </StyledForm>
        </StyledFormWrapper>
      </StyledContainer>
  );
}
