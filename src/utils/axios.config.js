import axios from 'axios';
import { message } from 'antd';
/****** 创建axios实例 ******/
const fetch = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  timeout: 6000 // 请求超时时间
});

/****** request拦截器==>对请求参数做处理 ******/
fetch.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    // const data = JSON.parse(JSON.stringify(config.data));
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
    if (error && error.response && error.response.status === 401) {
      message.error('请重新登录');
      localStorage.setItem('token', null);
      localStorage.setItem('flag', false);
      return;
    }
    return Promise.reject(error.response);
  }
);
export default fetch;
