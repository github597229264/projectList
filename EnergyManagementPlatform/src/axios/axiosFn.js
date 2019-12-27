import axios from './request.js'
import qs from 'qs';

export function getAjax(url) {
  return new Promise((reslove, reject) => {
    axios.get(url)
      .then(res => {
        reslove(res);
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function postAjax(url, params = {}) {
  return new Promise((reslove, reject) => {
    axios.post(url, qs.stringify(params), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res => {
        reslove(res);
      })
      .catch(err => {
        reject(err)
      })
  })
}
export function http(url, type, params = {}) {
  return new Promise((reslove, reject) => {
    axios({
      method: type,
      url: url,
      data: params
    }).then(res => {
      reslove(res)
    }).catch(err => {
      reject(err)
    })
  })
}
