import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createHotel, updateHotel } from '../../actions/hotels';
import useStyles from './styles';

const FormH = ({ currentId, setCurrentId }) => {
  const [hotelData, setHotelData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const hotel = useSelector((state) => (currentId ? state.hotels.hotels.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setHotelData({ title: '', message: '', tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (!hotel?.title) clear();
    if (hotel) setHotelData(hotel);
  }, [hotel]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createHotel({ ...hotelData, name: user?.hotel?.name }, history));
      clear();
    } else {
      dispatch(updateHotel(currentId, { ...hotelData, name: user?.hotel?.name }));
      clear();
    }
  };
 
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setHotelData({ ...hotelData, tags: [...hotelData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setHotelData({ ...hotelData, tags: hotelData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${hotel?.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={hotelData.title} onChange={(e) => setHotelData({ ...hotelData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={hotelData.message} onChange={(e) => setHotelData({ ...hotelData, message: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={hotelData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setHotelData({ ...hotelData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default FormH;
