import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Restau from './Restau/Restau';
import useStyles from './styles';

const Restaus = ({ setCurrentId }) => {
  const { restaus, isLoading } = useSelector((state) => state.restaus);
  const classes = useStyles();

  if (!restaus.length && !isLoading) return 'No restaurants found';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {restaus?.map((restau) => (
          <Grid key={restau._id} item xs={12} sm={12} md={6} lg={3}>
            <Restau restau={restau} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Restaus;
