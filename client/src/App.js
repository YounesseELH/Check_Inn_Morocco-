import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';

import HomeRestau from './components/HomeRestau/HomeRestau';
import RestauDetails from './components/RestauDetails/RestauDetails';
import RestauCreatorOrTag from './components/RestauCreatorOrTag/RestauCreatorOrTag';

import HomeHotel from './components/HomeHotel/HomeHotel';
import HotelDetails from './components/HotelDetails/HotelDetails';
import HotelCreatorOrTag from './components/HotelCreatorOrTag/HotelCreatorOrTag';

import Landing from './components/Home/Landing';

import Trending from './components/trending/Trending';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          
          <Route path="/" exact component={Landing} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          
          <Route path="/r" exact component={() => <Redirect to="/restaus" />} />
          <Route path="/restaus" exact component={HomeRestau} />                        
          <Route path="/restaus/search" exact component={HomeRestau} />
          <Route path="/restaus/:id" exact component={RestauDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={RestauCreatorOrTag} />

          <Route path="/h" exact component={() => <Redirect to="/hotels" />} />
          <Route path="/hotels" exact component={HomeHotel} />                        
          <Route path="/hotels/search" exact component={HomeHotel} />
          <Route path="/hotels/:id" exact component={HotelDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={HotelCreatorOrTag} />

          <Route path="/trending" exact component={Trending} />  

        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;

/*
import RestauDetails from './components/RestauDetails/RestauDetails';
import RestauCreatorOrTag from './components/RestauCreatorOrTag/RestauCreatorOrTag';

          <Route path="/restaus/:id" exact component={RestauDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={RestauCreatorOrTag} />

          <Route path="/" exact component={() => <Redirect to="/posts" />} />

          <Route path="/restaus/:id" exact component={RestauDetails} />
*/



