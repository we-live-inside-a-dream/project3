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
import { ButtonGroup, StyledContainer } from "./LoginStyle";

//icons
import { FiMail, FiLock } from "react-icons/fi";

//formik
import { Formik, Form } from "formik";
import * as Yup from "yup";

//loader
import { ThreeDots } from "react-loader-spinner";

export default function ForgotPassword() {
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
    navigate("/resetpassword");
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
            <Formik
              intialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
                password: Yup.string()
                  .min(8, "Password is too short")
                  .max(15, "Password is too long")
                  .required("Required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
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
                    icon={<FiMail />}
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
                    placeholder="Password.."
                    onChange={(event) => {
                      handleChange(event, setPassword);
                      setPassMessageVal(passwordValidation(event.target.value));
                    }}
                    onKeyPress={handleKeypress}
                    icon={<FiLock />}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <ButtonGroup>
                    {!isSubmitting && (
                      <StyledButton
                        id="submit"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Log In
                      </StyledButton>
                    )}
                    {isSubmitting && (
                      <ThreeDots type="ThreeDots" height={49} width={100} />
                    )}
                  </ButtonGroup>
                </Form>
              )}
            </Formik>
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
