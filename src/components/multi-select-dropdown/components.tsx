import styled from 'styled-components';
import colors from '../../assets/colors';

export const DropdownContainer = styled.div`
  width: 300px;
  position: relative;
  font-family: Arial, sans-serif;
`;

export const DropdownHeader = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid ${colors.primary};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: ${colors.primary};
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 45px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const DropdownItem = styled.li<{ selected: boolean }>`
  padding: 10px;
  background-color: ${({ selected }) => (selected ? `${colors.primary}` : '#fff')};
  color: ${({ selected }) => (selected ? `${colors.secondary}` : `${colors.primary}`)};
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.secondary}
  }
`;
