import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react';

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
      maxWidth="sm"
      sx={{
        maxHeight: '100dvh',
        overflow: 'auto',
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
                <Typography variant="h6">
                  {questions[index].question}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
