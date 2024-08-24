import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { wineStore } from '../../store/WineStore';
import { Wine } from '../model/Wine';

import redWineImage from '../assets/redWine.jpg'; // Adjust the relative path
import whiteWineImage from '../assets/whiteWine.jpg'; // Adjust the relative path

export const WineDetail = () => {
  const { id } = useParams<{ id: string }>() as { id: string }; // Get the wine ID from the URL
  const wineId = parseInt(id, 10); // Convert the ID to a number
  const wine: Wine | undefined = wineStore.getWineById(wineId);

  if (!wine) {
    return <div>Wine not found</div>;
  }

  const drink = () => {
    if (wine.id) {
      wineStore.removeWine(wine.id);
    }
  };

  return (
    <Container
      sx={{
        height: '100dvh',
        maxHeight: '100dvh',
        overflow: 'auto',
        width: '100%',
      }}
    >
      <Box
        sx={{ height: '100%' }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          alignItems="center"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '80%',
            width: '100%',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '200px', // Set the height you want for the image container
              backgroundImage:
                wine.type === 'Red'
                  ? `url(${redWineImage})`
                  : `url(${whiteWineImage})`, // Replace with your image URL
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white', // Set the text color
            }}
          >
            <Typography
              variant="h4"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.2)', // Optional: Add a semi-transparent background to the text
                padding: '8px 16px',
                borderRadius: '4px',
                textAlign: 'center',
              }}
            >
              {wine.name}
            </Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head">Year</TableCell>
                  <TableCell>{wine.year}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Type</TableCell>
                  <TableCell>{wine.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Grape Type</TableCell>
                  <TableCell>{wine.grapes}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Price</TableCell>
                  <TableCell>{wine.price ? wine.price : '-'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Country</TableCell>
                  <TableCell>{wine.country}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Region</TableCell>
                  <TableCell>{wine.region}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Personal Rating</TableCell>
                  <TableCell>
                    {wine.feedback ? wine.feedback : '-'} / 5
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            sx={{ margin: '10px' }}
            variant="outlined"
            onClick={() => drink()}
          >
            Drink!
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
