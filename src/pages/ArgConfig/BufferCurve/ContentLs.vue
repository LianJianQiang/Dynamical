<template>
    <div :class="$style.root" class="clearfix">
        <div :class="$style.chartWrap" class="fll">
            <LineCharts :options="chartsOptions" />
        </div>
        <div :class="$style.rightWrap" class="flr">
            <div :class="$style.typeWrap" v-if="type">{{typeName}}</div>
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
                <el-table :data="pointAllotData" border size="mini">
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
                    v-model="xProportion"
                    :min="0"
                    :class="$style.scaleInp"
                />
                <span>f(x)比例：1:</span>
                <el-input-number
                    :controls="false"
                    v-model="fxProportion"
                    :min="0"
                    :class="$style.scaleInp"
                />
                <span>插值方法</span>
                <el-select v-model="interpolationMethod" :class="$style.inter">
                    <el-option
                        v-for="item in interList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
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

const interList = [{ id: "line", name: "line" }];

const defaultPointData = [
    { name: "开始加载", value: "", key: "beforeMount" },
    { name: "加载", value: "", key: "mount" },
    { name: "开始卸载", value: "", key: "beforeDestory" },
    { name: "卸载", value: "", key: "destory" }
];

export default {
    name: "BufferCurve",
    components: {
        LineCharts,
        EditTable
    },
    data() {
        let defaultInterId = interList[0].id;
        let { dataSource } = this;
        let {
            pointAllotData = defaultPointData,
            pointData = [],
            xProportion = 1,
            fxProportion = 1,
            interpolationMethod = defaultInterId
        } = this.dataSource;

        return {
            // 曲线分段table
            pointAllotData,

            pointData,

            // 比例
            xProportion,
            fxProportion,

            // 插值
            interList,
            interpolationMethod,

            chartsOptions: { ...chartsOptions }
        };
    },
    props: {
        type: {
            type: Number
        },
        typeName: {
            type: String,
            default: ""
        },
        onTalbeDataChange: {
            type: Function,
            default: () => {}
        },
        dataSource: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        charTableChange(data) {
            let xAxisData = [];
            let yAxisData = [];
            data.map(item => {
                if (!isNil(item.x)) xAxisData.push(item.x);
                if (!isNil(item.f)) yAxisData.push(item.f);
            });
            this.chartsOptions.xAxis.data = xAxisData;
            this.chartsOptions.series[0].data = yAxisData;

            this.pointData = [...data];
        },
        saveData() {
            let {
                pointAllotData,
                pointData,
                xProportion,
                fxProportion,
                interpolationMethod
            } = this;

            let result = {
                pointAllotData: [...pointAllotData],
                pointData: [...pointData],
                xProportion,
                fxProportion,
                interpolationMethod
            };

            if (this.type) result.curveType = type;

            return result;
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
