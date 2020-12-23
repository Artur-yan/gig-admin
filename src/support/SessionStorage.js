import Cookies from 'universal-cookie';

export default class SessionStorage {
  cookies;

  constructor () {
    this.cookies = new Cookies();
  }

  static get(key) {
    const instance = new SessionStorage();
    return instance.cookies.get(key);
  }

  static set(key, value, options = {}) {
    const instance = new SessionStorage();
    return instance.cookies.set(key, value, options);
  }

  static remove(key, options = {}) {
    const instance = new SessionStorage();
    return instance.cookies.remove(key, options);
  }

  static getAll() {
    const instance = new SessionStorage();
    return instance.cookies.getAll();
  }
}