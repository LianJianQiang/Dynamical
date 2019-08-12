<template>
    <div>
        <!-- <span class="cursor-p hover-heighlight" @click="showDrawer=true">设置</span> -->
        <el-drawer
            ref="rampDrawer"
            custom-class="rampDrawer"
            title="坡道设置"
            :visible.sync="showDrawer"
            direction="rtl"
        >
            <div class="rampDrawContent">
                <div class="methodWrap">
                    <label>请坡道设置方法</label>
                    <el-select v-model="rampMethod" placeholder="请选择" class="m-l-5">
                        <el-option
                            v-for="item in rampMethods"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>

                <div class="drawerContent">
                    <!-- 常规定义法 -->
                    <el-form :model="formData" v-if="rampMethod === 1">
                        <el-form-item label="长度(m)" :label-width="formLabelWidth">
                            <el-input-number :controls="false" :min="0" v-model="formData.lInitial"></el-input-number>
                        </el-form-item>
                        <el-form-item label="坡度(ppt)" :label-width="formLabelWidth">
                            <el-input-number :controls="false" :min="0" v-model="formData.gradient"></el-input-number>
                        </el-form-item>
                        <el-form-item label="过渡曲线半径(m)" :label-width="formLabelWidth">
                            <el-input-number :controls="false" :min="0" v-model="formData.radius"></el-input-number>
                        </el-form-item>
                    </el-form>
                    <!-- 逐点定义法 -->
                    <div v-if="rampMethod === 2">
                        <div class="btnGroup">
                            <span class="btn-mini" @click="tableAdd">+</span>
                            <span class="btn-mini" @click="tableDel">-</span>
                            <span>
                                <el-select v-model="selType" placeholder="请选择" class="selType">
                                    <el-option
                                        v-for="item in typeList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </span>
                        </div>
                        <div>
                            <el-table :data="pointTableData" border max-height="250" size="mini">
                                <el-table-column prop="order" label="序号" align="center">
                                    <!-- <template slot-scope="scope">
                                        <el-input-number
                                            v-model="scope.row.order"
                                            :controls="false"
                                            :min="0"
                                        ></el-input-number>
                                    </template>-->
                                </el-table-column>
                                <el-table-column prop="x" label="X" align="center">
                                    <template slot-scope="scope">
                                        <el-input-number
                                            v-model="scope.row.x"
                                            :controls="false"
                                            :min="0"
                                            @change="charTableChange"
                                        ></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="y" label="Y" align="center">
                                    <template slot-scope="scope">
                                        <el-input-number
                                            v-model="scope.row.y"
                                            :controls="false"
                                            :min="0"
                                            @change="charTableChange"
                                        ></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="type" label="类型" align="center">
                                    <!-- <template slot-scope="scope">
                                        <el-input-number
                                            v-model="scope.row.type"
                                            :controls="false"
                                            :min="0"
                                        ></el-input-number>
                                    </template>-->
                                </el-table-column>
                                <el-table-column prop="smooth" label="圆滑" align="center">
                                    <!-- <template slot-scope="scope">
                                        <el-input-number
                                            v-model="scope.row.smooth"
                                            :controls="false"
                                            :min="0"
                                        ></el-input-number>
                                    </template>-->
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="rampDrawerChart">
                            <LineCharts :options="chartsOptions" />
                        </div>
                        <div></div>
                    </div>
                    <div class="drawerFooter" v-if="rampMethod">
                        <el-button class="btn-xl" type="primary" @click="saveData">保存</el-button>
                        <el-button class="btn-xl" @click="showDrawer = false">取消</el-button>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { mapState } from "vuex";

import { isNil } from "utils/util";
import LineCharts from "components/Charts";

const rampMethods = [
    { id: 1, name: "常坡度定义" },
    { id: 2, name: "逐点定义" }
];

const typeList = [{ id: "line", name: "Line" }];

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

export default {
    name: "Ramp",
    components: {
        LineCharts
    },
    data() {
        return {
            rampMethods,
            rampMethod: rampMethods[0].id,
            showDrawer: false,

            // 常坡度定义
            formData: {
                lInitial: 100, // 长度
                gradient: 0, // 坡度
                radius: 0 // 过渡曲线半径
            },
            formLabelWidth: "120px",

            // 逐点定义
            typeList,
            selType: "line",
            chartsOptions,
            pointTableData: []
        };
    },
    watch: {
        visible() {
            this.showDrawer = this.visible;
        }
    },
    props: {
        dataSource: {
            type: Object,
            default: () => ({})
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState("models", ["curModelId"])
    },

    methods: {
        // 逐点定义 添加
        tableAdd() {
            let last = this.pointTableData[0];
            let order;
            if (!last) {
                order = 1;
            } else {
                order = last.order + 1;
            }
            this.pointTableData.unshift({
                order,
                type: typeList[0].id,
                smooth: "Yes"
            });
        },

        // 逐点定义 删除
        tableDel() {
            if (this.pointTableData.length === 0) return;
            this.pointTableData.shift();
        },

        // 逐点定义 图表联动
        charTableChange() {
            let data = this.pointTableData;
            let xAxisData = [];
            let yAxisData = [];
            data.map(item => {
                if (!isNil(item.x)) xAxisData.push(item.x);
                if (!isNil(item.y)) yAxisData.push(item.y);
            });
            this.chartsOptions.xAxis.data = xAxisData;
            this.chartsOptions.series[0].data = yAxisData;
        },

        // 保存常规定义数据
        saveType1Data() {
            let { formData, curModelId } = this;
            for (let i in formData) {
                if (formData[i] !== 0 && !formData[i]) {
                    this.$message({
                        message: "请将数据填写完整",
                        type: "error"
                    });
                    return null;
                }
            }

            // lineDef 线路方式:线路设置1,线路设置2
            return [
                {
                    ...formData,
                    type: this.rampMethod,
                    lineDef: 1,
                    modelId: curModelId
                }
            ];
        },

        // 保存逐点定义数据
        saveType2Data() {
            let { rampMethod, pointTableData, curModelId } = this;
            let len = pointTableData.length - 1;
            let result = [];

            for (let i = len; i >= 1; i--) {
                let curData = pointTableData[i];
                if (!curData.x || !curData.y) {
                    this.$message({
                        message: "请将数据填写完整",
                        type: "error"
                    });
                    return null;
                }

                let pro = pointTableData[i - 1];

                if (pro.y === curData.y) {
                    this.$message({
                        message: "相邻两行的Y值不能相同",
                        type: "error"
                    });
                    return null;
                }

                // row里的默认数据
                let json = {
                    type: rampMethod,
                    lineDef: 1,
                    modelId: curModelId
                };

                // 长度
                json.lInitial = pro.x - curData.x;

                // 坡度
                json.gradient = (
                    ((pro.y - curData.y) / (pro.x - curData.x)) *
                    1000
                ).toFixed(2);
                result.unshift(json);
            }

            return result;
        },

        // 保存数据
        saveData() {
            // this.$refs.rampDrawer.closeDrawer();
            let { rampMethod } = this;
            let data = null; // []
            if (rampMethod === 1) {
                // 常规定义
                data = this.saveType1Data();
            } else if (rampMethod === 2) {
                // 逐点定义
                data = this.saveType2Data();
            }

            if (!data) return;

            this.$emit("saveData", data);
        }
    },
    mounted() {
        this.charTableChange();
    }
};
</script>


<style lang="scss">
.rampDrawer {
    overflow: auto;
    :global {
        .el-drawer__header {
            font-size: 20px;
            margin-bottom: 20px;
        }
        .rampDrawContent {
            padding: 0 20px 20px;
            .methodWrap {
                margin-bottom: 20px;
                label {
                    font-size: 14px;
                    margin-right: 20px;
                }
            }

            .btnGroup {
                height: 22px;
                margin-bottom: 10px;
                span {
                    cursor: pointer;
                }
                & > span:not(:last-child) {
                    margin-right: 5px;
                }

                .el-input__inner {
                    height: 22px;
                    line-height: 22px;
                }
            }

            .drawerFooter {
                text-align: center;
            }

            .rampDrawerChart {
                width: 100%;
                height: 300px;
            }
        }
        .el-input__icon {
            line-height: 1;
        }
    }
}
</style>


