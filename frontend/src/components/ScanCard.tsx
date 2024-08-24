import { Box, CircularProgress, Container, Fab } from '@mui/material';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { analyseMenu } from '../api/api';
import { Wine } from '../model/Wine';
import { useNavigate } from 'react-router-dom';
import { scannedWineCardStore } from '../../store/ScannedWineCard';

export const ScanCard: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImages([...images, imageSrc]);
    }
  };

  const sendImage = () => {
    const loadData = async () => {
      try {
        const response = await analyseMenu(images);

        if (!response.ok) {
          console.log('Error getting label');
          return;
        }
        const data: Wine[] = await response.json();

        scannedWineCardStore.setWines(data);
      } catch (error) {
        console.log('Error getting label ', error);
      } finally {
        setLoading(false);
        navigate('/pairing');
      }
    };

    loadData();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        maxHeight: '100dvh',
        overflow: 'auto',
        paddingTop: '60px',
        paddingBottom: '60px',
      }}
    >
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: 'environment', // Use the front camera on mobile devices
        }}
        style={{
          width: '100%', // Ensure full width
          height: '10%', // Auto height to maintain aspect ratio
          display: 'block', // Ensure it's displayed as a block element
          backgroundColor: 'black', // Background color to distinguish the webcam area
        }}
      />
      <Container
        sx={{
          position: 'fixed',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          bottom: '70px',
        }}
      >
        <Container
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Fab onClick={capture}>
            <RadioButtonCheckedIcon />
          </Fab>
          <Fab onClick={sendImage} disabled={!images.length}>
            <AnalyticsIcon />
          </Fab>
          <Fab onClick={() => setImages([])} disabled={!images.length}>
            <RemoveCircleOutlineIcon />
          </Fab>
        </Container>
      </Container>

      <h3>Captured Images:</h3>
      {images.map((image) => {
        return <img src={image} key="image" alt="image" width={'100px'} />;
      })}
    </Container>
  );
};
