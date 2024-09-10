import styled from 'styled-components';

const SkeletonCardWrapper = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    height: 80px;
    width: 100%;
    margin: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    display: flex;
    align-items: center;
    justify-content: center;

    @keyframes pulse {
        0% {
            background-color: #f0f0f0;
        }
        50% {
            background-color: #e0e0e0;
        }
        100% {
            background-color: #f0f0f0;
        }
    }
`;

const SkeletonCard = () => {
    return <SkeletonCardWrapper />;
};

export default SkeletonCard;
