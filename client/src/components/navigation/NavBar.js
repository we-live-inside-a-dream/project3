import { useContext, useEffect, useState } from "react";

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
import LogoImg from "../assets/Day2DayLogo.gif";
import { Link } from "react-router-dom";
import AuthenticationContext from "../login/AuthenticationContext";
import { useSocket } from "../../components/reusable/context/SocketProvider";

function NavBar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const [picture, setPicture] = useState();

  const value = useSocket();
  const unread = value.unread;
  const authContext = useContext(AuthenticationContext);
  let user = authContext.user;

  useEffect(() => {
    // setPicture;
  }, []);

  useEffect(() => {
    console.log("socket changed", unread);
  }, [unread]);

  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <LogoNavbarLink to="/">
          <Logo src={LogoImg} />
        </LogoNavbarLink>

        {/* {unread?.length > 0 ? (
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
        ) : null} */}
        <LeftContainer>
          <NavbarLinkContainer
            extendNavbar={extendNavbar}
          ></NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          {authContext.user?._id && (
            <Link to="/logout">
              <StyledNavButton>LOG OUT</StyledNavButton>
            </Link>
          )}
          {/* {`${availability?.firstName}.jpg`} */}
          <StyledAvatarButton to={"/profile"}>
            <img
              // src={"/images/" + imageUrl}
              src={`/images/${user?.firstName}.jpg`}
              alt={user?.firstName}
              style={{
                width: "2.9rem",
                height: "2.9rem",
                margin: "0px",
                borderRadius: "50%",
              }}
              // style={{ backgroundPosition: "center" }}
            />
          </StyledAvatarButton>
        </RightContainer>
      </NavbarInnerContainer>
    </NavbarContainer>
  );
}

export default NavBar;
