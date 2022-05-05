import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, FETCH_BY_CREATOR } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getHotel = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchHotel(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getHotels = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchHotels(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getHotelsByCreator = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchHotelsByCreator(name);

    dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getHotelsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchHotelsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createHotel = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createHotel(post);

    dispatch({ type: CREATE, payload: data });

    history.push(`/hotels`);
  } catch (error) {
    console.log(error);
  }
};

export const updateHotel = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateHotel(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likeHotel = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likeHotel(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentHotel = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.commentHotel(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const deleteHotel = (id) => async (dispatch) => {
  try {
    await await api.deleteHotel(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
