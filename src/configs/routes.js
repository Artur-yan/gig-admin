import React from 'react';
import AppContainer from '../modules/app/containers/AppContainer';
import { Switch } from 'react-router';
import { AuthenticatedRoute, NotAuthenticatedRoute, Route } from '../support/routing';

import MainLayout from '../modules/layout/layouts/MainLayout';

import HomeContainer from '../modules/dashboard/containers/DashboardContainer';
import Login from '../modules/auth/containers/Login';
import UsersContainer from '../modules/users/UserExample/containers/UsersContainer';
import ArtistContainer from '../modules/users/artists/containers/ArtistContainer';
import NoMatchPage from '../modules/layout/containers/NoMatchPage';
import VenueContainer from "../modules/users/venues/containers/VenueContainer";
import MusicLoverContainer from "../modules/users/musicLovers/containers/MusicLoverContainer";
import GigContainer from "../modules/gigs/containers/GigContainer";
import AboutContainer from "../modules/pages/about/containers/AboutContainer";
import HelpContainer from "../modules/pages/help/containers/HelpContainer";
import PreviewContainer from "../modules/pages/preview/containers/PreviewContainer";
import PrivacyPolicyContainer from "../modules/pages/privacyPolicy/containers/PrivacyPolicyContainer";

export default () => (
  <AppContainer>
    <Switch>
      <AuthenticatedRoute exact layout={MainLayout} path='/' component={HomeContainer}/>
      <NotAuthenticatedRoute exact path='/login' component={Login}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/users' component={UsersContainer}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/artists' component={ArtistContainer}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/venues' component={VenueContainer}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/music-lovers' component={MusicLoverContainer}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/gigs' component={GigContainer}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/about' component={AboutContainer}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/help' component={HelpContainer}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/preview' component={PreviewContainer}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/privacy-policy' component={PrivacyPolicyContainer}/>
      <Route status={404} component={NoMatchPage}/>
    </Switch>
  </AppContainer>
)