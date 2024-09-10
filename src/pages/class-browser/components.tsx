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
    background: radial-gradient(circle, rgba(43,84,52,1) 0%, rgba(15,41,46,1) 92%);

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
    margin-left: 100px;
    display: flex ;
    flex-direction: column;
    align-items: center ;
    justify-content: center;
`

export const BrowserWrapper = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    max-height: 800px;
    overflow-y: auto;
    flex-wrap: wrap;

    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background: white;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #e0e0e0;
    }

    scrollbar-width: thin;
    scrollbar-color: white transparent;
`;


export const Card = styled.div`
    width: 100%;
    background-color: ${colors.secondary} ;
    border-radius: 8px;
    height: 80px;
    margin: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: flex-start;
    transition: background-color 0.3s;
    cursor: pointer ;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

export const CardInfo = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    padding: 0 20px 0 20px;
    align-items: center;
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

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
`


export const LoadingSkeletonCard = styled.div`
    width: 100%;
    height: 80px;
    background-color: #e0e0e0;
    border-radius: 8px;
    border: 1px solid ${colors.secondary} ;
    margin: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    animation: pulse 1.5s infinite ease-in-out;
    
    @keyframes pulse {
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
    }
`;

export const StaticSkeletonCard = styled.div`
    width: 100%;
    height: 80px;
    border: 1px solid ${colors.secondary} ;
    border-radius: 8px;
    margin: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const Select = styled.select`
    background-color: transparent ;
    border: 1px solid ${colors.primary} ;
    border-radius: 5px;
    padding: 10px;
    color: ${colors.primary};
`

export const InputsContainer = styled.div`
    display: flex ;
    flex-direction: column ;
    width: 50%;
    gap: 10px;
    margin-bottom: 10px;
`