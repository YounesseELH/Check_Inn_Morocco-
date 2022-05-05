import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { likeRestau, deleteRestau } from '../../../actions/restaus';
import useStyles from './styles';

const Restau = ({ restau, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(restau?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedRestau = restau.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likeRestau(restau._id));

    if (hasLikedRestau) {
      setLikes(restau.likes.filter((id) => id !== userId));
    } else {
      setLikes([...restau.likes, userId]);
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

  const openRestau = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/restaus/${restau._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openRestau}
      >
        <CardMedia className={classes.media} image={restau.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={restau.title} />
        




        {(user?.result?.googleId === restau?.creator || user?.result?._id === restau?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(restau._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{restau.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{restau.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{restau.message.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?.googleId === restau?.creator || user?.result?._id === restau?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deleteRestau(restau._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Restau;
/*
<div className={classes.overlay}>
          <Typography variant="h6">{restau.name}</Typography>
          <Typography variant="body2">{moment(restau.createdAt).fromNow()}</Typography>
        </div>


*/ 