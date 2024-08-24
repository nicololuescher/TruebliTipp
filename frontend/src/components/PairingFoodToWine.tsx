//Component for entering a meal or used ingredients, which are then used to display a recommended Wine
//Has modes to either search the personal inventory or to take a picture of a restaurants wine card to use as a "temporary" inventory
import SearchIcon from '@mui/icons-material/Search';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { Box, Button, Fab, Grid, Switch, TextField } from '@mui/material';
import { useState } from 'react';
import { getAllWines, getPairingsForFood } from '../api/api';
import React from 'react';
import { Wine } from '../model/Wine';
import { WineRanking } from '../model/WineRanking';
import { wineStore } from '../../store/WineStore';
import { scannedWineCardStore } from '../../store/ScannedWineCard';
import { CreateFoodSuggestion } from './WineSuggestionFromFoodInput';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';

//Recursive Datastructre to encode the tree display
interface FoodType {
  name: string;
  childNode?: FoodType[] | null;
}

export const PairingFoodToWine = observer(() => {
  //Just static in frontend for now, can be moved to backend in a later iteration
  const foodType: FoodType[] = [
    {
      name: 'Meat',
      childNode: [
        {
          name: 'Pork',
          childNode: null,
        },
        {
          name: 'Beef',
          childNode: [
            {
              name: 'Veal',
              childNode: null,
            },
          ],
        },
        {
          name: 'Chicken',
          childNode: null,
        },
      ],
    },
    {
      name: 'Fish',
      childNode: [
        {
          name: 'Salmon',
          childNode: null,
        },
        {
          name: 'Mackrel',
          childNode: null,
        },
        {
          name: 'Sardines',
          childNode: null,
        },
      ],
    },
    {
      name: 'Vegetables',
      childNode: [
        {
          name: 'Lettuce',
          childNode: null,
        },
        {
          name: 'Carrots',
          childNode: null,
        },
        {
          name: 'Corn',
          childNode: null,
        },
        {
          name: 'Tomatos',
          childNode: null,
        },
      ],
    },
    {
      name: 'Fruits',
      childNode: [
        {
          name: 'Apples',
          childNode: null,
        },
        {
          name: 'Pears',
          childNode: null,
        },
        {
          name: 'Strawberries',
          childNode: null,
        },
        {
          name: 'Kiwi',
          childNode: null,
        },
      ],
    },
  ];

  const [useInventory, setUseInventory] = React.useState(true);

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
  const [selectedMeal, setSelectedMeal] = useState('');
  const navigate = useNavigate();

  const handleSelectedIngredients = (_event, itemId) => {
    setSelectedIngredients(itemId);
  };
  const handleMealChanged = (event) => {
    setSelectedMeal(event.target.value);
  };

  //Prioritize the entered meal and only use ingredients if none are entered.
  //This may need some redesigning and UX studies
  function search() {
    if (selectedMeal != '') {
      getSuggestion(selectedMeal);
    } else {
      getSuggestion('A meal consisting of:' + selectedIngredients.toString());
    }
  }

  const [wineRanking, setWineRanking] = useState({} as WineRanking);

  const getSuggestion = (food: string) => {
    const searchWines = useInventory
      ? wineStore.wines
      : scannedWineCardStore.wines;
    getPairingsForFood(food, searchWines).then((response) => {
      try {
        if (!response.ok) {
          console.log('Error getting pairings');
          return;
        }
        response.json().then((dataJson) => {
          setWineRanking(dataJson);
        });
      } catch (error) {
        console.log('Error getting wines ', error);
      }
    });
  };

  const handleModeChanged = () => {
    setUseInventory(!useInventory);
  };

  return (
    <>
      <Grid container paddingBottom={'20px'}>
        <Grid
          item
          xs={12}
          key={0}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Box display="flex" alignItems="start" justifyContent="center">
            <ToggleFoodInventoryScan
              onChange={handleModeChanged}
              sx={{ m: 1 }}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={() => navigate('/scanCard')}
            disabled={useInventory}
          >
            Scan
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} key={1}>
        <Box display="flex" justifyContent="center">
          <TextField
            id="outlined-basic"
            label="Meal"
            variant="outlined"
            onChange={handleMealChanged}
          />
        </Box>

        <Box display="flex" alignItems="start" justifyContent="center">
          <p>-- Or --</p>
        </Box>
        <Box sx={{ minHeight: 352, minWidth: 290 }}>
          <p>Ingredients:</p>

          <SimpleTreeView
            multiSelect
            checkboxSelection
            onSelectedItemsChange={handleSelectedIngredients}
          >
            {foodType.map((foodType) => (
              <FoodItem {...foodType}></FoodItem>
            ))}
          </SimpleTreeView>
        </Box>
      </Grid>
      <CreateFoodSuggestion
        wineRanking={{ ...wineRanking }}
        useInventory={useInventory}
      ></CreateFoodSuggestion>
      <Fab
        color="primary"
        aria-label="scan"
        sx={{ position: 'fixed', right: '20px', bottom: '70px' }}
        onClick={search}
      >
        <SearchIcon />
      </Fab>
    </>
  );
});

//Creats a node in the tree view, can have 0->n child nodes
const FoodItem = (ft: FoodType) => {
  if (ft.childNode == null) {
    return <TreeItem itemId={ft.name} label={ft.name} />;
  } else {
    return (
      <TreeItem itemId={ft.name} label={ft.name}>
        {ft.childNode.map((foodType) => (
          <FoodItem {...foodType}></FoodItem>
        ))}
      </TreeItem>
    );
  }
};

const ToggleFoodInventoryScan = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M7,3H4v3H2V1h5V3z M22,6V1h-5v2h3v3H22z M7,21H4v-3H2v5h5V21z M20,18v3h-3v2h5v-5H20z M19,18c0,1.1-0.9,2-2,2H7 c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2V18z M15,8H9v2h6V8z M15,11H9v2h6V11z M15,14H9v2h6V14z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));
