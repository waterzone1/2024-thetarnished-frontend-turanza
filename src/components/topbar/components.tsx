import styled from "styled-components";
import colors from "../../assets/colors";
import { NavLink } from "react-router-dom";

export const TopbarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 85px;
    background-color: ${colors.secondary};
    display: flex;
    align-items: center;
    justify-content: right;
    z-index: 999;

    @media (min-width: 1000px) {
        display: none;
    }
`

export const MenuWrapper = styled.div`
    height: 100%;
`

export const MenuButton = styled.button`
    font-size: 28px;
    color: ${colors.primary};
    background-color: transparent;
    width: 80px;
    padding: 10px;
    height: 100%;
    border: none;
    border-radius: 0px;

    &:hover {
        cursor: pointer;
        background-color: ${colors.primary};
        color: ${colors.secondary};
    }
`

export const FullMenuContainer = styled.div`
    position: absolute;
    top: 80px;
    width: 100%;
    height: 100vh;
    background-color: ${colors.secondary};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
    z-index: 100;
`

export const FullMenuLink = styled(NavLink)`
    padding: 10px;
    width: 100%;
    text-align: center;
    font-size: 20px;
    color:  ${colors.primary};

    &:hover {
        background-color: ${colors.primary};
        color: ${colors.secondary};
    }

    &.active {
        background-color: ${colors.primary};
        color: ${colors.secondary};
    }
`

export const SingOutLink = styled(NavLink)`
    position: absolute;
    background-color: ${colors.important};
    color: ${colors.secondary};
    padding: 10px;
    width: 100%;
    text-align: center;
    font-size: 20px;
    color:  ${colors.secondary};
    top: 70%;
`