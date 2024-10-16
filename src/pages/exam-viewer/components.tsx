import styled from "styled-components";
import colors from "../../assets/colors";

export const MainContainer =  styled.div`
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

    @media (max-width: 1000px){
        margin-left: 0;
        width: 100% ;
    }
`

export const ExamCard = styled.div`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  width: 300px;
  margin: 15px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ExamTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 10px;
`;

export const ExamInfo = styled.p`
  font-size: 1rem;
  margin-bottom: 5px;
`;
