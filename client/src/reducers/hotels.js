import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, hotels: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        hotels: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
      return { ...state, hotels: action.payload.data };
    case FETCH_POST:
      return { ...state, hotels: action.payload.hotels };
    case LIKE:
      return { ...state, hotels: state.hotels.map((hotel) => (hotel._id === action.payload._id ? action.payload : hotel)) };
    case COMMENT:
      return {
        ...state,
        hotels: state.hotels.map((hotel) => {
          if (hotel._id == +action.payload._id) {
            return action.payload;
          }
          return hotel;
        }),
      };
    case CREATE:
      return { ...state, hotels: [...state.hotels, action.payload] };
    case UPDATE:
      return { ...state, hotels: state.hotels.map((hotel) => (hotel._id === action.payload._id ? action.payload : hotel)) };
    case DELETE:
      return { ...state, hotels: state.hotels.filter((hotel) => hotel._id !== action.payload) };
    default:
      return state;
  }
};
