import styled from 'styled-components';
import colors from '../../assets/colors';

interface MessageProps {
  success?: boolean;
  error?: boolean;
}

export const Message = styled.div<MessageProps>`
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    top: 10px;
    background-color: ${props =>
      props.success ? colors.primary :
      props.error ? colors.important : colors.primary};
    color: ${colors.secondary};
    text-align: center;
    font-size: 24px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    z-index: 1001;
`;
