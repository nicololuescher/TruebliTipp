// src/App.tsx
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Inventory } from './components/Inventory';
import { Pairing } from './components/Pairing';
import { Navigation } from './components/Navigation';
import { Sommelier } from './components/Sommelier';
import { Community } from './components/Community';
import { Events } from './components/Events';
import TopAppBar from './components/TopAppBar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Router>
        <TopAppBar />
        <Routes>
          <Route index element={<Inventory />} />
          <Route path="/pairing" element={<Pairing />} />
          <Route path="/sommelier" element={<Sommelier />} />
          <Route path="/community" element={<Community />} />
          <Route path="/events" element={<Events />} />
        </Routes>
        <Navigation />
      </Router>
    </ThemeProvider>
  );
};

export default App;
