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
                    <el-table :data="item.tableData" border size="medium">
                        <el-table-column
                            v-for="(col,i) in item.columns"
                            :key="i"
                            :prop="col.props"
                            :label="col.label"
                            width="150"
                        ></el-table-column>
                    </el-table>
                    <div :class="$style.speed">车辆速度：180km/h</div>
                </div>
            </div>
            <div :class="$style.connectWrap">
                <div :class="$style.title">车辆连接系统</div>
                <div :class="$style.desc" class="clearfix">
                    <span class="fll">A</span>
                    <div
                        :class="$style.cont"
                    >这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字</div>
                </div>
                <div :class="$style.desc" class="clearfix">
                    <span class="fll">B</span>
                    <div
                        :class="$style.cont"
                    >这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字这是一串很长很长的文字</div>
                </div>
            </div>
        </div>
        <div :class="$style.legend" class="clearfix">
            <div v-for="(item, idx) in listData" :key="idx" :class="$style.legendBox" class="fll">
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
import CarList from "components/CarList";

import { model } from "api";

export default {
    name: "Args",
    components: {
        // CarBody
        CarList
    },
    data() {
        return {};
    },
    props: {},
    computed: {
        ...mapState("models", ["curModelId"]),

        // 车辆速度，临时方案
        // getCarSpeed() {
        //     let data = this.getCarData("ces_basic", "speed");
        //     console.log(data);
        //     return data;
        // },

        listData() {
            return [];
        },
        tableData() {
            let list = this.listData;

            let result = list.map(item => {
                let data = { name: `第${item[0]}列` };
                let json = {};
                let arr = [];

                item[1] &&
                    item[1].map(li => {
                        let key = `col_${li["col"]}`;
                        json[key] = this.getCarData(li.vehicleId, "mass");
                        arr.push({ props: key, label: `车辆${li["col"]}` });
                    });

                data["columns"] = arr;
                data["tableData"] = [json];
                return data;
            });

            return result;
        }
    },

    methods: {
        // 获取车辆数据
        getCarData(id, field) {
            // let datas = this.getNodeArgs(id);
            // return datas[field] || "";
            return "";
        },

        refreshTemp(cb) {
            let modelId = this.curModelId;
            model.compAllcouptypeTemp({ modelId }).then(res => {
                console.log(res);
                if (!res) return;
                typeof cb === "function" && cb(modelId);
            });
        },

        getPageData(modelId) {
            modelId = modelId || this.curModelId;
            Promise.all([
                model.getAllCoupTypeList({ modelId }),
                model.getAllcouptypeTemp({ modelId })
            ]).then(result => {
                console.log(result);
            });
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

