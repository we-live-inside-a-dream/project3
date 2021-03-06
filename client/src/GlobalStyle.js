import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

   :root {
  --mainHeader: #E37222;
  --accentColorTitle: #07889B;
  --navColorTitle: #07889B;
  --lightTangerine: #eeaa78;
  --loginButtonMain:  #E37222;
  --loginButtonHoverBackground: #66b9bf;
  --loginButtonHoverBorder:  #eeaa78;
  --styledButtonBackground: #07889B;
  --styledButtonHoverBackground: #E37222;
  --styledButtonHoverBorder: #eeaa78;
  --styledButtonGroupBorder:  #66b9bf;
  --dashGridBoxBackground: white;
  --nameIconBorder: #E37222;
  --nameIconBorderHover:  #eeaa78;
  --appBackground: whitesmoke;
  --navBackground: whitesmoke;
  --white: #ffffff;
  --headerWhiteFont:  #ffffff;
  --headerBlackFont: #000000;
  --styledPage: #ffffff;
  --scrollThumb: #98c6ca;
  --scheduleTimeBar: #66b9bf;
  --lightSelectBackground: #ffffff;
  --darkSelectBackground: #000000;
  --transparent: rgba(255, 255, 255, 0);
  --tableBackground: #ffffff;
  --tableFont: #545454;
  } 

  :root {
  --mainHeader: #3f87c7;
  //--accentColorTitle: #2f2f30;
  --accentColorTitle:#063970;
  --navColorTitle: #063970;
  --lightTangerine: #99ccfa;
  --loginButtonMain: #579ddc;
  --loginButtonHoverBackground: #99ccfa;
  --loginButtonHoverBorder:  #99ccfa;
  --styledButtonBackground: #063970;
  --styledButtonHoverBackground: #3f87c7;
  --styledButtonHoverBorder: #99ccfa;
  --styledButtonGroupBorder:  #99ccfa;
  --dashGridBoxBackground: white;
  --nameIconBorder: #3f87c7;
  --nameIconBorderHover:  #99ccfa;
  --appBackground: #f8fcff;
  --navBackground: #1d639d;
  --white: #ffffff;
  --headerWhiteFont:  #ffffff;
  --headerBlackFont: #000000;
  --styledPage: #ffffff;
  --scrollThumb: #d3d3d3;
  --scheduleTimeBar: #1a578e;
  --lightSelectBackground: #ffffff;
  --darkSelectBackground: #000000;
  --transparent: rgba(255, 255, 255, 0);
  --tableBackground: #ffffff;
  --tableFont: #545454;
  } 
  





${
  "" /* 
 :root {
  --mainHeader: #0e8bad;
  --accentColorTitle: #0e8bad;
  --navColorTitle: #43a5bf;
  --loginButtonMain:  #0e8bad;
  --loginButtonHoverBackground: #66b9bf;
  --loginButtonHoverBorder:  #eeaa78;
  --styledButtonBackground: #0e8bad;
  --styledButtonHoverBackground: #56afc7;
  --styledButtonHoverBorder: #56afc7;
  --styledButtonGroupBorder:  #56afc7;
  --dashGridBoxBackground: white;
  --nameIconBorder:  #56afc7;
  --nameIconBorderHover: #56afc7;
  --appBackground: #3f4145;
  --navBackground: #282c34;
  --white: #ffffff;
  --headerWhiteFont:  #ffffff;
  --headerBlackFont: #000000;
  --styledPage: rgb(247, 247, 247);
  --scrollThumb: #12b8e6;
  --scheduleTimeBar: #56afc7;
  --lightSelectBackground: #ffffff;
  --darkSelectBackground: #000000;
  --transparent: rgba(255, 255, 255, 0);
  --tableBackground: #ffffff;
  --tableFont: #545454;
} 
} */
}
// purple #8860d0;
// neutral #c1c8e4;
// light blue #5ab9ea;
// turquoise #84ceeb;
// blue #5680e9
// dark turquoise #12b8e6


  "" /* :root {
  --mainHeader: #5680e9;
  --accentColorTitle: #12b8e6;
  --navColorTitle: white;
  --loginButtonMain:  #5680e9;
  --loginButtonHoverBackground: #5ab9ea;
  --loginButtonHoverBorder:  #5680e9;
   --styledButtonBackground: #84ceeb;
  --styledButtonHoverBackground: #12b8e6;
  --styledButtonHoverBorder: #84ceeb;
  --styledButtonGroupBorder:  #84ceeb;
  --dashGridBoxBackground: white;
  --nameIconBorder:  #56afc7;
  --nameIconBorderHover: #56afc7;
  --appBackground: #c1c8e4;
  --navBackground: #8860d0;
  --white: #ffffff;
  --headerWhiteFont:  #ffffff;
  --headerBlackFont: #000000;
  --styledPage: white;
  --scrollThumb: #12b8e6;
  --scheduleTimeBar: #84ceeb;
  --lightSelectBackground: #ffffff;
  --darkSelectBackground: #000000;
  --transparent: rgba(255, 255, 255, 0);
  --tableBackground: #ffffff;
  --tableFont: #545454;
} */ */}
}



  html {
    height: 100%
  }
  body {
     ${"" /* font-family: Arial, Helvetica, sans-serif; */}
     font-family: "Roboto", sans-serif; 

    background-color: var(--appBackground);
    height: 100%;
    margin: 0;
    color: #555;
  }
    ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: white;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--scrollThumb);
  background-color: var(--scrollThumb);
  } 
 *{
      padding: 0;
  }
 
`;

export default GlobalStyle;
