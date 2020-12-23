import SessionStorage from '../SessionStorage';
import moment from '../../configs/moment';

export const saveSession = ({user, accessToken, expireAt }) => {
  const expires = moment(expireAt);

  const options = {
    path: '/',
    expires: expires.toDate()
  };

  SessionStorage.set('accessToken', accessToken, options);
  SessionStorage.set('user', user, options);
  SessionStorage.set('tokenExpiresAt', expireAt, options);
};

export const destroySession = () => {
  const options = {
    path: '/'
  };

  SessionStorage.remove('accessToken', options);
  SessionStorage.remove('tokenExpiresAt', options);
  // SessionStorage.remove('refreshToken', options);
};