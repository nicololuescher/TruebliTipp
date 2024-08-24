//List that displays friends/follows and some notable stats
//Achievements gained can be displayed for others to see
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { Friend } from "../model/Friend";

export const Community = () => {
  //Mock data, can be moved to backend in a later iteration
  const friends: Friend[] = [
    {
      name: "Alice",
      profile_picture: "https://loremflickr.com/200/200",
      collection: 32,
      achievements: ["Wine Lover", "Wine Expert"],
      },
      {
      name: "Bob",
      profile_picture: "https://loremflickr.com/200/200?random=1",
      collection: 113,
      achievements: ["Wine Lover", "Collector", "Sommelier"]
      },
      {
      name: "Charlie",
      profile_picture: "https://loremflickr.com/200/200?random=2",
      collection: 55,
      achievements: ["Big Spender", "Borderline Alcoholic"]
      },
      {
      name: "David",
      profile_picture: "https://loremflickr.com/200/200?random=3",
      collection: 12,
      achievements: ["Bottle Hoarder", "Lush"],
      },
      {
      name: "Eve",
      profile_picture: "https://loremflickr.com/200/200?random=4",
      collection: 7,
      achievements: ["Party Animal", "Wine Lover"]
      },
      {
      name: "Frank",
      profile_picture: "https://loremflickr.com/200/200?random=5",
      collection: 1,
      achievements: ["Wine Lover"]
      }
  ];
  return (
    <Container
      maxWidth="sm"
      sx={{
        maxHeight: '100dvh',
        overflow: 'auto',
      }}
    >
      <Grid container spacing={2} paddingTop={'60px'} paddingBottom={'60px'}>
        {friends.map((friend, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center">
                    <img
                      src={friend.profile_picture}
                      alt={friend.name}
                      style={{ borderRadius: "50%", height: 50, width: 50 , margin: "8px"}} />
                    <Box>
                      <Typography variant="h6">{friend.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Cellar: {friend.collection} bottles
                      </Typography>
                      <Typography variant="body2" color="grey">
                        Achievements: {friend.achievements.join(", ")}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
