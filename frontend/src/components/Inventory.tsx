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

export const Inventory = () => {
  const wines: Wine[] = [
    {
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
  ];
  return (
    <Container
      maxWidth="sm"
      sx={{
        maxHeight: '100dvh',
        overflow: 'auto',
      }}
    >
      <Grid container spacing={2} paddingTop={'60px'} paddingBottom={'60px'}>
        {wines.map((wine, index) => (
          <Grid item xs={12} key={index}>
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
