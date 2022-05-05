import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, restaus: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        restaus: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
      return { ...state, restaus: action.payload.data };
    case FETCH_POST:
      return { ...state, restaus: action.payload.restaus };
    case LIKE:
      return { ...state, restaus: state.restaus.map((restau) => (restau._id === action.payload._id ? action.payload : restau)) };
    case COMMENT:
      return {
        ...state,
        restaus: state.restaus.map((restau) => {
          if (restau._id == +action.payload._id) {
            return action.payload;
          }
          return restau;
        }),
      };
    case CREATE:
      return { ...state, restaus: [...state.restaus, action.payload] };
    case UPDATE:
      return { ...state, restaus: state.restaus.map((restau) => (restau._id === action.payload._id ? action.payload : restau)) };
    case DELETE:
      return { ...state, restaus: state.restaus.filter((restau) => restau._id !== action.payload) };
    default:
      return state;
  }
};
