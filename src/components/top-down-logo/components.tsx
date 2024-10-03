import styled from "styled-components"

export const ImageContainer = styled.div`
    position: absolute ;
    right: 20px;
    bottom: 20px;
    @media (max-width: 1000px) {  
        display: none;
    }
`

export const Image = styled.img`
    width: 60px;
    height: 60px;
`
