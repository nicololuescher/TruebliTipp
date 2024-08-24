import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react';
import { getSommelier } from '../api/api';
import { SommelierQuestion } from '../model/SommelierQuestion';

export const Sommelier = () => {
  const [question, setQuestion] = React.useState<SommelierQuestion>();
  const [nextStep, setNextStep] = React.useState('');

  React.useEffect(() => {
    loadData('/getSommelier');
  }, []);

  React.useEffect(() => {
    if (nextStep) {
      loadData(nextStep);
    }
  }, [nextStep]);

  const loadData = async (step: string) => {
    try {
      const response = await getSommelier(step);

      if (!response.ok) {
        console.log('Error getting questions');
        return;
      }
      const data: SommelierQuestion = await response.json();

      setQuestion(data);
    } catch (error) {
      console.log('Error getting questions ', error);
    }
  };

  if (!question) {
    return <Typography variant="h3">No Questions found</Typography>;
  }

  return (
    <Container
      sx={{
        height: '70dvh',
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
                {question.recommendation ? (
                  <Typography variant="h4">
                    {question?.recommendation}
                  </Typography>
                ) : (
                  <Typography variant="h4">{question?.question}</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Container>
        {!question.recommendation &&
          question?.options.map((answer) => (
            <Card
              className="glass"
              onClick={() => setNextStep(answer.next)}
              sx={{ margin: '10px 0px' }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography variant="h6">{answer.answer}</Typography>
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
