import { useState } from "react";

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

function NavBar() {
  const [extendNavbar, setExtendNavbar] = useState(false);

  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <LogoNavbarLink to="/">
          <Logo src={LogoImg} />
        </LogoNavbarLink>
        <LeftContainer>
          <NavbarLinkContainer extendNavbar={extendNavbar}>
            <NavbarLink to="/schedules">Schedules</NavbarLink>
            <NavbarLink to="/employeeList">Employees</NavbarLink>
            {/* <NavbarLink to="/employeeDetail">Employee Detail</NavbarLink> */}
            <NavbarLink to="/createEmployee">EmpForm</NavbarLink>
            <NavbarLink to="/availabilities">Availabilities</NavbarLink>
            <NavbarLink to='/timeOff'>Time OFF</NavbarLink>
            <NavbarLink to="/login">Login</NavbarLink>
            <NavbarLink to="/logout">Logout</NavbarLink>
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
          <StyledNavButton>LOG IN</StyledNavButton>
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
