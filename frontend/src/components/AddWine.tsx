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
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { copiedWineStore } from '../../store/CopiedWine';
import { Wine } from '../model/Wine';
import { addNewWine } from '../api/api';
import { observer } from 'mobx-react';

export const AddWine = observer(() => {
  const [name, setName] = React.useState('');
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [type, setType] = React.useState('Red');
  const [grapes, setGrapes] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [price, setPrice] = React.useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const copiedWine: Wine = copiedWineStore.wine;

    if (copiedWine.name) {
      const wine: Wine = {
        name: copiedWine.name,
        year: copiedWine.year,
        type: copiedWine.type === 'White' ? 'White' : 'Red',
        grapes: copiedWine.grapes,
        country: copiedWine.country,
        region: copiedWine.region,
        description: copiedWine.description,
        tags: copiedWine.tags,
        price: copiedWine.price,
      };

      setName(wine.name);
      setYear(wine.year);
      setType(wine.type);
      setGrapes(wine.grapes);
      setCountry(wine.country);
      setRegion(wine.region);
      setDescription(wine.description);
      setTags(wine.tags);
      setPrice(wine.price);
    }
  }, []);

  const saveWine = () => {
    const wine: Wine = {
      name,
      year,
      type: type === 'White' ? 'White' : 'Red',
      grapes,
      country,
      region,
      description,
      tags,
      price,
    };
    addNewWine(wine);
    copiedWineStore.removeCopiedWine();
  };

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
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="year"
          label="Year"
          variant="outlined"
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <TextField id="type" label="Type" variant="outlined" type="" />
        <Select
          labelId="type-select-label"
          id="type-select-label"
          value={type}
          label="Type"
          onChange={handleTypeChange}
        >
          <MenuItem value={'Red'}>Red</MenuItem>
          <MenuItem value={'W hite'}>White</MenuItem>
        </Select>
        <TextField
          id="grapes"
          label="Grapes"
          variant="outlined"
          value={grapes}
          onChange={(e) => setGrapes(e.target.value)}
        />
        <TextField
          id="country"
          label="Country"
          variant="outlined"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <TextField
          id="region"
          label="Region"
          variant="outlined"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="tags"
          label="Tags"
          variant="outlined"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <TextField
          id="price"
          label="Price"
          variant="outlined"
          value={price}
          type="number"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <Button variant="outlined" type="submit" onClick={() => saveWine()}>
          Add
        </Button>
      </FormControl>
    </Container>
  );
});
