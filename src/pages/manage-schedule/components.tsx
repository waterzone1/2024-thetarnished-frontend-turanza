import styled from "styled-components";
import colors from "../../assets/colors";

export const MainContainer = styled.div`
    height: 120vh ;
    width: 100vw ;
    display: flex;
    align-items: center ;
    background: rgb(43,84,52);
    background: radial-gradient(circle, rgba(43,84,52,1) 0%, rgba(15,41,46,1) 92%);
`

export const Content = styled.div`
    width: 90% ;
    height: 100%;
    margin-left: 100px;
    display: flex ;
    flex-direction: column;
    align-items: center ;
    justify-content: center;

    @media (max-width: 1000px){
        margin-left: 0;
        width: 100% ;
    }

    @media (max-width: 850px){
        width: 90% ;
        margin: auto;
    }
`
export const ScheduleContainer = styled.div`
    padding: 50px 50px 20px 50px;
    background-color: ${colors.secondary} ;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 30px ;

    @media (max-width: 1000px){
        margin: auto;
        padding: 5px;
    }
`

export const TableData = styled.td`
    cursor: pointer ;
    width: 100px ;
    height: 50px ;
    text-align: center ;
    box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 8px 0px;
    color: ${colors.secondary} ;
    font-size: 1.5rem ;

    @media (max-width: 500px){
        width: 50px ;
        height: 30px ;
        font-size: 15px;
    }
`
export const ButtonContainer = styled.div`
    display: flex ;
    width: 100% ;
    align-items: center ;
    justify-content: center ;
`