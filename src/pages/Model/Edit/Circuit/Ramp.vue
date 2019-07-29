<template>
    <div>
        <span class="cursor-p hover-heighlight" @click="showDrawer=true">设置</span>
        <el-drawer
            ref="rampDrawer"
            custom-class="rampDrawer"
            title="坡道设置"
            :visible.sync="showDrawer"
            direction="rtl"
            :before-close="handleClose"
        >
            <div class="rampDrawContent">
                <div class="methodWrap">
                    <label>请坡道设置方法</label>
                    <el-select v-model="rampMethod" placeholder="请选择" class="m-l-5">
                        <el-option
                            v-for="item in rampMethods"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>

                <div class="drawerContent">
                    <!-- 常规定义法 -->
                    <el-form :model="form" v-if="rampMethod ==='normal'">
                        <el-form-item label="长度(m)" :label-width="formLabelWidth">
                            <el-input v-model="form.len"></el-input>
                        </el-form-item>
                        <el-form-item label="坡度(ppt)" :label-width="formLabelWidth">
                            <el-input v-model="form.ramp"></el-input>
                        </el-form-item>
                        <el-form-item label="过渡曲线半径(m)" :label-width="formLabelWidth">
                            <el-input v-model="form.r"></el-input>
                        </el-form-item>
                    </el-form>
                    <!-- 逐点定义法 -->
                    <div v-if="rampMethod ==='point'">
                        <div class="btnGroup">
                            <span class="btn-mini" @click="tableAdd">+</span>
                            <span class="btn-mini" @click="tableDel">-</span>
                            <span>
                                <el-select v-model="selType" placeholder="请选择" class="selType">
                                    <el-option
                                        v-for="item in typeList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value"
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
                            <LineCharts width="400" height="300" :options="chartsOptions" />
                        </div>
                        <div></div>
                    </div>
                    <div class="drawerFooter" v-if="rampMethod">
                        <el-button
                            class="btn-xl"
                            type="primary"
                            @click="$refs.rampDrawer.closeDrawer()"
                        >保存</el-button>
                        <el-button class="btn-xl" @click="showDrawer = false">取消</el-button>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { isNil } from "utils/util";
import LineCharts from "components/Charts";

const rampMethods = [
    { value: "normal", name: "常坡度定义" },
    { value: "point", name: "逐点定义" }
];

const typeList = [{ value: "line", name: "Line" }];

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
            rampMethod: "",
            showDrawer: false,

            // 常坡度定义
            form: {
                len: "", // 长度
                ramp: "", // 坡度
                r: "" // 过渡曲线半径
            },
            formLabelWidth: "120px",

            // 逐点定义
            typeList,
            selType: "line",
            chartsOptions,
            pointTableData: []
        };
    },
    props: {
        dataSource: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        // 关闭坡道设置
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },

        // 逐点定义
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
                type: "Line",
                smooth: "Yes"
            });
        },
        tableDel() {
            if (this.pointTableData.length === 0) return;
            this.pointTableData.shift();
        },
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
        }
    },
    computed: {},
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
        }
        .el-input__icon {
            line-height: 1;
        }
    }
}
</style>


