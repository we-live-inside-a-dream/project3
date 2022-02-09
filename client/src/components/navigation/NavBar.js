import { useContext, useState } from "react";

import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarInnerContainer,
  NavbarExtendedContainer,
  NavbarLinkContainer,
  NavbarLink,
  NavbarLinkExtended,
  OpenLinksButton,
  Logo,
  LogoNavbarLink,
  StyledNavButton,
  StyledAvatarButton,
} from "./StyledNavBar";
import LogoImg from "./logo.png";
import { Link } from "react-router-dom";
import AuthenticationContext from "../login/AuthenticationContext";

function NavBar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const authContext = useContext(AuthenticationContext);
  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <LogoNavbarLink to="/">
          <Logo src={LogoImg} />
        </LogoNavbarLink>
        <LeftContainer>
          <NavbarLinkContainer extendNavbar={extendNavbar}>
            {/* <NavbarLink to="/employeeList">Employees</NavbarLink>
            <NavbarLink to="/createEmployee">EmpForm</NavbarLink> */}
            {/* <NavbarLink to="/availabilities">Availabilities</NavbarLink> */}
            <NavbarLink to="/timeOff">Time Off</NavbarLink>
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <> &#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          {authContext.user && (
            <Link to="/logout">
              <StyledNavButton>LOG OUT</StyledNavButton>
            </Link>
          )}
          {!authContext.user && (
            <Link to="/login">
              <StyledNavButton>LOG IN</StyledNavButton>
            </Link>
          )}
          <StyledAvatarButton />
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to="/">Home</NavbarLinkExtended>
          <NavbarLinkExtended to="/employeeList">
            Employee List
          </NavbarLinkExtended>
          <NavbarLinkExtended to="/dayView">
            Schedule Day View
          </NavbarLinkExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default NavBar;
