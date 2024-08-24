//This component retrieves meal suggestions for a selected wine and then dynamically displays these suggestions
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
import { getPairingsForWine } from '../api/api';
import redWineImage from '../assets/redWine.jpg'; // Adjust the relative path
import whiteWineImage from '../assets/whiteWine.jpg'; // Adjust the relative path
import { SuggestedPairingWineToFood } from '../model/SuggestedPairingWineToFood';
import React from 'react';
import { useState } from 'react';
import { observer } from 'mobx-react';

export const PairingFoodSuggestion = observer(() => {
    const { id } = useParams<{ id: string }>() as { id: string }; // Get the wine ID from the URL
    const wineId = parseInt(id, 10); // Convert the ID to a number
    const wine: Wine | undefined = wineStore.getWineById(wineId);

    const [suggestion, setSuggestion] = useState(
        {} as SuggestedPairingWineToFood
    );

    React.useEffect(() => {
        if (wine) {
            getSuggestion(wine);
        }
    }, [wine]);

    if (!wine) {
        return <div>Wine not found</div>;
    }

    const drink = () => {
        if (wine.id) {
            wineStore.removeWine(wine.id);
        }
    };

    const getSuggestion = (wine: Wine) => {
        getPairingsForWine(wine).then((response) => {
            try {
                if (!response.ok) {
                    console.log('Error getting pairings');
                    return;
                }
                response.text().then((dataJson) => {
                    //regex replaces single spaces in strings with underscores because the LLM often returns property names with spaces in them
                    // which cannot be parsed into an object
                    //this can then later be reverted when outputting
                    setSuggestion(JSON.parse(dataJson.replace(/(?:(?=\s\w)\s)/g, '_')));
                });
            } catch (error) {
                console.log('Error getting wines ', error);
            }
        });
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
                            <FoodSuggestionTableBody
                                {...suggestion}
                            ></FoodSuggestionTableBody>
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
});

const FoodSuggestionTableBody = (
    foodCategories: SuggestedPairingWineToFood
) => {
    //saveguard if object is not yet initialized
    if (Object.keys(foodCategories).length === 0) {
        return <TableBody></TableBody>;
    }

    //Need to dynamically evaluate the Object keys (properties) because the categories can be different every time.
    //The categories themselves are string arrays containing meal suggestions
    return (
        <TableBody>
            {Object.keys(foodCategories.pairings).map(function (categoryName) {
                return (
                    <TableRow>
                        <TableCell variant="head">{categoryName}</TableCell>
                        {foodCategories.pairings[categoryName].map((categoryValues) => (
                            <TableCell>{categoryValues.replace(/_/g, ' ')}</TableCell>
                        ))}
                    </TableRow>
                );
            })}
        </TableBody>
    );
};
