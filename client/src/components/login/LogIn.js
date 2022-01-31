import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  StyledLogIn,
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
} from "./StyledLogIn";

export default function LogIn({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (event, setter) => {
    const value = event.target.value;
    setter(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/auth/login", {
        email,
        password,
      })
      .then(function (response) {
        if (response.data) setUser(response.data);
        console.log(setUser);
        navigate("/profile");
      });
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
              onChange={(event) => {
                handleChange(event, setEmail);
              }}
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
            />
            <StyledButton type="submit" onClick={handleSubmit}>
              Log In
            </StyledButton>
          </div>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
}
