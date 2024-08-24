import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WineBarIcon from '@mui/icons-material/WineBar';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { CalendarMonthOutlined, Restaurant } from '@mui/icons-material';
import PublicIcon from '@mui/icons-material/Public';

export function Navigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box position="fixed" bottom="0px" sx={{ zIndex: 100 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Inventory"
          icon={<WineBarIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Pairing"
          icon={<SearchIcon />}
          component={Link}
          to="/pairing"
        />
        <BottomNavigationAction
          label="Sommelier"
          icon={<Restaurant />}
          component={Link}
          to="/sommelier"
        />
        <BottomNavigationAction
          label="Community"
          icon={<PublicIcon />}
          component={Link}
          to="/community"
        />
        <BottomNavigationAction
          label="Events"
          icon={<CalendarMonthOutlined />}
          component={Link}
          to="/events"
        />
      </BottomNavigation>
    </Box>
  );
}
