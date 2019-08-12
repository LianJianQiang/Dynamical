/**
 * 模型树，线路参数 api列表
 */

import { request } from 'utils/request';
import config from './config';

// 线路参数 获取线路参数列表
const getCircleData = (params) => request(`${config.baseUrl}/lp/getLpData`, { ...params });

// 线路参数 保存/修改线路参数
const saveCircleData = (params) => request(`${config.baseUrl}/lp/saveLp`, { ...params });

// 线路参数 删除线路参数
const delCircleRow = (params) => request(`${config.baseUrl}/lp/delLp`, { ...params });


export default {
    getCircleData,
    saveCircleData,
    delCircleRow
}
