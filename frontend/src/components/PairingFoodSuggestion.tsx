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
import { SuggestedPairingWineToFood } from '../model/SuggestedPairingWineToFood';

export const PairingFoodSuggestion = () => {
    const { id } = useParams<{ id: string }>() as { id: string }; // Get the wine ID from the URL
    const wineId = parseInt(id, 10); // Convert the ID to a number
    const wine: Wine | undefined = wineStore.getWineById(wineId);

    if (!wine) {
        return <div>Wine not found</div>;
    }

    const suggestion = getSuggestion(wineId);

    const drink = () => {
        console.log('drink ', wine.id);
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
                            <FoodSuggestionTableBody {...suggestion}></FoodSuggestionTableBody>
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
}

//Dummy Data for now
function getSuggestion(id: Number)
{
    return JSON.parse(`{
        "pairings": {
            "red_meat": [
                "grilled steak",
                "roast lamb",
                "beef stew"
            ],
            "cheese": [
                "cheddar",
                "gouda",
                "gruyere"
            ],
            "pasta": [
                "pasta with bolognese",
                "lasagna",
                "ravioli"
            ]
        }
    }`);
}

const FoodSuggestionTableBody = (foodCategory: SuggestedPairingWineToFood) => {
    return (
        <TableBody>
            {Object.keys(foodCategory.pairings).map(function (categoryName) {
                return (
                    <TableRow>
                        <TableCell variant="head">{categoryName}</TableCell>
                        {foodCategory.pairings[categoryName].map((categoryValues) => (
                            <TableCell>{categoryValues}</TableCell>
                        ))}                
                    </TableRow>
                )
            })}
        </TableBody>
    )
}

