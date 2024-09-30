import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { useEffect, useState } from 'react';

interface Subject {
  subjectid: string;
  subjectname: string;
}

interface MultiAutocompleteInputProps {
  onSelect: (selectedOptions: { id: string; name: string }[]) => void;
  defaultValue?: Subject[];
}

export default function MultiAutocompleteInput({ onSelect, defaultValue = [] }: MultiAutocompleteInputProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const getAllSubjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/subject/all-subjects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    getAllSubjects();
  }, []);

  return (
    <Autocomplete
      multiple
      limitTags={1}
      id="multiple-limit-tags"
      filterSelectedOptions
      options={subjects}
      getOptionLabel={(option: Subject) => option.subjectname}
      defaultValue={defaultValue}
      onChange={(_event, value) => {
        // Crear un array de objetos con id y name
        const selectedSubjects = value.map((option) => ({
          id: option.subjectid,
          name: option.subjectname,
        }));
        onSelect(selectedSubjects); // Pasar el array de objetos a la función onSelect
      }}
      renderTags={(value: Subject[], getTagProps) => (
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            padding: '5px 0',
          }}
        >
          {value.map((option, index) => (
            <Chip
              label={option.subjectname}
              {...getTagProps({ index })}
              style={{ marginRight: 4 }}
            />
          ))}
        </div>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Subjects" placeholder="Add subject..." />
      )}
      sx={{
        maxWidth: 300,
        '& .MuiAutocomplete-listbox': {
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
          },
        },
      }}
      style={{ padding: 10, marginTop: 10 }}
    />
  );
}
