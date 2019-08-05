import { request } from 'utils/request';
import config from './config';


/** ---------------------------- 压溃管 ---------------------------- */
// 获取压溃管模版列表
const getYKGTempList = (params) => request(`${config.baseUrl}/ykgtemp/ykgTempData`, { ...params });

// 保存压溃管模版
const saveYKGTemp = (params) => request(`${config.baseUrl}/ykgtemp/saveYkgTemp`, { ...params });

// 删除压溃管模版
const delYKGTemp = (params) => request(`${config.baseUrl}/ykgtemp/delYkgTemp`, { ...params });

// 根据id查询压溃管信息详情
const getYKGTempView = (params) => request(`${config.baseUrl}/ykgtemp/getYkgTempView`, { ...params });

export default {
    getYKGTempList,
    delYKGTemp,
    saveYKGTemp,
    getYKGTempView
}
