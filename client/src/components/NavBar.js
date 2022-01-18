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
  //   Logo,
} from "./StyledComponents/NavBar/StyledNavBar";
// import LogoImage from "../../public/assets/calendar-icon.png";
import Logo from "./circle-calendar1.png";

function NavBar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
  return (
    <NavbarContainer>
      {""}
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer extendNavbar={extendNavbar}>
            <img
              src={Logo}
              alt="calendar logo"
              style={{
                height: "65px",
                width: "65px",
                backgroundColor: "black",
                margin: "auto",
              }}
            ></img>
            <NavbarLink to="/">Home</NavbarLink>
            <NavbarLink to="/employeeList">Employees</NavbarLink>
            <NavbarLink to="/dayView">Schedule</NavbarLink>
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <> &#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>

        <RightContainer> {/* <Logo src={LogoImage}></Logo> */}</RightContainer>
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
