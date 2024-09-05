import styled from "styled-components";
import colors from "../../assets/colors";

interface MainContainerProps {
    isPopupOpen: boolean;
}

export const MainContainer = styled.div<MainContainerProps>`
    position: relative;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    background: rgb(43,130,51);
    background: radial-gradient(circle, rgba(43,130,51,1) 0%, rgba(15,41,46,1) 84%);

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: ${({ isPopupOpen }) => (isPopupOpen ? 1 : 0)};
        transition: opacity 0.3s ease;
        pointer-events: none;
        backdrop-filter: blur(5px);        
    }
`;

export const Content = styled.div`
    width: 90% ;
    height: 100% ;
    display: flex ;
    flex-direction: column;
    align-items: center ;
    justify-content: center;
`

export const BrowserWrapper = styled.div`
    width: 70%;
    display: flex ;
    flex-direction: column;
    align-items: center ;
    justify-content: center;
    background-color: ${colors.secondary};
    border-radius: 30px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 50px;
`
export const Card = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: flex-start;
    width: 90% ;
    transition: background-color 0.3s;
    cursor: pointer ;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    &:hover {
        background-color: #95b0c2;
    }
`;

export const CardLeftContainer = styled.div`
    flex: 1;
`

export const CardRightContainer = styled.div`
    flex: 1;
`

export const Title = styled.h2`
    font-size: 1.5rem;
    margin: 0;
    color: ${colors.primary};
`;

export const Instructor = styled.p`
    font-weight: bold;
    color: ${colors.primary};
`;

export const Description = styled.p`
    margin: 10px 0;
`;

export const Details = styled.p`
    font-size: 0.9rem;
    color: #555;
`;

export const PopUpContainer = styled.div`
    z-index: 1000; 
    position: fixed;
    width: 100vw ;
    height: 100vh;
`

export const PopUp = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 50px;
    border-radius: 8px;
    z-index: 1000; 
    color: ${colors.primary};
    border: 2px solid #ccc;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`