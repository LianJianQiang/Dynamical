<template>
    <div :class="$style.root">
        <div :class="$style.searchWrap">
            <div :class="$style.title">查询条件</div>
            <el-form ref="form" :model="searchForm" label-width="120px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="初始位置">
                            <el-input v-model="searchForm.start"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="积分条件">
                            <el-col :span="11">
                                <el-input v-model="searchForm.integral1" placeholder="积分时长"></el-input>
                            </el-col>
                            <el-col :class="$style.division" :span="2">～</el-col>
                            <el-col :span="11">
                                <el-input v-model="searchForm.integral2" placeholder="积分步长"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="显示参数">
                            <Cascader />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="生成报告">
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
                    <span :class="[$style.btn,$style.saveBtn]" type="primary">数据保存</span>
                    <span :class="[$style.btn,$style.exportBtn]">导出数据</span>
                </el-form-item>
            </el-form>
        </div>
        <div :class="$style.charts">
            <div :class="$style.chartsCont">
                <LineCharts :options="chartsOptions" width="400px" height="400px" />
                <!-- <DragResize /> -->
                <!-- <GridLayout v-if="IEVersion<0" :layout="chartsLayout">
                    <LineCharts :options="chartsOptions" />
                </GridLayout>-->
            </div>
        </div>
    </div>
</template>

<script>
import LineCharts from "components/Charts";

import Cascader from "./Cascader";
// import GridLayout from "./GridLayout";
// import DragResize from "./DragResize";

const IEVersion = window.__IEVersion__;

const testLayout = [
    { x: 0, y: 0, w: 6, h: 8, i: "0", static: false },
    { x: 6, y: 0, w: 6, h: 8, i: "1", static: false },
    { x: 0, y: 12, w: 6, h: 8, i: "2", static: false },
    { x: 6, y: 12, w: 6, h: 8, i: "3", static: false }
];

let chartsOptions = {
    title: {
        text: "曲线图",
        top: 5,
        left: "center"
    },
    xAxis: {
        type: "category",
        data: []
    },
    yAxis: {
        type: "value"
    },
    series: [
        {
            data: [],
            type: "line",
            smooth: true
        }
    ]
};

export default {
    name: "Report",
    components: {
        Cascader,
        // GridLayout,
        LineCharts
        // DragResize
    },
    data() {
        return {
            IEVersion,
            searchForm: {},

            chartsLayout: testLayout,
            chartsOptions
        };
    },
    props: {}
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
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

    .charts {
        padding-top: 20px;
        .chartsCont {
            position: relative;
        }
    }

    :global {
        .el-select {
            width: 100%;
        }

        .el-input__icon,
        .el-form-item__label,
        .el-form-item__content {
            line-height: 28px;
        }
    }
}
</style>
