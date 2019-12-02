<template>
    <div :class="$style.root">
        <div :class="$style.searchWrap">
            <div :class="$style.title">查询条件</div>
            <el-form ref="form" :model="searchForm" label-width="120px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="初始位置">
                            <el-input v-model="searchForm.initialLocation"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="积分条件">
                            <el-col :span="11">
                                <el-input v-model="searchForm.integralTimes" placeholder="积分时长"></el-input>
                            </el-col>
                            <el-col :class="$style.division" :span="2">～</el-col>
                            <el-col :span="11">
                                <el-input v-model="searchForm.integralStep" placeholder="积分步长"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="选择报告模版">
                            <el-select v-model="searchForm.temp" placeholder>
                                <el-option label="坡道救援(紧急制动)报告模版" value="temp1"></el-option>
                                <el-option label="坡道救援(普通制动)报告模版" value="temp2"></el-option>
                                <el-option label="冲击车挡报告模版" value="temp3"></el-option>
                                <el-option label="连挂报告模版" value="temp4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="计算方式">
                            <el-select v-model="searchForm.compute" placeholder>
                                <el-option label="计算方法1" value="compute1"></el-option>
                                <el-option label="计算方法2" value="compute2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item :class="$style.subForm">
                    <span
                        :class="[$style.btn,$style.saveBtn]"
                        type="primary"
                        @click="getCalculateResults"
                    >计算</span>
                    <a
                        v-if="allowCreateCharts"
                        :class="[$style.btn,$style.exportBtn]"
                        href="/api/resultrecord/exportReport"
                    >生成报告</a>
                    <a
                        v-else
                        :class="[$style.btn,$style.exportBtn]"
                        @click="$message('请先进行计算')"
                    >生成报告</a>
                </el-form-item>
            </el-form>
        </div>
        <div :class="[$style.chartFormWrap, 'clearfix']">
            <div class="fll">显示参数</div>
            <div class="fll">
                <Cascader @onChange="onArgsChange" />
            </div>
            <span :class="[$style.btn, $style.saveBtn]" @click="createChartsList">生成图表</span>
        </div>
        <div :class="$style.charts">
            <div :class="$style.chartsCont">
                <Chart
                    v-for="item in chartsData"
                    :key="item.chartKey"
                    :chartInfo="item"
                    @onClose="onCloseCharts"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

import { report } from "api";
import { getUserIdAndType } from "utils/util";

import Chart from "./Charts";

import Cascader from "./Cascader";

const varifyArgs = [
    { key: "initialLocation", msg: "请输入初始位置" },
    { key: "integralTimes", msg: "请输入积分时长" },
    { key: "integralStep", msg: "请输入积分步长" }
    // { key: "ve", msg: "请选择显示参数" },
    // { key: "ca", msg: "请选择显示参数" },
    // { key: "code", msg: "请选择显示参数" }
];

const varifyArgsFns = (arg = {}, obj) => {
    const { key, msg } = arg;
    if (!key) return true;

    if (!obj[key]) {
        ELEMENT.Message({
            message: msg || "请输入正确的查询条件",
            type: "error"
        });
        return false;
    }

    return true;
};

export default {
    name: "Report",
    components: {
        Cascader,
        // GridLayout,
        Chart
        // DragResize
    },
    data() {
        return {
            // IEVersion,
            searchForm: {},
            chartsData: [],
            allowCreateCharts: false

            // chartsLayout: testLayout
        };
    },
    props: {},
    computed: {
        ...mapState("models", ["curModelId"])
    },
    methods: {
        onArgsChange(args) {
            if (args.length === 0) {
                this.searchForm = {
                    ...this.searchForm,
                    code: "",
                    ve: "",
                    ca: ""
                };
                return;
            }

            const code = args[0];
            const vc = args[1].split("-");

            const ve = vc[0];
            const ca = vc[1];

            this.searchForm = {
                ...this.searchForm,
                code,
                ve,
                ca
            };
        },

        getCalculateResults() {
            const { userId } = getUserIdAndType();
            const { searchForm } = this;
            const {
                initialLocation = "",
                integralTimes = "",
                integralStep = ""
            } = searchForm;

            // 校验参数不为空
            // for (let i = 0; i < varifyArgs.length; i++) {
            //     if (!varifyArgsFns(varifyArgs[i], searchForm)) return;
            // }

            report
                .getCalculateResults({
                    initialLocation,
                    integralTimes,
                    integralStep,
                    modelId: this.curModelId,
                    userID: userId
                })
                .then(res => {
                    if (!res || res.code !== "200") return;
                    this.allowCreateCharts = true;
                });
        },

        createChartsList() {
            if (!this.allowCreateCharts) {
                this.$message("请先输入计算参数并点击计算");
                return;
            }

            const { searchForm } = this;
            const {
                initialLocation = "",
                integralTimes = "",
                integralStep = "",
                ve = "",
                ca = "",
                code = ""
            } = searchForm;

            if (!ve || !ca || !code) {
                this.$message("请先选择参数");
                return;
            }

            const chartData = {
                chartKey: `${this.curModelId}-${ve}-${ca}-${code}-${initialLocation}-${integralTimes}-${integralStep}`,
                ...this.searchForm,
                modelId: this.curModelId
            };

            // 所填参数已经生成一个图表
            // 将该图表删除，然后在第一位再插入
            const oldChartIdx = this.chartsData.findIndex(
                item => item.chartKey === chartData.chartKey
            );

            if (oldChartIdx !== -1) {
                this.chartsData.splice(oldChartIdx, 1);
            }
            this.chartsData.unshift(chartData);
        },

        // 关闭单个图表
        onCloseCharts(chartInfo) {
            const closedChart = this.chartsData.findIndex(
                item => item.chartKey === chartInfo.chartKey
            );
            if (closedChart !== -1) {
                this.chartsData.splice(closedChart, 1);
            }
        }
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    // height: 100%;
    padding: 20px;

    // .content {
    //     width: 100%;
    //     height: 100%;
    //     overflow: auto;
    //     // background-color: #fff;
    //     // padding: 20px;
    // }

    .division {
        text-align: center;
    }

    .searchWrap {
        background-color: #fff;
        padding: 20px;
        .title {
            font-size: 16px;
            color: #4baed0;
            margin-bottom: 10px;
        }

        .subForm {
            margin-bottom: 0;
        }
    }

    .btn {
        display: inline-block;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        width: 215px;
        height: 32px;
        line-height: 32px;
        padding: 0;
        color: #fff;
    }
    .saveBtn {
        background-color: #4bccf4;
        margin-right: 60px;
    }
    .exportBtn {
        background-color: #36a7e3;
    }

    .chartFormWrap {
        background-color: #fff;
        padding: 20px;
        line-height: 30px;
        margin: 20px 0;
        overflow: hidden;

        & > div:not(:last-child) {
            margin-right: 10px;
        }

        .btn {
            height: 30px;
            line-height: 30px;
        }
    }

    .charts {
        // padding-top: 20px;
        // margin-top: 20px;
        .chartsCont {
            position: relative;
        }
    }

    :global {
        .el-select {
            width: 100%;
        }

        .el-col {
            height: 50px;
            overflow: hidden;
        }

        .el-input__icon,
        .el-form-item__label,
        .el-form-item__content {
            line-height: 28px;
        }
    }
}
</style>
