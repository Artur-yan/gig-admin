import axios from 'axios';
import env from '../configs/app';
import SessionStorage from './SessionStorage';
import qs from 'qs';

export default class ApiClient {
  static defaultConfigs = {
    headers: {},
    params: {},
    paramsSerializer: function(params) {
      return qs.stringify(params, {arrayFormat: 'brackets'})
    }
  };

  configs = {};

  constructor () {
    this.resetConfigs();
  }

  resetConfigs() {
    this.configs = Object.assign({}, ApiClient.defaultConfigs);
  }

  setConfig(key, value) {
    this.configs = Object.assign({}, this.configs, {
      [key]: value
    });
  }

  getRuntimeConfigs() {
    const token = SessionStorage.get('accessToken');
    let headers = {};

    if (token) {
      headers['Token'] = token;
    }

    return Object.assign({}, this.configs, {
      headers
    });
  }

  mergeConfigs(params, headers, configs) {
    const runtimeConfigs = this.getRuntimeConfigs();
    return Object.assign(
      {},
      runtimeConfigs,
      Object.assign(
        {},
        configs,
        {
          params: Object.assign({}, runtimeConfigs.params, params),
          headers: Object.assign({}, runtimeConfigs.headers, headers)
        }
      )
    );
  }

  uploadProgress(callback) {
    this.setConfig('onUploadProgress', callback);
  }

  cancelToken() {
    return axios.CancelToken.source();
  }

  getCancel() {
    const source = this.cancelToken();
    this.setConfig('cancelToken', source.token);
    return source.cancel;
  }

  isCancel(error) {
    return axios.isCancel(error);
  }

  get(uri, params = {}, headers = {}, configs = {}) {
    return axios.get(`${env.API_URI}/${uri}`,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data);
  }

  post(uri, data, params = {}, headers = {}, configs = {}) {
    return axios.post(`${env.API_URI}/${uri}`, data,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data);
  }

  put(uri, data, params = {}, headers = {}, configs = {}) {
    return axios.put(`${env.API_URI}/${uri}`, data,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data);
  }

  delete(uri, params = {}, headers = {}, configs = {}) {
    return axios.delete(`${env.API_URI}/${uri}`,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data);
  }
}