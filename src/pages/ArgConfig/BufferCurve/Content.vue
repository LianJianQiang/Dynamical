<template>
    <div :class="$style.root" class="clearfix">
        <div :class="$style.chartWrap" class="fll">
            <LineCharts  :options="chartsOptions" />
        </div>
        <div :class="$style.rightWrap" class="flr">
            <div :class="$style.typeWrap" v-if="type">{{type}}</div>
            <!-- 曲线xy值表格 -->
            <div :class="$style.chartTableWrap">
                <EditTable
                    :showSave="false"
                    :showOpen="false"
                    :tableDataChange="charTableChange"
                    height="200"
                />
            </div>
            <!-- 曲线分段 -->
            <div :class="$style.subTableWrap">
                <el-table :data="subTableData" border size="mini">
                    <el-table-column prop="name" label="曲线分段" align="center" />
                    <el-table-column prop="value" label="点序号" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.value" :controls="false" :min="0"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div :class="$style.scaleWrap">
                <span>x比例：1:</span>
                <el-input-number
                    :controls="false"
                    v-model="scaleX"
                    :min="0"
                    :class="$style.scaleInp"
                />
                <span>f(x)比例：1:</span>
                <el-input-number
                    :controls="false"
                    v-model="scaleFx"
                    :min="0"
                    :class="$style.scaleInp"
                />
                <span>插值方法</span>
                <el-select v-model="inter" :class="$style.inter">
                    <el-option
                        v-for="item in interList"
                        :key="item.label"
                        :label="item.name"
                        :value="item.label"
                    ></el-option>
                </el-select>
            </div>
        </div>
    </div>
</template>

<script>
import { isNil } from "utils/util";
import EditTable from "components/EditTable";
import LineCharts from "components/Charts";

let chartsOptions = {
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

const interList = [{ label: "line", name: "line" }];
export default {
    name: "BufferCurve",
    components: {
        LineCharts,
        EditTable
    },
    data() {
        return {
            // 曲线分段table
            subTableData: [
                { name: "开始加载", value: "" },
                { name: "加载", value: "" },
                { name: "开始卸载", value: "" },
                { name: "卸载", value: "" }
            ],

            // 比例
            scaleX: 1,
            scaleFx: 1,

            // 插值
            interList,
            inter: interList[0].key,

            chartsOptions: { ...chartsOptions }
        };
    },
    props: {
        type: {
            type: String,
            default: ""
        }
    },
    methods: {
        charTableChange(data) {
            let xAxisData = [];
            let yAxisData = [];
            data.map(item => {
                if (!isNil(item.x)) xAxisData.push(item.x);
                if (!isNil(item.fx)) yAxisData.push(item.fx);
            });
            this.chartsOptions.xAxis.data = xAxisData;
            this.chartsOptions.series[0].data = yAxisData;
        }
    }
};
</script>

<style module lang="scss">
.root {
    .chartWrap {
        width: 450px;
        height: 450px;
    }

    .rightWrap {
        width: 50%;
    }
    .typeWrap {
        font-size: 16px;
        font-weight: 500;
        margin: 10px 0;
    }
    .subTableWrap {
        margin-top: 20px;
    }

    .scaleWrap {
        margin: 10px 0;
    }
    .scaleInp {
        width: 30px;
        margin-right: 20px;
    }

    .inter {
        width: 100px;
        height: 20px;
        margin-left: 20px;
    }

    :global {
        .el-input-number {
            margin-left: 5px;
        }
        .el-input-number.is-without-controls .el-input__inner {
            padding: 0 4px;
        }

        .el-input__icon {
            line-height: 30px;
        }
    }
}
</style>
