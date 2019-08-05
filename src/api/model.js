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

// 列车牵引力特性曲线详情（包含第一列和第二列车）
const tractionView = (params) => request(`${config.baseUrl}/vtr1/vtrView`, { ...params });

// 保存列车牵引力特性曲线
const tractionSave = (params) => request(`${config.baseUrl}/vtr1/save`, { ...params });

// 获取牵引力曲线列表
const tractionList = (params) => request(`${config.baseUrl}/tcsd/listData`, { ...params });

// 获取牵引力曲线详情
const tractionLiView = (params) => request(`${config.baseUrl}/tcsd/tcsdView`, { ...params });

// 保存牵引力曲线详情
const tractionLiSave = (params) => request(`${config.baseUrl}/tcsd/save`, { ...params });

// 保存/更新车间连接参数配置
const saveAllCoupType = (params) => request(`${config.baseUrl}/allcouptype/saveAllCoupType`, { ...params });

// 查询车间连接参数详情
const getAllCoupTypeView = (params) => request(`${config.baseUrl}/allcouptype/getAllCoupTypeView`, { ...params });


export default {
    // 模型树
    createModel,
    getModels,
    getModelTree,

    // 车辆基本参数
    getVehicleBasic,
    vehicleBasicEdit,
    tractionView,
    tractionSave,
    tractionLiView,
    tractionLiSave,
    tractionList,

    // 车间链接系统
    saveAllCoupType,
    getAllCoupTypeView
}
