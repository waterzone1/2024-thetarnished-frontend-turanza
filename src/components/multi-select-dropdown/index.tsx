import React, { useState } from 'react';
import { DropdownContainer, DropdownHeader, DropdownItem, DropdownList } from './components';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  onSelect: (selected: string[]) => void;
}

 const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options , onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleSelect = (value: string) => {
      const updatedSelectedOptions = selectedOptions.includes(value) ? selectedOptions.filter(option => option !== value) : [...selectedOptions, value];
      setSelectedOptions(updatedSelectedOptions);
      onSelect(updatedSelectedOptions);
    }


  const isSelected = (value: string) => selectedOptions.includes(value);

  return (
    <DropdownContainer>
      <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
        {selectedOptions.length > 0 ? selectedOptions.join(', ') : "Select options"}
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {options.map(option => (
            <DropdownItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              selected={isSelected(option.value)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default MultiSelectDropdown;
