import SearchIcon from '@mui/icons-material/Search';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { getAllWines, getPairingsForFood } from '../api/api';
import React from 'react';
import { Wine } from '../model/Wine';
import { WineRanking } from '../model/WineRanking';
import { wineStore } from '../../store/WineStore';
import { useNavigate } from 'react-router-dom';
import WineBarIcon from '@mui/icons-material/WineBar';

interface FoodType {
  name: string;
  childNode?: FoodType[] | null;
}

interface WineStoreRanking {
  wineStore: any,
  wineRanking: WineRanking
}

export const PairingFoodToWine = () => {
  const foodType: FoodType[] = [
    {
      name: 'Meat',
      childNode: [
        {
          name: 'Pork',
          childNode: null
        },
        {
          name: 'Beef',
          childNode: [
            {
              name: 'Veal',
              childNode: null
            }
          ]
        },
        {
          name: 'Chicken',
          childNode: null
        }
      ]
    },
    {
      name: 'Fish',
      childNode: [
        {
          name: 'Salmon',
          childNode: null
        },
        {
          name: 'Mackrel',
          childNode: null
        },
        {
          name: 'Sardines',
          childNode: null
        }
      ]
    },
    {
      name: 'Vegetables',
      childNode: [
        {
          name: 'Lettuce',
          childNode: null
        },
        {
          name: 'Carrots',
          childNode: null
        },
        {
          name: 'Corn',
          childNode: null
        },
        {
          name: 'Tomatos',
          childNode: null
        }
      ]
    },
    {
      name: 'Fruits',
      childNode: [
        {
          name: 'Apples',
          childNode: null
        },
        {
          name: 'Pears',
          childNode: null
        },
        {
          name: 'Strawberries',
          childNode: null
        },
        {
          name: 'Kiwi',
          childNode: null
        }
      ]
    },
  ];

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

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState("");

  const handleSelectedIngredients = (event, itemId) => {
    setSelectedIngredients(itemId);
  }
  const handleMealChanged = (event) => {
    setSelectedMeal(event.target.value);
  }

  function search(e) {
    if (selectedMeal != "") {
      getSuggestion(selectedMeal)
    }
    else {
      getSuggestion("A meal consisting of:" + selectedIngredients.toString())
    }
  }

  const [wineRanking, setWineRanking] = useState({} as WineRanking);

  const getSuggestion = (food: string) => {
    getPairingsForFood(food, wineStore.allWines).then(response => {
      try {

        if (!response.ok) {
          console.log('Error getting pairings');
          return;
        }
        response.json()
          .then(dataJson => {
            setWineRanking(dataJson);
          });

      } catch (error) {
        console.log('Error getting wines ', error);
      }
    });
  };

  return (
      <div>
  
        <Grid item xs={12} key={1}>
  
          <Box
            display="flex"
  
            justifyContent="center"
          >
            <TextField id="outlined-basic" label="Meal" variant="outlined" onChange={handleMealChanged} />
          </Box>
  
          <Box
            display="flex"
            alignItems="start"
            justifyContent="center"
          >
            <p>-- Oder --</p>
          </Box>
          <Box sx={{ minHeight: 352, minWidth: 290 }}>
            <p>Zutaten:</p>
  
            <SimpleTreeView multiSelect checkboxSelection onSelectedItemsChange={handleSelectedIngredients}>
              {foodType.map((foodType) => (
                <FoodItem {...foodType} ></FoodItem>
              ))}
            </SimpleTreeView>
          </Box>
  
        </Grid>

        <CreateFoodSuggestion {...wineRanking}></CreateFoodSuggestion>
  
        <Button variant="contained" onClick={search} endIcon={<SearchIcon />}>
          Suchen
        </Button>
      </div >
  
    )
  }

const CreateFoodSuggestion = (wineRanking: WineRanking) => {
  {
    const navigate = useNavigate();

    if (Object.keys(wineRanking).length === 0) {
      return (<div></div>)
    }

    return (

      <Grid container spacing={2}>
        {wineRanking.ranking.map((wineId, index) => (
          <Grid
            item
            xs={12}
            key={index}
            onClick={() => navigate(`/wine/${wineId}`)}
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
                      <Typography variant="h6">{wineStore.getWineById(parseInt(wineId))?.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Recommendation Nr.: {index+1}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Price: {wineStore.getWineById(parseInt(wineId))?.price} CHF
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

const FoodItem = (ft: FoodType) => {
  if (ft.childNode == null) {
    return <TreeItem itemId={ft.name} label={ft.name} />;
  }
  else {
    return (
      <TreeItem itemId={ft.name} label={ft.name}>
        {ft.childNode.map((foodType) => (
          <FoodItem {...foodType} ></FoodItem>
        ))}
      </TreeItem>
    );
  }
}