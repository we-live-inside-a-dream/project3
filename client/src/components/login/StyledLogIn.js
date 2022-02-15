import styled, { createGlobalStyle, css } from "styled-components";

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

export const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
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
  height: 50vh;
  min-width: 400px;
  max-width: 20vw;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

export const StyledInput = styled.input`
  display: block;
  width: 100%;
  ${sharedStyles}
`;

export const StyledTextArea = styled.textarea`
  background-color: #eee;
  width: 100%;
  min-height: 100px;
  resize: none;
  ${sharedStyles}
`;
export const StyledButton = styled.button`
  display: block;
  /* background-color: #f7797d; */
  background-color: #35a1b9;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0px 20px;
  margin-bottom: 10px;
  margin-top: 10px;
  cursor: pointer;
  box-sizing: border-box;
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

// export const DropdownContainer = styled.div`
//   @media screen and (min-width: 961px) {
//     position: relative;
//   }
// `;

// export const EditFormDropdown = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 80px;
//   background-color: #de2eff;
//   border: none;
//   border-radius: 5px;
//   padding: 15px;
//   font-size: 1.1rem;
//   gap: 0.5rem;
//   cursor: pointer;

//   &:hover {
//     background-color: #8703a0;
//     border: 1px solid #c2c2c2;
//     transition: background 0.3s ease;
//   }
// `;

export const StyledError = styled.div`
  color: red;
  font-weight: 800;
  margin: 0 0 40px 0;
`;
