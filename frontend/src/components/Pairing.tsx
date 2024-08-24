import { Box, Button, Container, Grid, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { PairingFoodToWine } from './PairingFoodToWine';
import { useState } from 'react';

export const Pairing = () => {
  const [isFindWineMode, setFindWineMode] = useState(Boolean);

  const handleModeChanged = (event, value) => {
    setFindWineMode(value);
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        maxHeight: '100dvh',
        overflow: 'auto',
      }}
    >
      <Grid container spacing={2} paddingTop={'60px'} paddingBottom={'60px'}>
        <Grid item xs={12} key={0}>

          <Box
            display="flex"
            alignItems="start"
            justifyContent="center"
          >
            <ToggleFoodWineMode onChange={handleModeChanged} sx={{ m: 1 }} />
          </Box>
        </Grid>
      </Grid>

      {isFindWineMode ? <p>text</p> : <PairingFoodToWine/>}


    </Container>
  );
}


const ToggleFoodWineMode = styled(Switch)(({ theme }) => ({
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
          '#fff',
        )}" d="M6 3v6c0 2.97 2.16 5.43 5 5.91V19H8v2h8v-2h-3v-4.09c2.84-.48 5-2.94 5-5.91V3zm10 5H8V5h8z"/></svg>')`,
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
        '#fff',
      )}" d="m8.1 13.34 2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));
