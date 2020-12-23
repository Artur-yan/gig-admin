import { all } from 'redux-saga/effects';
import authSagas from '../modules/auth/redux/sagas';
import usersSagas from '../modules/users/UserExample/redux/sagas';
import artistsSagas from '../modules/users/artists/redux/sagas';
import venuesSagas from "../modules/users/venues/redux/sagas";
import musicLiversSagas from "../modules/users/musicLovers/redux/sagas";
import gigsSagas from "../modules/gigs/redux/sagas";
import pagesSagas from "../modules/pages/redux/sagas";

function* rootSaga () {
  yield all([
    authSagas,
    usersSagas,
    artistsSagas,
    venuesSagas,
    musicLiversSagas,
    gigsSagas,
    pagesSagas
  ])
}

export default rootSaga;