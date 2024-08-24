//Component for displaying a users wine collection, which can be selected for fitting food recommendations
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
import { getAllWines } from '../api/api';
import React from 'react';
import { observer } from 'mobx-react';

export const PairingWineToFood = observer(() => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getAllWines();

        if (!response.ok) {
          console.log('Error getting wines');
          return;
        }
        const data: Wine[] = await response.json();

        wineStore.setWines(data);
      } catch (error) {
        console.log('Error getting wines ', error);
      }
    };

    loadData();
  }, []);

  if (!wineStore.wines.length) {
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
    <div>
      <Container
        maxWidth="sm"
        sx={{
          maxHeight: '100dvh',
          overflow: 'auto',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        <Grid container spacing={2}>
          {wineStore.wines.map((wine, index) => (
            <Grid
              item
              xs={12}
              key={index}
              onClick={() => navigate(`/wineSuggestFood/${wine.id}`)}
            >
              <Card>
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center">
                    <WineBarIcon style={{color: wine.type}} sx={{ marginRight: 2 }} />
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
    </div>
  );
});
