import { Select } from "@mui/material";
import styled, { css } from "styled-components";

const sharedStyles = css`
  background-color: #eee;
  height: 38px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding-left: 20px;
  box-sizing: border-box;
`;

export const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  align-items: center;
  height: 92vh;
  padding: 0 20px;
`;

export const StyledForm = styled.div`
  display: grid;
  gap: 1em;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;

  width: 100%;
  height: min-content;
  max-width: 700px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  h2 {
    margin-bottom: 30px;
  }
`;

export const StyledInput = styled.input`
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
  height: 38px;
  padding: 0px 20px;
  align-self: flex-end;
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
export const StyledTimeDate = styled.input`
  border: 1px solid #ddd;
  background-color: #eee;
  border-radius: 5px;
  padding: 10px;
  width: 100px;
  min-height: 20px;
  resize: none;
`;
export const StyledCheck = styled.input`
  border: 1px solid #ddd;
  background-color: #eee;
  border-radius: 5px;
  padding: 10px;
  min-width: 5px;
  min-height: 5px;
  resize: none;
`;

// export const Dropdown = styled.select`
//   width: 100%;
//   height: 35px;
//   background: white;
//   color: gray;
//   padding-left: 0px;
//   font-size: 14px;
//   border: groove;
//   margin-left: 0px;

//   option {
//     color: black;
//     background: white;
//     display: flex;
//     white-space: pre;
//     min-height: 20px;
//     padding: 0px 2px 1px;
//   }
// `;

// export const StyledError = styled.div`
//   color: red;
//   font-weight: 800;
//   margin: 0 0 40px 0;
// `;

// export const StyledEmployeeForm = styled.div`
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
//   min-height: 100vh;
//   display: flex;
//   align-items: center;
// `;

// export const StyledForm = styled.div`
//   width: 100%;
//   margin-right: 0%;
//   height: 100%;
//   max-width: 700px;
//   padding: 40px;
//   background-color: #fff;
//   border-radius: 10px;
//   box-sizing: border-box;
//   box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);

// `;
