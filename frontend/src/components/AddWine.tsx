import FlipIcon from '@mui/icons-material/Flip';
import {
  Container,
  FormControl,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Fab,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AddWine = () => {
  const [type, setType] = React.useState('red');
  const navigate = useNavigate();

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        maxHeight: '100dvh',
        overflow: 'auto',
        paddingTop: '60px',
        paddingBottom: '60px',
        minWidth: '100%',
      }}
    >
      <Fab
        color="primary"
        aria-label="scan"
        sx={{ position: 'fixed', right: '20px', bottom: '70px' }}
        onClick={() => navigate('/scanWine')}
      >
        <FlipIcon />
      </Fab>
      <FormControl
        sx={{
          minWidth: '100%',
          '> div': { margin: '10px 0px', minWidth: '100%' },
        }}
      >
        <TextField id="name" label="Name" variant="outlined" />
        <TextField id="year" label="Year" variant="outlined" type="number" />
        <TextField id="type" label="Type" variant="outlined" type="" />
        <Select
          labelId="type-select-label"
          id="type-select-label"
          value={type}
          label="Type"
          onChange={handleTypeChange}
        >
          <MenuItem value={'red'}>Red</MenuItem>
          <MenuItem value={'white'}>White</MenuItem>
        </Select>
        <TextField id="grapes" label="Grapes" variant="outlined" />
        <TextField id="country" label="Country" variant="outlined" />
        <TextField id="region" label="Region" variant="outlined" />
        <TextField id="description" label="Description" variant="outlined" />
        <TextField id="tags" label="Tags" variant="outlined" />
        <TextField id="price" label="Price" variant="outlined" />
        <Button variant="outlined" type="submit">
          Add
        </Button>
      </FormControl>
    </Container>
  );
};
