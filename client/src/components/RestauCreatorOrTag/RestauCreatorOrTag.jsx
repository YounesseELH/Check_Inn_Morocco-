import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Restau from '../Restaus/Restau/Restau';
import { getRestausByCreator, getRestausBySearch } from '../../actions/restaus';

const RestauCreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { restaus, isLoading } = useSelector((state) => state.restaus);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getRestausBySearch({ tags: name }));
    } else {
      dispatch(getRestausByCreator(name));
    }
  }, []);

  if (!restaus.length && !isLoading) return 'No Restaurents';

  return (
    <div>
      <Typography variant="h2">{name}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
          {restaus?.map((restau) => (
            <Grid key={restau._id} item xs={12} sm={12} md={6} lg={3}>
              <Restau restau={restau} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default RestauCreatorOrTag;
