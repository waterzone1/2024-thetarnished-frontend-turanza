import styled from "styled-components";
import colors from "../../assets/colors";

interface MainContainerProps {
    isPopupOpen: boolean;
}


export const MainContainer =  styled.div<MainContainerProps>`
    height: 100vh ;
    width: 100vw ;
    display: flex;
    align-items: center ;
    background: rgb(43,84,52);
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

export const ProfileCard = styled.div`
    position: relative;
    width: 500px;
    height: 700px;
    background-color: ${colors.secondary};
    display: flex;
    flex-direction: column;
    align-items: center ;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    @media (max-width: 1200px){
        margin-top: 80px;
    }

    @media (max-width: 550px){
        width: 90% ;
    }
`

export const UserImage  = styled.img`
    width: 200px;
    height: 200px;
    margin-top: 80px;
    border-radius: 50%;
    border: 3px solid ${colors.primary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const UserName = styled.h1`
    color: ${colors.primary};
    margin-bottom: 0px;
`

export const UserEmail = styled.h2`
    color: ${colors.primary};
`

export const UserSubjects = styled.div`
    display: flex;
    width: 80%;
    align-items: center;
    justify-content:center ;
    gap: 10px;
`

export const Subject = styled.div`
    display: flex;
    padding: 10px;
    background-color: ${colors.primary};
    border-radius: 10px;
`

export const CardButtons = styled.div`
    position: absolute;
    display: flex;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);

    @media (max-width: 550px){
        flex-direction:column ;
    }
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 500px;
    background-color: ${colors.secondary} ;
    border-radius: 30px ;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

    @media (max-width: 550px){
        width: 90% ;
    }
`

export const FormTitle = styled.h2`
    color: ${colors.primary};
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    z-index: 1;
`;
export const InputText = styled.label`
    font-size: 16px;
    color: ${colors.text};
    margin-bottom: 5px;
`;

export const Input = styled.input`
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid ${colors.primary};
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    background-color: ${colors.secondary};
    color: ${colors.primary} ;

    &:focus {
        box-shadow: 0 0 5px ${colors.primary};
    }
`;

export const ButtonsContainer = styled.div`
    padding-top: 50px;
    display: flex; 
    flex-direction: column ;
`