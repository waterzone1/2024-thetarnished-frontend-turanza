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
    margin-left: 100px;
    display: flex ;
    flex-direction: column;
    align-items: center ;
    justify-content: center;

    @media (max-width: 1000px) {  
        margin: auto;
    }
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
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 40px;
`;

export const CardsTitle = styled.h3`
    font-size: 20px;
    font-weight: bold;
    color: ${colors.secondary};
    margin-bottom: 15px;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: 8px;
    background-color: ${colors.secondary};
    padding: 20px;
    border: 1px solid ${colors.primary};
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

    &:hover {
        opacity: 0.8;
    }
`

export const CardSubject = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: ${colors.primary};
`;

export const CardStudent = styled.p`
    font-size: 14px;
    color: ${colors.primary};
`;

export const CardDate = styled.p`
    font-size: 14px;
    color: ${colors.primary};
    font-style: italic;
    text-align: right ;
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