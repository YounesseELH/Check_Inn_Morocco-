import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import restaus from './restaus';
import hotels from './hotels';

export const reducers = combineReducers({ posts, auth, restaus, hotels});
