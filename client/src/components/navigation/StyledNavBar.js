import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
  height: ${(props) => (props.NavbarExtendNavbar ? "100vh" : "100%")};
  background-color: var(--navBackground);
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const LeftContainer = styled.div`
  flex: 70%;
  display: flex;
  align-items: flex-start;
  padding-left: 1%;
`;

export const RightContainer = styled.div`
  flex: 30%;
  display: flex;
  justify-content: flex-end;

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
  max-width: 65px;
  height: auto;
  background-color: #35a1b9;
  &:hover {
    cursor: pointer;
  }
`;
export const MessageLogo = styled.img`
  display: flex;
  padding: 0px 0px;
  margin: 0px auto;
  max-width: 65px;
  height: auto;
  /* background-color: */
  &:hover {
    cursor: pointer;
  }
`;

export const NavbarExtendedContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
  align-content: center;
`;
export const LogoNavbarLink = styled(Link)`
  width: 80px;
  &:hover {
    cursor: pointer;
  }
`;

export const NavbarLink = styled(Link)`
  color: var(--navColorTitle);
  font-size: large;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  padding: 10px 5px;
  margin: 5px 5px;

  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarLinkExtended = styled(Link)`
  color: var(--navColorTitle);
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
  height: 60px;
  display: flex;
`;
export const StyledNavButton = styled.button`
  height: 35px;
  width: 70px;
  background-color: var(--loginButtonMain);
  border: 3px solid var(--loginButtonMain);
  color: var(--headerWhiteFont);
  border-radius: 5px;
  margin: 10px 10px 0px 10px;
  &:hover {
    cursor: pointer;
    background-color: var(--loginButtonHoverBackground);
    border: 2px solid var(--loginButtonHoverBorder);
  }
  &:active {
    /* background-color: #3e8e41; */
    box-shadow: 0 1px #666;
    transform: translate(5% 5%);
  }
`;
export const StyledAvatarButton = styled(Link)`
  background-color: grey;
  height: 2.8rem;
  width: 2.8rem;
  margin: 3px 10px;
  border-radius: 50%;
  color: white;
  font-size: 2.2rem;
  text-align: center;
  border: 3px solid var(--nameIconBorder);
  &:hover {
    cursor: pointer;
    border: 3px solid var(--nameIconBorderHover);
  }
`;
