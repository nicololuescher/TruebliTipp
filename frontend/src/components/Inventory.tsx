import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import WineBarIcon from '@mui/icons-material/WineBar';
import Add from '@mui/icons-material/Add';
import { Wine } from '../model/Wine';
import Fab from '@mui/material/Fab';
import { useNavigate } from 'react-router-dom';
import { wineStore } from '../../store/WineStore';

export const Inventory = () => {
  const navigate = useNavigate();

  /*  const wines: Wine[] = [
    {
      id: 1,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
    {
      id: 2,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
    {
      id: 3,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
    {
      id: 4,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
    {
      id: 5,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
    {
      id: 6,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
    {
      id: 7,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
    {
      id: 8,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
    {
      id: 9,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
  ]; */
  const wines: Wine[] = wineStore.allWines;

  if (!wines.length) {
    return (
      <>
        <Typography align="center" variant="h4">
          No wines added yet
        </Typography>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', right: '20px', bottom: '70px' }}
          onClick={() => navigate('/addWine')}
        >
          <Add />
        </Fab>
      </>
    );
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        maxHeight: '100dvh',
        overflow: 'auto',
        paddingTop: '60px',
        paddingBottom: '60px',
      }}
    >
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', right: '20px', bottom: '70px' }}
        onClick={() => navigate('/addWine')}
      >
        <Add />
      </Fab>
      <Grid container spacing={2}>
        {wines.map((wine, index) => (
          <Grid
            item
            xs={12}
            key={index}
            onClick={() => navigate(`/wine/${wine.id}`)}
          >
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center">
                    <WineBarIcon sx={{ marginRight: 2 }} />
                    <Box>
                      <Typography variant="h6">{wine.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Year: {wine.year}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Price: {wine.price} CHF
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
