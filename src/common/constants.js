import Icon from 'assets/icon';

export const MENU_LIST = [
    // {
    //     name: '参数配置',
    //     key: 'home',
    //     icon: Icon['home'],
    //     activeIcon: Icon['homeActive'],
    //     url: '/arg-cfg'
    // },
    {
        name: '模型建设',
        key: 'model',
        icon: Icon['model'],
        activeIcon: Icon['modelActive'],
        url: '/page/model'
    },
    {
        name: '参数配置',
        key: 'argcfg',
        icon: Icon['arg'],
        activeIcon: Icon['argActive'],
        url: '/page/arg-cfg'
    },
    {
        name: '计算报告',
        key: 'report',
        icon: Icon['report'],
        activeIcon: Icon['reportActive'],
        url: '/page/report'
    }
];

// export const MODEL_TREE_TYPE = {
//     train: 'train',         // 列车参数
//     basic: 'basic',         // 列车基本参数
//     vehicle: 'vehicle',     // 车辆参数
//     connect: 'connect',     // 连接系统
//     circuit: 'circuit',     // 线路
//     args: 'args'            // 模型参数
// }

export const SESSION_USERINFO_KEY = '__USERINFO__';


export const MODEL_TREE_TYPE = {
    train: 'LCCS',         // 列车参数
    basic: 'VE',         // 列车基本参数
    vehicle: 'CA',     // 车辆参数
    connect: 'LJXT',     // 连接系统
    circuit: 'XLCS',     // 线路
    args: 'MXCSB'            // 模型参数
}

export const MODEL_TYPE_LINK_LIST = ['LCCS', 'VE', 'CA', 'LJXT', 'XLCS', 'MXCSB']

/**
 * 获取某个模型树上的所有对应type的node
 * @param {Tree} tree  单一模型树
 * @param {*} type type
 */
export const getTreeNodeByType = (tree, type) => {
    let result = [];

    if (!tree.children || tree.children.length === 0) return [];
    const getFunc = (data) => {
        data.map(item => {
            if (item.type === type) {
                result.push(item);
            }
            item.children && item.children.length > 0 && getFunc(item.children);
        })
    }

    getFunc(tree.children);
    return result;
}

export const createTree = (name, trainNum = 0, vehicleNum = []) => {
    const vehicleList = ({ type, row = 0, col = [] }) => {
        let result = [];
        for (let i = 1; i <= row; i++) {
            for (let j = 1; j <= col[i - 1]; j++) {
                result.push({
                    id: `${name}_${type}_${i}_${j}`,
                    type,
                    row: i,
                    col: j,
                    label: `第${i}列 第${j}辆`,
                    modelName: name
                })
            }
        }
        return result;
    };

    return {
        id: name,
        label: `${name}`,
        modelName: name,
        children: [
            {
                id: `${name}_${MODEL_TREE_TYPE.train}`,
                type: `${MODEL_TREE_TYPE.train}`,
                label: "列车参数",
                modelName: name,
                children: [
                    {
                        id: `${name}_${MODEL_TREE_TYPE.basic}`,
                        type: `${MODEL_TREE_TYPE.basic}`,
                        modelName: name,
                        label: "列车基本参数"
                    },
                    {
                        id: `${name}_${MODEL_TREE_TYPE.vehicle}`,
                        label: "车辆参数",
                        type: `${MODEL_TREE_TYPE.vehicle}`,
                        modelName: name,
                        children: vehicleList({ type: MODEL_TREE_TYPE.vehicle, row: trainNum, col: vehicleNum })
                    },
                    {
                        id: `${name}_${MODEL_TREE_TYPE.connect}`,
                        label: "车连接系统",
                        type: `${MODEL_TREE_TYPE.connect}`,
                        modelName: name,
                        children: vehicleList({ type: MODEL_TREE_TYPE.connect, row: trainNum, col: vehicleNum })
                    }
                ]
            },
            {
                id: `${name}_${MODEL_TREE_TYPE.circuit}`,
                type: `${MODEL_TREE_TYPE.circuit}`,
                modelName: name,
                label: "线路参数"
            },
            {
                id: `${name}_${MODEL_TREE_TYPE.args}`,
                type: `${MODEL_TREE_TYPE.args}`,
                modelName: name,
                label: "模型参数"
            }
        ]
    }
}

