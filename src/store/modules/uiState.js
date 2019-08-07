import { OPEN_CAR_DETAIL, MODEL_SAVE_CONNECT_DEFINED } from 'store/mutation-types.js';
import { CONNECT_FACETYPE_DICT } from 'common/constants'

// state
const state = {
    carDetail: {},  // 当前选中的车辆信息
    connectData: {} // key: 链接系统中的车辆id，value：{front:[], back:[]}，已定义的元件列表
}

// getters
const getters = {
    // 是否展示车辆明细图
    isOpenCarDetail(state) {
        return JSON.stringify(state.carDetail) !== '{}'
    },

    // 获取当前大样图车辆的连接系统列表
    curCarConnectDetail(state) {
        let connectId = state.carDetail.connectId
        if (connectId) {
            return state.connectData[connectId] || {};
        }
        return {}
    }
}

// actions
const actions = {
    // 保存当前选中的车辆信息
    saveCurCarDetail({ commit }, data) {
        commit({ type: OPEN_CAR_DETAIL, data })
    },

    // 保存已定义的连接系统 列表
    saveDefinedConnect({ commit }, data) {
        commit({ type: MODEL_SAVE_CONNECT_DEFINED, data })
    }
}

// mutations
const mutations = {
    // 保存当前选中的车辆信息
    [OPEN_CAR_DETAIL](state, { data }) {
        state.carDetail = data || {};
    },

    // 保存已定义的连接系统 列表
    // data: { id, faceType, eleType元件类型 }
    [MODEL_SAVE_CONNECT_DEFINED](state, { data }) {
        // state.connectData
        let connectList = state.connectData;

        !connectList[data.id] && (connectList[data.id] = { front: [], back: [] });
        if (data.faceType === CONNECT_FACETYPE_DICT.front.key) {  // 前端面
            connectList[data.id][CONNECT_FACETYPE_DICT.front.label].push(data.eleType);
        } else if (data.faceType === CONNECT_FACETYPE_DICT.back.key) {  // 后端面
            connectList[data.id][CONNECT_FACETYPE_DICT.back.label].push(data.eleType);
        }

        state.connectData = connectList;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
