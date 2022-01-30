import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
  height: ${(props) => (props.NavbarExtendNavbar ? "100vh" : "100%")};
  background-color: whiteSmoke;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const LeftContainer = styled.div`
  flex: 70%;
  display: flex;
  align-items: center;
  padding-left: 1%;
`;

export const RightContainer = styled.div`
  flex: 30%;
  display: flex;
  justify-content: flex-end;
  padding-left: 50%;

  @media (min-width: 700px) {
    height: 80px;
  }
`;
// export const Logo = styled.image`
//   height: auto;
//   max-width: 200px;
//   margin: 15px;
// `;

export const Logo = styled.img`
  display: flex;
  padding: 0px 0px;
  margin: 0px auto;
  max-width: 50px;
  height: auto;
  background-color: #35a1b9;
`;

export const NavbarExtendedContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
`;

export const NavbarLink = styled(Link)`
  color: #35a1b9;
  font-size: large;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  padding: 0px 5px;
  margin: 0px 5px;

  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarLinkExtended = styled(Link)`
  color: #35a1b9;
  font-size: large;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
`;

export const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  color: white;
  font-size: 45px;
  cursor: pointer;

  @media (min-width: 700px) {
    display: none;
  }
`;

export const NavbarInnerContainer = styled.div`
  /* display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 700px){
        display: none;
    } */
  width: 100%;
  height: 80px;
  display: flex;
`;
