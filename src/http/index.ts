import axios from 'axios';
import { message } from 'antd';

axios.interceptors.response.use(
  (response) => {
    // console.log(response)
    return response;
  },
  (error) => {
    if (error.response && error.response.status == 401) {
      // showLogin()
    }
    return Promise.reject(error);
  }
);

// export const baseUrl = '/api'
export const baseUrl = process.env.UMI_APP_BASE_URL;
export function get(url: string, data: any) {
  return new Promise((res, rej) => {
    if (data) {
      let params = [];
      for (let i in data) {
        params.push(`${i}=${data[i]}`);
      }
      url += '?' + params.join('&');
    }
    axios({
      method: 'get',
      url: url.slice(0, 4) === 'http' ? url : baseUrl + '/api' + url,
      headers: {
        Authorization: data.loginAddress
          ? localStorage.getItem('rwa-token-' + data.loginAddress)
          : '',
      },
    })
      .then((result) => {
        console.log(result);
        if (Number(result.status) == 200 && Number(result.data.code) == 0) {
          res(result.data);
        } else if (Number(result.data.code) == 1) {
          res(result.data);
        } else if (Number(result.data.code) == 401) {
          message.error('Please login again');
          localStorage.removeItem('rwa-token-' + data.loginAddress);
          rej(result.data);
        } else {
          rej(result.data);
        }
      })
      .catch((err) => rej(err));
  });
}
export function post(url: string, data: any) {
  return new Promise((res, rej) => {
    //console.log(url.slice(0, 4) === 'http', 'urlurlurlurlurlurlurl');
    axios({
      method: 'post',
      url: url.slice(0, 4) === 'http' ? url : baseUrl + '/api' + url,
      data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: data.loginAddress
          ? localStorage.getItem('rwa-token-' + data.loginAddress)
          : localStorage.getItem('token'),
        CHANNEL: 'RWA',
      },
    })
      .then((result) => {
        console.log(result);
        if (Number(result.status) == 200 && Number(result.data.code) == 200) {
          res(result.data);
        } else if (Number(result.data.code) == 401) {
          message.error('User is not logged in');
          localStorage.removeItem('rwa-token-' + data.loginAddress);
          rej(result.data);
        } else {
          rej(result.data);
        }
      })
      .catch((err) => rej(err));
  });
}
