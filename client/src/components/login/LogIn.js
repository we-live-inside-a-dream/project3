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
  const [inputs, setInputs] = useState([{}]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/login", {
        email: inputs.email,
        password: inputs.password,
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
              value={inputs.email || ""}
              onChange={handleChange}
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
              value={inputs.password || ""}
              onChange={handleChange}
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
