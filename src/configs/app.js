import { env } from '../support/helpers/utilities';

export default {
  ENV: process.env.NODE_ENV,
  DEBUG: process.env.NODE_ENV !== 'production',
  APP_TITLE: env('REACT_APP_TITLE', 'TG'),
  API_URI: process.env.NODE_ENV === 'production' ? 'http://api.tg.myemo.am/api' : 'http://api.tg.loc/api',
  API_STORAGE_URL: process.env.NODE_ENV === 'production' ? 'http://api.tg.myemo.am/storage' : 'http://api.tg.loc/storage',
  API_CLIENT: {

    id: ''+env('REACT_APP_API_CLIENT_ID'),
    secret: env('REACT_APP_API_CLIENT_SECRET')
  }
};
