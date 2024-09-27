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

    @media (max-width: 1000px){
        height: 100%;
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

    @media (max-width: 1000px){
        margin-left: 0;
        width: 100% ;
        margin-top: 100px;
    }
`

export const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 90%;
    max-height: 800px;
    overflow-y: auto;
    align-items: center;
    justify-content: center;

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
`

export const TeacherCard = styled.div`
    position: relative;
    background-color: white;
    padding: 10px 50px 10px 50px;
    border-radius: 10px;
    width: 90%;
`

export const TeacherInfo = styled.div`
    display: flex;
    color: ${colors.primary};
`

export const TeacherName = styled.h2`
    color: ${colors.primary};
    padding-bottom: 0;
    margin-bottom: 0;
`

export const ButtonContainer = styled.div`
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
`

export const SearchBar = styled.input`
    width: 300px;
    height: 30px;
    padding: 10px;
    background-color: ${colors.secondary};
    margin-bottom: 20px;
    border-radius: 5px;
    border: none;
    font-size: 1.1rem;
    color: ${colors.primary};
`