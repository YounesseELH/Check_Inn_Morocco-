import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Hotel from './Hotel/Hotel';
import useStyles from './styles';

const Hotels = ({ setCurrentId }) => {
  const { hotels, isLoading } = useSelector((state) => state.hotels);
  const classes = useStyles();

  if (!hotels.length && !isLoading) return 'No Hotel found';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {hotels?.map((hotel) => (
          <Grid key={hotel._id} item xs={12} sm={12} md={6} lg={3}>
            <Hotel hotel={hotel} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Hotels;
