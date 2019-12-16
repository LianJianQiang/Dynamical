import { request } from 'utils/request';
import config from './config';

// 获取参数列表
const getArgsList = (params) => request(`${config.baseUrl}/resultrecord/getParamList`, { ...params });

// 根据参数获取车辆列表
const getCaListBYCode = (params) => request(`${config.baseUrl}/resultrecord/getCaListBYCode`, { ...params });

// 计算
const getCalculateResults = (params) => request(`${config.baseUrl}/resultrecord/getCalculateResults`, { ...params }, { showLoading: false });

// 获取计算结果详情
const getResultInfo = (params) => request(`${config.baseUrl}/resultrecord/getResultInfo`, { ...params });


export default {
    getArgsList,
    getCaListBYCode,
    getCalculateResults,
    getResultInfo
}
