import SearchIcon from '@mui/icons-material/Search';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';

interface FoodType {
    name: string;
    childNode?: FoodType[] | null;
  }

export const PairingFoodToWine = () => {
    const foodType: FoodType[] = [
      {
        name: 'Meet',
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
        getRecommendation(selectedMeal)
      }
      else {
        getRecommendation("A meal consisting of: ${selectedIngredients.toString()}")
      }
    }
  
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
  
        <Button variant="contained" onClick={search} endIcon={<SearchIcon />}>
          Suchen
        </Button>
      </div>
  
    )
  }
  
  function getRecommendation(food: string) {
    //TODO api call
  
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