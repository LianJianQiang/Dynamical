
import { SAVE_MODEL_DATA, CREATE_MODEL, INIT_MODELS, MODEL_SAVE_TREE_DATA, MODEL_SET_CUR_MODEL_ID, MODEL_SET_CUR_MODEL_NODE } from 'store/mutation-types.js';
import { createTree, MODEL_TREE_TYPE } from 'common/constants';

import { handleTreeData } from 'utils/util';

import { model } from "api";


// 根据model的数据生成tree
const getTreeData = (params = {}) => {
    let { modelName, no1 = {}, no2 = {} } = params;
    let num1 = no1.num ? no1.num : 0;
    let num2 = no2.num ? no2.num : 0;

    return createTree(modelName, 2, [num1, num2]);
}

const getTreeNodeInfo = (trees, id) => {
    let result = null;

    const getFunc = (arr) => {
        if (result) return;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                result = arr[i];
                return;
            } else if (arr[i].children && arr[i].children.length > 0) {
                getFunc(arr[i].children);
            }
        }
    }

    getFunc(trees);
    return result;
}

const getTreeNodeList = (tree = {}, type) => {
    let rootChild = tree.children || [];
    let result = [];

    const getFunc = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].type === type && !arr[i].children) {
                result.push(arr[i]);
            }

            if (arr[i].children) {
                getFunc(arr[i].children);
            }
        }
    }

    getFunc(rootChild);
    return result;
}


/*
    models={
        treeNodeId: {...}
    }
*/

// state
const state = {
    modelsData: {},     // 每个元件的数据{ id: data }
    modelTreeCache: [],     // modelTree原始数据缓存
    modelsTree: [],      // 模型树数据
    curModelId: '',       // 当前选中模型树的id
    curTreeNodeId: ""      // 当前选中的tree节点id
}

// getters
const getters = {
    // 获取模型树
    // getModel(state) {
    //     return ({ id, name }) => {
    //         return state.modelsTree.filter(item => (item.id && item.id === id) || (item.modelName && item.modelName === name));
    //     }
    // },

    // 获取模型树
    // getModelTree(state) {
    //     return ({ name }) => {
    //         return state.modelsTree.filter(item => (item.modelName && item.modelName === name));
    //     }
    // },

    // 根据id获取模型树上的节点
    // getTreeNode(state) {
    //     return ({ id }) => {
    //         return getTreeNodeInfo(state.modelsTree, id);
    //     }
    // },

    // getTreeListByType(state, getters) {
    //     return ({ modelName, type }) => {
    //         let curTree = getters.getModelTree({ name: modelName })[0];
    //         return getTreeNodeList(curTree, type);
    //     }
    // },


    // 根据id获取数据   模型参数表中有用到，后期删除
    getNodeArgs(state) {
        return (id) => {
            let datas = state['modelsData'][id] || {};
            return datas;
        }
    },

    // 获取车辆列表，包含每列车包含该车所有数据（车辆数据和连接系统数据）
    // getCarListData(state, getters) {
    //     return ({ modelName }) => {
    //         let vehicleList = getters.getTreeListByType({ modelName, type: MODEL_TREE_TYPE['vehicle'] });
    //         let connectList = getters.getTreeListByType({ modelName, type: MODEL_TREE_TYPE['connect'] });

    //         let result = {};
    //         let row = null;
    //         vehicleList.map((item) => {
    //             for (let i = 0; i < connectList.length; i++) {
    //                 let curConnect = connectList[i];
    //                 if (row !== item.row) row = item.row;
    //                 if (item.row === curConnect.row && item.col === curConnect.col) {
    //                     if (!result[row]) result[row] = [];
    //                     result[row].push({
    //                         row: item.row,
    //                         col: item.col,
    //                         label: item.label,
    //                         vehicleId: item.id,
    //                         connectId: curConnect.id,
    //                         vehicleData: item,
    //                         connectData: curConnect
    //                     });
    //                     connectList.splice(i, 1);
    //                 }
    //             }
    //         });

    //         return Object.entries(result);
    //     }
    // },

    // 获取单个车辆列表，包含每列车包含该车所有数据（车辆数据和连接系统数据）
    // getCarData(state, getter) {
    //     return ({ row, col, modelName }) => {
    //         row = String(row);
    //         col = String(col);

    //         const list = getter.getCarListData({ modelName });

    //         for (let i = 0; i < list.length; i++) {
    //             const curLi = list[i];
    //             const curRow = String(curLi[0]);
    //             const curCol = curLi[1];

    //             if (curRow === row) {
    //                 for (let j = 0; j < curCol.length; j++) {
    //                     if (String(curCol[j]['col']) === col) {
    //                         return curCol[j];
    //                     }
    //                 }
    //             }
    //         }

    //         return null;
    //     }
    // },

    // 判断模型树是否存在
    // isRepeat(state) {
    //     return ({ id, name }) => {
    //         return state.modelsTree.filter(item => (item.id && item.id === id) || (item.modelName && item.modelName === name)).length > 0
    //     }
    // },

    /** ---------------- 新 ------------------- */
    getTreeNodeByType(state) {
        let { modelTreeCache } = state;
        return (type) => {
            return modelTreeCache.filter((item) => { return item.type === type });
        }
    },

    getTreeNodeById(state) {
        let { modelTreeCache } = state;
        return (id) => {
            return modelTreeCache.find((item) => { return item.id === id }) || {};
        }
    },

    curTreeNodeInfo(state, getter) {
        return getter.getTreeNodeById(state.curTreeNodeId);
    },

    curCarNum(state, getter) {
        let curVe = getter.curTreeNodeInfo;
        if (!curVe.row || !curVe.cal) return null;
        return { row: curVe.row, col: curVe.cal }
    },

    // 获取车辆列表数据，包含车辆信息和链接系统信息
    allCarData(state, getter) {
        // 获取车辆参数中的车辆列表
        let clcsArr = getter.getTreeNodeByType(MODEL_TREE_TYPE['vehicle']);
        // 获取链接系统中的车辆列表
        let ljxtArr = getter.getTreeNodeByType(MODEL_TREE_TYPE['connect']);

        // 根据row和col将车辆的 车辆参数 和 链接系统 的节点数据进行合并
        let result = {};
        let row = null;
        clcsArr.map((item) => {
            if (row !== item.row) row = item.row;
            if (!result[row]) result[row] = [];

            let curConnect = ljxtArr.find((li) => li.row === item.row && li.cal === item.cal) || {};
            let json = {
                row: item.row,
                cal: item.cal,
                name: item.name,
                vehicleId: item.id,
                connectId: curConnect.id,
                vehicleData: item,
                connectData: curConnect
            }
            result[row].push(json);
        });

        for (let i in result) {
            result[i].sort((a, b) => a.cal - b.cal);
        }

        return Object.entries(result);
    },

    // 通过车号获取车辆信息
    getCarDataByNum(state, getter) {
        return (row, cal) => {
            if (!row || !cal) return null;
            let allCarData = getter.allCarData;

            for (let i = 0; i < allCarData.length; i++) {
                if (allCarData[i][0] === row) {
                    let curRow = allCarData[i][1];
                    for (let j = 0; j < curRow.length; j++) {
                        if (curRow[j].cal === cal) {
                            return curRow[j];
                        }
                    }
                }
            }
            return null;
        }
    }

}

// actions
const actions = {
    saveModelData({ commit }, { id, data }) {
        // TODO 是否需要保存到服务端
        commit({ type: SAVE_MODEL_DATA, id, data })
    },

    createModel({ commit }, modelName) {
        commit({ type: CREATE_MODEL, modelName })
    },

    /** ---------------- 新 ------------------- */
    // 从服务端获取treeData
    getModelData({ commit }, id) {
        model.getModelTree({ id }).then(res => {
            if (!res) return;
            commit({ type: MODEL_SAVE_TREE_DATA, treeData: res.data || [] })
            commit({ type: MODEL_SET_CUR_MODEL_ID, id })
        })
    },

    // 保存当前选中的treeData
    saveModelTreeData({ commit }, treeData) {
        commit({ type: MODEL_SAVE_TREE_DATA, treeData })
    },

    // 当前选中的model的id
    setCurModelId({ commit }, id) {
        commit({ type: MODEL_SET_CUR_MODEL_ID, id })
    },

    // 当前选中的treeNode
    setCurTreeNodeId({ commit }, id) {
        commit({ type: MODEL_SET_CUR_MODEL_NODE, id })
    }
}

// mutations
const mutations = {
    // 页面初始化时，从session中读取数据并保存
    [INIT_MODELS](state, { models, modelsTree }) {

    },
    [SAVE_MODEL_DATA](state, { id, data }) {
        if (!data) return;
        state['modelsData'][id] = data;

        // basic中，设置每列车车辆数后，更新tree
        if (data.type === MODEL_TREE_TYPE.basic) {
            let { modelName, no1, no2 } = data;
            let { modelsTree } = state;

            // TODO 暂时将name作为标识
            let idx = modelsTree.findIndex((item) => item.modelName && item.modelName === modelName);
            let tree = getTreeData({ modelName, no1, no2 });
            if (idx === -1) {
                modelsTree.push(tree);
            } else {
                modelsTree.splice(idx, 1, tree);
            }
        }
    },
    [CREATE_MODEL](state, { modelName }) {
        state.modelsTree.push(getTreeData({ modelName }));
    },

    /** -------------------------- 新---------- */
    // 保存当前选中的treeData
    [MODEL_SAVE_TREE_DATA](state, { treeData }) {
        let trees = handleTreeData(treeData);

        state.modelsTree = trees;
        state.modelTreeCache = treeData;    // 缓存数据
    },

    // 当前选中的model的id
    [MODEL_SET_CUR_MODEL_ID](state, { id }) {
        state.curModelId = id;
    },

    // 当前选中的treeNode
    [MODEL_SET_CUR_MODEL_NODE](state, { id }) {
        state.curTreeNodeId = id;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
