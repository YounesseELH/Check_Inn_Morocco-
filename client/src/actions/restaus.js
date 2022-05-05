import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, FETCH_BY_CREATOR } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getRestau = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchRestau(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getRestaus = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchRestaus(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getRestausByCreator = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchRestausByCreator(name);

    dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getRestausBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchRestausBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createRestau = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createRestau(post);

    dispatch({ type: CREATE, payload: data });

    history.push(`/restaus`);
  } catch (error) {
    console.log(error);
  }
};

export const updateRestau = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateRestau(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likeRestau = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likeRestau(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentRestau = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.commentRestau(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRestau = (id) => async (dispatch) => {
  try {
    await await api.deleteRestau(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
