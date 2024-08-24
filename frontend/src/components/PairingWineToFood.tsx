import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import WineBarIcon from '@mui/icons-material/WineBar';
import { Wine } from '../model/Wine';
import { useNavigate } from 'react-router-dom';


export const PairingWineToFood = () => {    
  const navigate = useNavigate();

  function search(e) {

  }
  
  const wines: Wine[] = [
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
      tags: 'nice',
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
      tags: 'nice',
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
      tags: 'nice',
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
      tags: 'nice',
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
      tags: 'nice',
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
      tags: 'nice',
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
      tags: 'nice',
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
      tags: 'nice',
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
      tags: 'nice',
      type: 'Red',
    },
  ];

  return (
      <div>
    <Container
      maxWidth="sm"
      sx={{
        maxHeight: '100dvh',
        overflow: 'auto',
        paddingTop: '60px',
        paddingBottom: '60px',
      }}
    >
      <Grid container spacing={2}>
        {wines.map((wine, index) => (
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


      </div>
  
    )
  }
  

  