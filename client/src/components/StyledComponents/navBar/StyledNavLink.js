
import styled from "styled-components";
import {Link} from 'react-router-dom'



export const NavbarContainer = styled.nav`
    width: 100%;
    height: ${(props) => (props.NavbarExtendNavbar ? "100vh" : "80px")};
    background-color: black;
    display: flex;
    flex-direction: column;
`;


export const LeftContainer = styled.div`
    flex: 70%;
    display: flex;
    align-items: center;
    padding-left: 5%;
    background-color: red;
`;

export const RightContainer = styled.div`
    flex: 30%;
    display: flex;
    justify-content: flex-end;
    padding-left: 50%;
    background-color: salmon;

    @media (min-width: 700px) {
        height: 80px;
    }
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
    color: white;
    font-size: x-large;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;

    @media (max-width: 700px) {
        display: none;
    }    
`;

export const NavbarLinkExtended = styled(Link)`
    color: white;
    font-size: x-large;
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
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 700px){
        display: none;
    }
`;