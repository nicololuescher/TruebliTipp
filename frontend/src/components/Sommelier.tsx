import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react';
import { Divider } from '@mui/material';

export const Sommelier = () => {
  const questions = [
    {
      question: 'What do you want?',
      answers: ["It's not that easy", 'Wine', 'Red Wine'],
    },
    {
      question: 'What are you eating?',
      answers: ['Cheese', 'Red meat', 'Fish'],
    },
  ];
  const [index, setIndex] = React.useState<number>(0);
  return (
    <Container
      sx={{
        height: '50dvh',
        maxHeight: '100dvh',
        overflow: 'auto',
        width: '100%',
      }}
    >
      <Card>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Box>
                <Typography variant="h4">
                  {questions[index].question}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Divider sx={{ margin: '20px 0px' }} />
      <Container>
        {questions[index].answers.map((answer) => (
          <Card onClick={() => setIndex(index + 1)} sx={{ margin: '5px 0px' }}>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center">
                  <Box>
                    <Typography variant="h6">{answer}</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Container>
  );
};
