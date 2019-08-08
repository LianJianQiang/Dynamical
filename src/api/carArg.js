/**
 * 模型树，车辆参数 api列表
 */

import { request } from 'utils/request';
import config from './config';

// 车辆参数 详情
const vehicleView = (params) => request(`${config.baseUrl}/ca/view`, { ...params }, {
    method: 'post'
});

// 车辆参数 编辑
const vehicleEdit = (params) => request(`${config.baseUrl}/ca/view`, { ...params }, {
    method: 'post'
});

// 车辆参数 复制
const vehicleCopy = (params) => request(`${config.baseUrl}/ca/caCopy`, { ...params }, {
    method: 'post'
});



export default {
    vehicleView,
    vehicleEdit,
    vehicleCopy
}
