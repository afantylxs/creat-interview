import axios from 'axios';
import { message } from 'antd';
/****** 创建axios实例 ******/
const fetch = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  timeout: 10000 // 请求超时时间
});

/****** request拦截器==>对请求参数做处理 ******/
fetch.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    // const data = JSON.parse(JSON.stringify(config.data));
    // console.log('request---config', config, 'datadatadata', data);

    config.method === 'post'
      ? (config.data = { ...config.data })
      : (config.params = { ...config.params });
    config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  },
  error => {
    //请求错误处理
    console.log('请求错误处理request', error);
    Promise.reject(error);
  }
);

/****** respone拦截器==>对响应做处理 ******/
fetch.interceptors.response.use(
  response => {
    //成功请求到数据
    if (response.data.code === '200') {
      return response.data;
    } else {
      return response.data;
    }
  },
  error => {
    //响应错误处理
    let text = `TypeError: Cannot read property 'token' of undefined`;
    // localStorage.setItem("flag", false);
    console.log('响应错误response', error);

    if (error === text) {
      message.error('登录过期' + error);
      return Promise.reject('登录过期');
    }
    message.error('网络异常' + error);
    localStorage.setItem('token', null);
    localStorage.setItem('flag', false);

    return Promise.reject('网络异常');
  }
);
export default fetch;
