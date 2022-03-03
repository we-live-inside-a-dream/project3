import styled, { createGlobalStyle, css } from "styled-components";

//background
import background from "../assets/vector-bg.jpg";
import { Link } from "react-router-dom";

export const colors = {
  dark1: "#000000",
  darkTeal: "#4488AB",
  darkPurple: "indigo",
  darkCharcoal: "#282c34",
  torquoise: "#1fb6fb",
  blue: "#1484b6",
  darkblue: "#0b4661",
  teal: "#18a6e8",
  darkTeal2: "#07889b",
  red: "#DC2626",
};

export const StyledLogIn = createGlobalStyle`
  html {
    height: 100%
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    ${"" /* background: linear-gradient(to bottom, #f05053, #e1eec3); */}
    background: "var(--appBackground)";
    height: 100%;
    margin: 0;
    color: #555;
  }
`;

export const StyledContainer = styled.div`
  margin: 0;
  min-height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${background});
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: left;
`;

export const StyledTitle = styled.div`
  font-size: ${(props) => props.size}px;
  text-align: center;
  color: ${(props) => (props.color ? props.color : colors.dark1)};
  padding: 5px;
  margin-bottom: 20px;
`;

export const StyledSubtitle = styled.p`
  font-size: ${(props) => props.size}px;
  text-align: center;
  color: ${(props) => (props.color ? props.color : colors.primary)};
  padding: 5px;
  margin-bottom: 25px;
`;

export const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 10px 0;
  box-sizing: border-box;
`;

export const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  padding: 0 20px;
`;

export const StyledForm = styled.div`
  width: 100%;
  height: 45vh;
  min-width: 350px;
  max-width: 20vw;
  padding: 20px 50px 20px 50px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 15px 30px 30px 30px rgba(0, 0, 0, 0.2);
`;

export const StyledInput = styled.input`
  display: block;
  width: 100%;
  background-color: #eee;
  height: 38px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 15px 0;
  padding-left: 20px;
  box-sizing: border-box;
`;

export const StyledTextArea = styled.textarea`
  background-color: #eee;
  width: 100%;
  min-height: 100px;
  resize: none;
  ${sharedStyles}
`;
export const StyledButton = styled.button`
  /* background-color: #f7797d; */
  background-color: ${colors.blue};
  justify-content: center;
  color: #fff;
  font-size: 17px;
  border: 0;
  border-radius: 20px;
  height: 40px;
  padding: 0px 20px;
  margin-bottom: 20px;
  margin-top: 15px;
  margin-left: 40px;
  margin-right: 40px;
  box-sizing: border-box;
  transition: ease-in-out 0.2s;
  bottom: 0px;

  &:hover {
    background-color: ${colors.darkblue};
    color: ${colors.theme};
    font-weight: 600;
    cursor: pointer;
  }
`;

export const StyledFieldset = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;
  legend {
    padding: 0 10px;
  }
  label {
    padding-right: 20px;
  }
  input {
    margin-right: 10px;
  }
`;

export const Dropdown = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 0px;
  font-size: 14px;
  border: groove;
  margin-left: 0px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

export const StyledError = styled.div`
  color: red;
  font-weight: 800;
  margin: 0 0 40px 0;
`;

export const StyledForgotPassword = styled.div`
  min-width: 350px;
  max-width: 20vw;
  height: 35vh;
  padding: 20px 50px 20px 50px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 15px 15px 30px 15px rgba(0, 0, 0, 0.2);
`;

export const StyledResetPassword = styled.div`
  min-width: 350px;
  max-width: 20vw;
  height: 40vh;
  padding: 20px 50px 20px 50px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 15px 15px 30px 15px rgba(0, 0, 0, 0.2);
`;

export const StyledFormButton = styled.button`
  padding: 10px;
  width: 150px;
  background-color: transparent;
  font-size: 16px;
  border: 2px solid;
  border-radius: 25px;
  transition: ease-in-out 0.2s;
  outline: 0;

  &:hover {
    background-color: ${colors.primary};
    font-weight: bold;
    cursor: pointer;
  }
`;

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  width: 30vw;
  padding: 0 10px;
  background-color: #ffffff;
`;

export const StyledBox = styled.div`
  width: 100%;
  height: 30vh;
  min-width: 400px;
  max-width: 50vw;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

export const StyledResetContainer = styled.div`
  margin: 0;
  min-height: 90vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${background});
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: left;
`;

export const ErrorMsg = styled.div`
  font-size: 13px;
  color: ${colors.red};
  margin-top: 15px;
  margin-bottom: 10px;
  text-align: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 25px;
`;

export const LinkContainer = styled.div`
  text-align: center;
  margin: auto;
  margin-top: 25px;
  margin-left: auto;
  margin-right: auto;
`;

export const StyledLabel = styled.p`
  color: ${colors.dark1};
  text-align: left;
  font-size: 18px;
  font-weight: normal;
  margin: 5px;
`;

export const StyledHeading = styled.h1`
  color: ${colors.dark1};
  text-align: center;
  font-size: 30px;
  font-weight: bold;
`;

export const TextLink = styled(Link)`
  text-decoration: none;
  color: ${colors.dark1};
  transition: ease-in-out 0.3s;

  &:hover {
    text-decoration: underline;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${colors.blue};
  }
`;

export const Logo = styled.div`
  width: 85px;
  height: 85px;
  border-radius: 50px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  margin: auto;
`;
