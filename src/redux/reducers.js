import authReducer from '../modules/auth/redux/reducer';
import layoutReducer from '../modules/layout/redux/reducer';
import usersReducer from '../modules/users/UserExample/redux/reducer';
import artistsReducer from '../modules/users/artists/redux/reducer';
import venuesReducer from "../modules/users/venues/redux/reducer";
import musicLiversReducer from "../modules/users/musicLovers/redux/reducer";
import gigsReducer from "../modules/gigs/redux/reducer";
import pagesReducer from "../modules/pages/redux/reducer";
import dashboardReducer from "../modules/dashboard/redux/reducer";

export default {
  auth: authReducer,
  layout: layoutReducer,
  users: usersReducer,
  artists: artistsReducer,
  venues: venuesReducer,
  musicLovers: musicLiversReducer,
  gigs: gigsReducer,
  pages: pagesReducer,
  dashboard: dashboardReducer
};