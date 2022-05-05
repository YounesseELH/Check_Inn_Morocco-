import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Hotel from '../Hotels/Hotel/Hotel';
import { getHotelsByCreator, getHotelsBySearch } from '../../actions/hotels';

const HotelCreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { hotels, isLoading } = useSelector((state) => state.hotels);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getHotelsBySearch({ tags: name }));
    } else {
      dispatch(getHotelsByCreator(name));
    }
  }, []);

  if (!hotels.length && !isLoading) return 'No Hotels';

  return (
    <div>
      <Typography variant="h2">{name}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
          {hotels?.map((hotel) => (
            <Grid key={hotel._id} item xs={12} sm={12} md={6} lg={3}>
              <Hotel hotel={hotel} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default HotelCreatorOrTag;
