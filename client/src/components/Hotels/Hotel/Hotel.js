import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { likeHotel, deleteHotel } from '../../../actions/hotels';
import useStyles from './styles';

const Hotel = ({ hotel, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(hotel?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedHotel = hotel.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likeHotel(hotel._id));

    if (hasLikedHotel) {
      setLikes(hotel.likes.filter((id) => id !== userId));
    } else {
      setLikes([...hotel.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openHotel = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/hotels/${hotel._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openHotel}
      >
        <CardMedia className={classes.media} image={hotel.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={hotel.title} />
        




        {(user?.result?.googleId === hotel?.creator || user?.result?._id === hotel?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(hotel._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{hotel.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{hotel.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{hotel.message.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?.googleId === hotel?.creator || user?.result?._id === hotel?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deleteHotel(hotel._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Hotel;
/*
<div className={classes.overlay}>
          <Typography variant="h6">{restau.name}</Typography>
          <Typography variant="body2">{moment(restau.createdAt).fromNow()}</Typography>
        </div>


*/ 