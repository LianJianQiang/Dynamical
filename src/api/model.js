import { request } from 'utils/request';
import config from './config';


// 创建模型
const createModel = (params) => request(`${config.baseUrl}/model/save`, { ...params });

// 打开模型
const getModels = (params) => request(`${config.baseUrl}/model/listData`, { ...params });

// 创建模型
const getModelTree = (params) => request(`${config.baseUrl}/model/modelTree`, { ...params });

// 列车基本参数（查询，包含第一列和第二列的数据）
const getVehicleBasic = (params) => request(`${config.baseUrl}/ve1/veView`, { ...params });

// 列车基本参数（新增 修改，包含第一列和第二列的数据）
const vehicleBasicEdit = (params) => request(`${config.baseUrl}/ve1/save`, { ...params });

// // 第一列车基本参数（新增、修改）
// const vehicle1BasicEdit = (params) => request(`${config.baseUrl}/ve1/save`, { ...params });

// // 第二列车基本参数（新增、修改）
// const vehicle2BasicEdit = (params) => request(`${config.baseUrl}/ve2/save`, { ...params });

// 列车一牵引特性曲线(新增、编辑)
const traction1Edit = (params) => request(`${config.baseUrl}/vtr1/save`, { ...params });

// 列车二牵引特性曲线(新增、编辑)
const traction2Edit = (params) => request(`${config.baseUrl}/vtr2/save`, { ...params });

// 列车一牵引特性曲线(详情)
const traction1 = (params) => request(`${config.baseUrl}/vtr1/vtrView`, { ...params });

// 列车二牵引特性曲线(详情)
const traction2 = (params) => request(`${config.baseUrl}/vtr2/vtrView`, { ...params });

export default {
    createModel,
    getModels,
    getVehicleBasic,
    vehicleBasicEdit,
    // vehicle1BasicEdit,
    // vehicle2BasicEdit,
    traction1Edit,
    traction2Edit,
    traction1,
    traction2,
    getModelTree
}
