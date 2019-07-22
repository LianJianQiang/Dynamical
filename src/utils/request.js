import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://192.168.10.19:30006/',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// 跳转到登陆页面
export function openLogin() {

}

export function request(url, data = {}, { method = 'post', showLoading = true } = {}) {
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
        .then((response) => {
            const { data = {} } = response;
            return data;
        })
        .catch((error) => {
            console.log(error);
        })
};


export default request;
