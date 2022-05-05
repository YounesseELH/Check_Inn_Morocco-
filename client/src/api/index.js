import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

// export const fetchTrendingPosts = (page) => API.get(`/posts/trending?page=${page}`);
export const fetchTrendPosts = (page) => API.get(`/posts/?page=${page}&trend=${page}`);

export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const fetchRestau = (id) => API.get(`/restaus/${id}`);
export const fetchRestaus = (page) => API.get(`/restaus?page=${page}`);
export const fetchRestausByCreator = (name) => API.get(`/restaus/creator?name=${name}`);
export const fetchRestausBySearch = (searchQuery) => API.get(`/restaus/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createRestau = (newRestau) => API.post('/restaus', newRestau);
export const likeRestau = (id) => API.patch(`/restaus/${id}/likeRestau`);
export const commentRestau = (value, id) => API.post(`/restaus/${id}/commentRestau`, { value });
export const updateRestau = (id, updatedRestau) => API.patch(`/restaus/${id}`, updatedRestau);
export const deleteRestau = (id) => API.delete(`/restaus/${id}`);

export const fetchHotel = (id) => API.get(`/hotels/${id}`);
export const fetchHotels = (page) => API.get(`/hotels?page=${page}`);
export const fetchHotelsByCreator = (name) => API.get(`/hotels/creator?name=${name}`);
export const fetchHotelsBySearch = (searchQuery) => API.get(`/hotels/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createHotel = (newHotel) => API.post('/hotels', newHotel);
export const likeHotel = (id) => API.patch(`/hotels/${id}/likeHotel`);
export const commentHotel = (value, id) => API.post(`/hotels/${id}/commentHotel`, { value });
export const updateHotel = (id, updatedHotel) => API.patch(`/hotels/${id}`, updatedHotel);
export const deleteHotel = (id) => API.delete(`/hotels/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
