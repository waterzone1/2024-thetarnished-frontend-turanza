import styled, { keyframes } from "styled-components";
import colors from "../../assets/colors";


export const MainContainer = styled.div`
    height: 100vh ;
    width: 100vw ;
    display: flex;
    align-items: center ;
    background: rgb(43,84,52);
    background: radial-gradient(circle, rgba(43,84,52,1) 0%, rgba(15,41,46,1) 92%);
`

export const Content = styled.div`
    width: 90% ;
    height: 100% ;
    margin-left: 100px;
    display: flex ;
    flex-direction: column;
    align-items: center ;
    justify-content: center;
`

export const ContentTitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: ${colors.secondary};
    margin-bottom: 20px;
`;

export const CardsWrapper = styled.div`
    display: grid;
    grid-template-columns: 230px 230px 230px;
    gap: 30px;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 40px;
`;

interface CardProps {
  isSkeleton?: boolean;
}

export const Card = styled.div<CardProps>`
  width: 200px;
  height: 150px;
  border-radius: 8px;
  background-color: ${({ isSkeleton }) => (isSkeleton ? "" : "#fff")};
  border: 1px solid ${({ isSkeleton }) => (isSkeleton ? " white" : "#ccc")};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: ${({ isSkeleton }) => (isSkeleton ? "none" : "0 4px 8px rgba(0, 0, 0, 0.1)")};
  cursor: ${({ isSkeleton }) => (isSkeleton ? "default" : "pointer")};
  text-align: center ;

  &:hover {
    transform: ${({ isSkeleton }) => (isSkeleton ? "none" : "translateY(-5px);")};
    box-shadow: ${({ isSkeleton }) => (isSkeleton ? "none" : "0 8px 16px rgba(0, 0, 0, 0.2);")};
  }
`;

export const CardSubject = styled.div`
  font-size: 25px;
  color: ${colors.primary};
  font-weight: 500;
`;

export const ImageContainer = styled.div`
    position: absolute ;
    right: 20px;
    bottom: 20px;
`

export const Image = styled.img`
    width: 60px;
    height: 60px;
`

export const Arrow = styled.div<{ direction: string }>`
  position: absolute;
  top: 50%;
  ${({ direction }) => (direction === 'left' ? 'left: 10px;' : 'right: 10px;')}
  cursor: pointer;
  font-size: 2rem;
  user-select: none;
  transform: translateY(-50%);
  z-index: 1;

  &:hover {
    color: #333;
  }
`;

const pulse = keyframes`
  0% {
      background-color: transparent;
      opacity: 0.1;
  }
  50% {
      background-color: #adadad;
      opacity: 0.2;
  }
  100% {
      background-color: #939393;
      opacity: 0.3;
  }
`;

export const SkeletonCard = styled.div`
  width: 200px;
  height: 150px;
  border-radius: 8px;
  background-color: #e0e0e0;
  animation: ${pulse} 1.5s infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  text-align: center;
`;


export const SubjectSearchInput = styled.input`
  width: 250px;
  padding: 15px;
  background: ${colors.secondary};
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: ${colors.primary};
`