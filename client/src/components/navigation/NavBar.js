import { useEffect, useState } from "react";

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

import { useSocket } from "../../components/reusable/context/SocketProvider";
import StyledTableData from "../reusable/tables/StyledTableData";

function NavBar() {
  const [extendNavbar, setExtendNavbar] = useState(false);

  const value = useSocket();
  const unread = value.unread;

  useEffect(() => {
    console.log("socket changed", unread);
  }, [unread]);

  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <LogoNavbarLink to="/">
          <Logo src={LogoImg} />
        </LogoNavbarLink>
        {unread?.length > 0 ? (
          <div
            style={{
              height: "10px",
              width: "10px",
              borderRadius: "50%",
              backgroundColor: "red",
              position: "absolute",
              transformOrigin: "topRight",
              top: "1em",
              right: "10em",
            }}
          />
        ) : null}
        <LeftContainer>
          <NavbarLinkContainer extendNavbar={extendNavbar}>
            {/* <NavbarLink to="/employeeList">Employees</NavbarLink>
            <NavbarLink to="/createEmployee">EmpForm</NavbarLink> */}
            {/* <NavbarLink to="/availabilities">Availabilities</NavbarLink> */}
            <NavbarLink to="/timeOff">Time OFF</NavbarLink>
            <NavbarLink to="viewevents">view events</NavbarLink>
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
          {authContext.user?._id && (
            <Link to="/logout">
              <StyledNavButton>LOG OUT</StyledNavButton>
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
