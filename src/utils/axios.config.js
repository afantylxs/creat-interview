import axios from "axios";

/****** 创建axios实例 ******/
const fetch = axios.create({
    baseURL: process.env.BASE_URL,  // api的base_url
    timeout: 10000 // 请求超时时间
});


/****** request拦截器==>对请求参数做处理 ******/
fetch.interceptors.request.use(config => {
    console.log('config',config);
    const { data, params } = config;
    
    config.method === 'post'
        ? config.data = { ...config.data }
        : config.params = { ...config.params };
    config.headers['Authorization'] = params ? 'Bearer ' + params.token : 'Bearer ' + data.token;

    return config;
}, error => {  //请求错误处理
    Promise.reject(error)
});

/****** respone拦截器==>对响应做处理 ******/
fetch.interceptors.response.use(
    response => {  //成功请求到数据
        if (response.data.code === '200') {
            console.log('成功');
            
        } else {
            return response.data;
        }
    },
    error => {  //响应错误处理
        let text = JSON.parse(JSON.stringify(error)).response &&　JSON.parse(JSON.stringify(error)).response.status === 404 ? '404'
            : '网络异常，请重试';
        return Promise.reject(error)
    }
);
export default fetch;
