import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

interface Subject {
  id: number;
  name: string;
}

interface MultiAutocompleteInputProps {
  onSelect: (selectedOptions: number[]) => void;
}

export default function MultiAutocompleteInput({
  onSelect,
}: MultiAutocompleteInputProps) {
  return (
    <Autocomplete
      multiple
      limitTags={1}
      id="multiple-limit-tags"
      filterSelectedOptions
      options={subjects}
      getOptionLabel={(option: Subject) => option.name}
      defaultValue={[]}
      onChange={(_event, value) => {
        const selectedTitles = value.map((option) => option.id);
        onSelect(selectedTitles);
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
              label={option.name}
              {...getTagProps({ index })}
              style={{ marginRight: 4 }}
            />
          ))}
        </div>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Subjects" placeholder="Add subject..." />
      )}
      sx={{maxWidth: 300,
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


const subjects: Subject[] = [
  { id: 1, name: 'Mathematics' },
  { id: 2, name: 'Physics' },
  { id: 3, name: 'Chemistry' },
  { id: 4, name: 'Biology' },
  { id: 5, name: 'History' },
  { id: 6, name: 'Geography' },
  { id: 7, name: 'English Literature' },
  { id: 8, name: 'Computer Science' },
  { id: 9, name: 'Philosophy' },
  { id: 10, name: 'Economics' },
];