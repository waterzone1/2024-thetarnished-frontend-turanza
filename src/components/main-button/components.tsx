import styled, {css } from "styled-components";
import colors from "../../assets/colors"

interface ButtonProps {
  secondary?: boolean;
  important?: boolean;
}

const buttonStyles = css<ButtonProps>`
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    min-width: 150px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 5px;
    background-color: ${props =>
      props.important ? colors.important :
      props.secondary ? colors.secondary :
      colors.primary};
    border: ${props => props.secondary ? `1px solid ${colors.primary}` : "none"};
    color: ${props => props.secondary ? colors.primary : '#fff'};
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        border-color: ${colors.primary};
        background-color: ${props => props.secondary ? "#cccccc" : "#5b6b76"};
    }
`;
export const Button = styled.button<ButtonProps>`
    ${buttonStyles}
`;