import axios from 'axios'
import { Message } from 'element-ui';
import loading from 'utils/loading';


const instance = axios.create({
    timeout: 30000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
        function (data) {
            let ret = ''
            for (let it in data) {
                let value;
                if (typeof data[it] === 'object') {
                    value = encodeURIComponent(JSON.stringify(data[it]));
                } else {
                    value = encodeURIComponent(data[it])
                }
                ret += encodeURIComponent(it) + '=' + value + '&';
            }
            return ret
        }
    ]
});

// 响应拦截器
instance.interceptors.response.use(function (response) {
    const { data = {} } = response;
    if (response.status !== 200) {
        Message({
            message: response.statusText || "数据请求失败",
            type: 'error'
        });
    }
    if (data.code !== '200') {
        Message({
            message: data.message || '系统异常',
            type: 'error'
        });
        return Promise.reject(data);
    }
    return data;
}, function (error) {
    // 响应错误
    return Promise.reject(error);
});


// 跳转到登陆页面
export function openLogin() {
    window.location.href = '/';
}

export function request(url, data = {}, { method = 'post', showLoading = true } = {}) {
    showLoading && loading.show();
    // 通用参数
    let common = {};

    // 生成请求数据
    let requestData = Object.assign({}, common, data);

    // axios配置
    const config = {
        method,
        url,
        data: requestData
    };

    return instance.request(config)
        .then((data) => {
            loading.hide();
            if (data.code !== '200') return Promise.reject(data);
            return data;
        })
        .catch((error) => {
            loading.hide();
            console.log('request catch : ', error)
        })
};


export default request;
