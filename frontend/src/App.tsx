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
import { AddWine } from './components/AddWine';
import { ScanWine } from './components/ScanWine';
import { WineDetail } from './components/WineDetail';
import { getAllWines } from './api/api';
import { PairingFoodSuggestion } from './components/PairingFoodSuggestion';
import { ScanCard } from './components/ScanCard';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = () => {
  React.useEffect(() => {
    getAllWines();
  }, []);
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
          <Route path="/addWine" element={<AddWine />} />
          <Route path="/scanWine" element={<ScanWine />} />
          <Route path="/scanCard" element={<ScanCard />} />
          <Route path="/wine/:id" element={<WineDetail />} />
          <Route
            path="/wineSuggestFood/:id"
            element={<PairingFoodSuggestion />}
          />
        </Routes>
        <Navigation />
      </Router>
    </ThemeProvider>
  );
};

export default App;
