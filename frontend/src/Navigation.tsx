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
    <>
      <Box position="absolute" bottom="0px">
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
          }}
        >
          <Link to="/">
            <BottomNavigationAction label="Inventory" icon={<WineBarIcon />} />
          </Link>
          <Link to="/pairing">
            <BottomNavigationAction label="Pairing" icon={<SearchIcon />} />
          </Link>
          <Link to="/sommelier">
            <BottomNavigationAction label="Sommelier" icon={<Restaurant />} />
          </Link>
          <Link to="/community">
            <BottomNavigationAction label="Community" icon={<PublicIcon />} />
          </Link>
          <Link to="/events">
            <BottomNavigationAction
              label="Events"
              icon={<CalendarMonthOutlined />}
            />
          </Link>
        </BottomNavigation>
      </Box>
    </>
  );
}
