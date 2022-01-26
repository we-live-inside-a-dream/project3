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
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/logIn", {
        email: inputs.email,
        password: inputs.password,
      })
      .then(function (response) {
        if (response.data) setUser(response.data);
        navigate("/profile");
        console.log(response);
      });
  };
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [loginError, setLoginError] = useState("");

  // const navigate = useNavigate()

  // function tryLogin() {
  //   async function postLogin() {
  //     const loginInfo = {
  //       username: email,
  //       password: password,
  //     };
  //     let loginResult = await fetch("/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(loginInfo),
  //     });
  //     if (loginResult.ok) {
  //       // alert('Hello: '+username)
  //       setLoginError("");
  //       navigate("/");
  //     } else {
  //       setLoginError("Login failed!");
  //     }
  //   }
  //   postLogin();
  // }
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
            <StyledButton onClick={handleSubmit}>Log In</StyledButton>
          </div>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
}
