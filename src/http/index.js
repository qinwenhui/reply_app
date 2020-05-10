import axios from 'axios';
import {BASE_URL} from './config'
import store from  '@/store/store'

let http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    //将token自动封装到请求头Authorization
    'Token': ''
  },
  transformRequest: [function (data, header) {
    //检查数据是否是formData，是就直接转化
    if(data instanceof FormData){
      return data;
    }
    //修改请求的Authorization
    header.Token=store.getters.token
    let newData = '';
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
    }
    return newData;
  }]
});

function apiAxios(method, url, params, response, headers) {
  http({
    method: method,
    url: url,
    headers: headers,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }).then(function (res) {
    response(res);
  }).catch(function (err) {
    response(err);
  })
}

export default {
  get: function (url, params, response, headers) {
    return apiAxios('GET', url, params, response, headers)
  },
  post: function (url, params, response, headers) {
    return apiAxios('POST', url, params, response, headers)
  },
  put: function (url, params, response, headers) {
    return apiAxios('PUT', url, params, response, headers)
  },
  delete: function (url, params, response, headers) {
    return apiAxios('DELETE', url, params, response, headers)
  }
}
