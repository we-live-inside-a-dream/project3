import { useEffect, useState } from "react";
import axios from "axios";
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
} from "./StyledNavBar";
import LogoImg from "../../assets/logo.png";

function NavBar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const [setUser] = useState();
  useEffect(() => {
    axios.post("/user/loggedInUser").then(function (response) {
      if (response.data) {
        setUser(response.data);
        console.log(response);
      }
    });
  }, []);
  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <LeftContainer>
          <Logo src={LogoImg}></Logo>
          <NavbarLinkContainer extendNavbar={extendNavbar}>
            {/* <img
              src={Logo}
              alt="calendar logo"
              style={{
                height: "65px",
                width: "65px",
                backgroundColor: "black",
                margin: "auto",
              }}
            ></img> */}
            <NavbarLink to="/">Home</NavbarLink>
            <NavbarLink to="/employeeList">Employees</NavbarLink>
            <NavbarLink to="/createEmployee">Employee Form</NavbarLink>
            <NavbarLink to="/dayView">Schedule day</NavbarLink>
            <NavbarLink to="/weekView">Schedule week</NavbarLink>
            <NavbarLink to="/availabilities">Availabilities</NavbarLink>
            <NavbarLink element={{ setUser }} to="/logIn">
              Log In
            </NavbarLink>
            <NavbarLink element={{ setUser }} to="/logOut">
              Log Out
            </NavbarLink>
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
