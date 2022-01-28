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
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  function tryLogin() {
    async function postLogin() {
      const loginInfo = {
        username: email,
        password: password,
      };
      let loginResult = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      if (loginResult.ok) {
        // alert('Hello: '+username)
        setLoginError("");
        navigate("/");
      } else {
        setLoginError("Login failed!");
      }
    }
    postLogin();
  }
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
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
            />
            <StyledButton onClick={tryLogin}>Log In</StyledButton>
            {loginError !== "" && (
              <div className="alert alert-danger">{loginError}</div>
            )}
          </div>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
}
