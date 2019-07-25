
import { SAVE_MODEL_DATA, CREATE_MODEL, INIT_MODELS } from 'store/mutation-types.js';
import { createTree, MODEL_TREE_TYPE } from 'common/constants';

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
    modelsTree: []      // 模型树数据
}

// getters
const getters = {
    // 获取模型树
    getModel(state) {
        return ({ id, name }) => {
            return state.modelsTree.filter(item => (item.id && item.id === id) || (item.modelName && item.modelName === name));
        }
    },

    // 获取模型树
    getModelTree(state) {
        return ({ name }) => {
            return state.modelsTree.filter(item => (item.modelName && item.modelName === name));
        }
    },

    // 根据id获取模型树上的节点
    getTreeNode(state) {
        return ({ id }) => {
            return getTreeNodeInfo(state.modelsTree, id);
        }
    },

    getTreeListByType(state, getters) {
        return ({ modelName, type }) => {
            let curTree = getters.getModelTree({ name: modelName })[0];
            return getTreeNodeList(curTree, type);
        }
    },


    // 根据id获取数据
    getNodeArgs(state) {
        return (id) => {
            let datas = state['modelsData'][id] || {};
            return datas;
        }
    },

    // 获取车辆列表，包含每列车包含该车所有数据（车辆数据和连接系统数据）
    getCarListData(state, getters) {
        return ({ modelName }) => {
            let vehicleList = getters.getTreeListByType({ modelName, type: MODEL_TREE_TYPE['vehicle'] });
            // console.log(vehicleList);
            let connectList = getters.getTreeListByType({ modelName, type: MODEL_TREE_TYPE['connect'] });
            // console.log(connectList);

            let result = {};
            let row = null;
            vehicleList.map((item) => {
                for (let i = 0; i < connectList.length; i++) {
                    let curConnect = connectList[i];
                    if (row !== item.row) row = item.row;
                    if (item.row === curConnect.row && item.col === curConnect.col) {
                        if (!result[row]) result[row] = [];
                        result[row].push({
                            row: item.row,
                            col: item.col,
                            label: item.label,
                            vehicleId: item.id,
                            connectId: curConnect.id,
                            vehicleData: item,
                            connectData: curConnect
                        });
                        connectList.splice(i, 1);
                    }
                }
            });

            return Object.entries(result);
        }
    },

    // 获取单个车辆列表，包含每列车包含该车所有数据（车辆数据和连接系统数据）
    getCarData(state, getter) {
        return ({ row, col, modelName }) => {
            row = String(row);
            col = String(col);

            const list = getter.getCarListData({ modelName });

            for (let i = 0; i < list.length; i++) {
                const curLi = list[i];
                const curRow = String(curLi[0]);
                const curCol = curLi[1];

                if (curRow === row) {
                    for (let j = 0; j < curCol.length; j++) {
                        if (String(curCol[j]['col']) === col) {
                            return curCol[j];
                        }
                    }
                }
            }

            return null;
        }
    },

    // 判断模型树是否存在
    isRepeat(state) {
        return ({ id, name }) => {
            return state.modelsTree.filter(item => (item.id && item.id === id) || (item.modelName && item.modelName === name)).length > 0
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
