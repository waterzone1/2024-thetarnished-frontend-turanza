import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import colors from "../../assets/colors";

export const SideBar = styled.div`
    
`

export const NavbarContainer = styled.nav`
    background-color: ${colors.secondary} ;
    height: 70%;
    width: 100px;
    display: flex ;
    flex-direction:column;
    align-items: center;
    justify-content:center;
    gap: 8%;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

export const NavbarLink = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 10px;
    background-color: ${colors.primary};
    color: ${colors.secondary};
    border-radius: 5px;
    cursor: pointer;
    font-size: 30px;
    border: none ;
    transition: background-color 0.3s;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    &:hover {
        background-color: #b1dbb5;
        color: ${colors.secondary};
    }
  
    &.active {
      background-color: #b1dbb5;
      border-radius: 5px;
    }
`;

export const LogOutNavbarLink = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 10px;
    background-color: #d16759;
    color: ${colors.secondary};
    border-radius: 5px;
    cursor: pointer;
    font-size: 30px;
    border: none ;
    transition: background-color 0.3s;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    &:hover {
        background-color: #ff9486;
        color: ${colors.secondary};
    }
`;