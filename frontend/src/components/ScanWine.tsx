import { Box, CircularProgress, Container, Fab } from '@mui/material';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { getInfoFromLabel } from '../api/api';
import { Wine } from '../model/Wine';
import { copiedWineStore } from '../../store/CopiedWine';
import { useNavigate } from 'react-router-dom';

export const ScanWine: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
    }
  };

  const sendImage = () => {
    const loadData = async () => {
      try {
        const response = await getInfoFromLabel(image);

        if (!response.ok) {
          console.log('Error getting label');
          return;
        }
        const data: Wine = await response.json();

        copiedWineStore.setCopiedWine(data);
      } catch (error) {
        console.log('Error getting label ', error);
      } finally {
        setLoading(false);
        navigate('/addWine');
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
          <Fab onClick={sendImage} disabled={!image}>
            <AnalyticsIcon />
          </Fab>
          <Fab onClick={() => setImage('')} disabled={!image}>
            <RemoveCircleOutlineIcon />
          </Fab>
        </Container>
      </Container>

      {image && (
        <div>
          <h3>Captured Image:</h3>
          <img src={image} key="image" alt="image" width={'100px'} />
        </div>
      )}
    </Container>
  );
};
