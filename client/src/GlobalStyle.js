import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: whitesmoke;
    height: 100%;
    margin: 0;
    color: #555;
  }
    ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: white;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #98c6ca;
  border-radius: 20px;
  background-color: #98c6ca;
  } 
 *{
      padding: 0;
  }
 
`;

export default GlobalStyle;
