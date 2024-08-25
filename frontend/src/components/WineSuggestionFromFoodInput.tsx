//Component is built and displayed in
import { Grid, Card, CardContent, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { wineStore } from '../../store/WineStore';
import { WineRanking } from '../model/WineRanking';
import WineBarIcon from '@mui/icons-material/WineBar';
import { observer } from 'mobx-react';

interface IProps {
  wineRanking: WineRanking;
  useInventory: boolean;
}

export const CreateFoodSuggestion = observer((props: IProps) => {
  {
    const navigate = useNavigate();

    //saveguard if object is not yet initialized
    if (Object.keys(props.wineRanking).length === 0) {
      return <div></div>;
    }

    return (
      <>
        <Typography variant="h4">Suggestions</Typography>
        <Grid container spacing={2} sx={{ paddingBottom: '60px' }}>
          {props.wineRanking.ranking.map((wineId, index) => (
            <Grid
              item
              xs={12}
              key={index}
              onClick={() => navigate(`/wine/${wineId}`)}
            >
              <Card>
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center">
                      <WineBarIcon
                        style={{
                          color: wineStore.getWineById(parseInt(wineId))?.type,
                        }}
                        sx={{ marginRight: 2 }}
                      />
                      <Box>
                        {props.useInventory ? (
                          <Typography variant="h6">
                            {wineStore.getWineById(parseInt(wineId))?.name}
                          </Typography>
                        ) : (
                          <Typography variant="h6">{wineId}</Typography>
                        )}
                        <Typography variant="body2" color="textSecondary">
                          Recommendation Nr.: {index + 1}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
});
