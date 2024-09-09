import styled, {keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const AnimatedLoadingLogo = styled.img`
  width: 20px;
  height: 20px;
  animation: ${rotate} 1s linear infinite;
`;