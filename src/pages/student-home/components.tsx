import styled from "styled-components";
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
    grid-template-columns: 300px 300px 300px;
    gap: 20px;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 40px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column ;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 200px;
  height: 150px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const CardIcon = styled.div`
  font-size: 40px;
  color: ${colors.primary};
  margin-bottom: 8px;
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