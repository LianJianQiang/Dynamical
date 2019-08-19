<template>
    <div :class="$style.root">
        <div :class="$style.info">
            <div class="clearfix">
                <div
                    class="fll"
                    :class="$style.tableWrap"
                    v-for="(item,idx) in tableData"
                    :key="idx"
                >
                    <div :class="$style.title">{{item.name}}</div>
                    <div :class="$style.desc">车辆质量</div>
                    <el-table :data="item.columns" border size="medium">
                        <el-table-column
                            v-for="(col,i) in item.columns[0]"
                            :key="i"
                            :prop="col.m"
                            :label="col.carNum"
                            width="100"
                        >
                            <template slot-scope="scope">
                                <el-input-number :controls="false" v-model="scope.row.m" :min="0"></el-input-number>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div :class="$style.speed">
                        车辆速度(km/h)：
                        <el-input-number
                            :class="$style.speedInp"
                            :controls="false"
                            v-model="item.v"
                            :min="0"
                        />
                    </div>
                </div>
            </div>
            <div :class="$style.connectWrap" v-if="descList.length > 0">
                <div :class="$style.title">车辆连接系统</div>
                <div :class="$style.desc" class="clearfix" v-for="item in descList" :key="item.id">
                    <span class="fll">{{item.coupname}}</span>
                    <div :class="$style.cont">
                        <span v-for="(desc, idx) in item.descArr" :key="idx">{{desc}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.legend" class="clearfix">
            <div v-for="(item, idx) in chartList" :key="idx" :class="$style.legendBox" class="fll">
                <div :class="$style.carListWrap">
                    <CarList :list="item[1]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
// import { MODEL_TREE_TYPE } from "common/constants";
// import CarBody from "./CarBody";
import { model } from "api";

import CarList from "./CarList";
import { TEMP_FIELD_DICT } from "./constants";

export default {
    name: "Args",
    components: {
        // CarBody
        CarList
    },
    data() {
        return {
            tableData: [],
            descList: [],
            chartList: []
        };
    },
    props: {},
    computed: {
        ...mapState("models", ["curModelId"])
    },

    methods: {
        refreshTemp(cb) {
            let modelId = this.curModelId;

            // TODO 测试
            modelId = "1158299331507040256";

            model.compAllcouptypeTemp({ modelId }).then(res => {
                if (!res) return;
                typeof cb === "function" && cb(modelId);
            });
        },

        getPageData(modelId) {
            modelId = modelId || this.curModelId;
            Promise.all([
                model.getAllCarDatas({ id: this.curModelId }),
                model.getAllCoupTypeList({ modelId }), // 图形数据
                model.getAllcouptypeTemp({ modelId }) // 文案数据
            ]).then(result => {
                this.handleCarTableData(result[0]);
                this.handleChartData(result[1]);
                this.handleOfficialData(result[2]);
            });
        },

        handleCarTableData(res) {
            if (!res) return;
            let { ve1 = {}, ve2 = {}, caList = [] } = res.data || {};

            let result = [
                { ...ve1, name: "第1列", columns: [[]] },
                { ...ve2, name: "第2列", columns: [[]] }
            ];
            caList.map(item => {
                if (!item.m) item.m = 0;
                if (item.row === "1") {
                    result[0].columns[0].push(item);
                } else if (item.row === "2") {
                    result[1].columns[0].push(item);
                }
            });

            result[0].columns[0].sort((a, b) => a.cal - b.cal);
            result[1].columns[0].sort((a, b) => a.cal - b.cal);
            this.tableData = result;
        },

        handleChartData(res) {
            if (!res) return;
            let data = res.data || [];
            let obj = {};

            for (let i = 0; i < data.length; i++) {
                let curItem = data[i];

                let arr = curItem.carNum.split("-");
                let row = arr[0]; // 第几列
                let cal = arr[1]; // 第几辆

                if (!obj[row]) {
                    obj[row] = [];
                } else {
                    // 判断是否已经存储过该车辆
                    let cur = obj[row].find(li => li.carNum === curItem.carNum);
                    if (cur) continue;
                }

                // 前端面信息
                curItem.front =
                    data.find(
                        li =>
                            li.carNum === curItem.carNum && li.faceType === "1"
                    ) || {};
                // 后端面信息
                curItem.back =
                    data.find(
                        li =>
                            li.carNum === curItem.carNum && li.faceType === "2"
                    ) || {};

                obj[row].push({
                    row,
                    cal,
                    ...curItem
                });
            }

            for (let i in obj) {
                obj[i].sort((a, b) => a.cal - b.cal);
            }

            this.chartList = Object.entries(obj);
        },
        handleOfficialData(res) {
            if (!res) return;
            let data = res.data || [];

            // data.sort((a, b) => a.coupname - b.coupname);
            data.map(item => {
                let arr = [];
                for (let i in TEMP_FIELD_DICT) {
                    if (item[i] || item[i] === 0) {
                        let str = TEMP_FIELD_DICT[i].name + ": ";
                        if (TEMP_FIELD_DICT[i].dict) {
                            str += TEMP_FIELD_DICT[i].dict[item[i]];
                        } else {
                            str += item[i];
                        }
                        arr.push(str);
                    }
                }
                item.descArr = arr;
            });

            this.descList = data;
        },

        initData() {
            this.refreshTemp(this.getPageData);
        }
    },

    mounted() {
        // console.log(this.getCarSpeed)
        this.initData();
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;

    .info {
        max-height: 350px;
        overflow: auto;
        padding: 30px;
        background: #fff;
        border-radius: $raduis_1;
        margin-bottom: 20px;

        .title {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 20px;
        }
    }
    .tableWrap {
        width: 50%;
        padding-right: 10px;
        &:last-child {
            padding-right: 0;
            padding-left: 10px;
        }

        .desc {
            margin-bottom: 10px;
        }
        .speed {
            margin: 20px 0;

            .speedInp {
                width: 100px;
                :global {
                    .el-input__inner {
                        border: none !important;
                    }
                }
            }
        }
    }

    .connectWrap {
        margin: 20px 0;
        .desc {
            font-size: 12px;
            text-align: justify;
            line-height: 2em;
            margin-bottom: 5px;
            .cont {
                margin-left: 20px;
                text-align: justify;
                margin-bottom: 15px;
                span {
                    display: inline-block;
                    padding: 0 10px;
                }
            }
        }
    }

    .legend {
        height: 350px;
        .legendBox {
            width: 50%;
            height: 100%;
            overflow: auto;

            .carListWrap {
                min-height: 100%;
                padding: 20px;
                background-color: #fff;
                border-radius: $radius_1;
                margin-right: 10px;
            }

            &:last-child {
                .carListWrap {
                    margin-right: 0;
                    margin-left: 10px;
                }
            }
        }
    }
    :global {
        .el-table {
            .cell {
                height: 40px;
                line-height: 40px;
            }
        }
    }
}
</style>

