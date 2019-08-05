<!-- 牵引力特征曲线参数设置 -->
<template>
    <DropDown :save="save">
        <div :class="$style.root">
            <el-form ref="form" label-position="left" :model="data" label-width="160px">
                <el-form-item label="整列最大载客工况总质量">
                    <el-input-number :controls="false" v-model="data.massMax" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="整列车回转质量">
                    <el-input-number :controls="false" v-model="data.massRotating" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="整列车牵引电机数量">
                    <el-input-number :controls="false" v-model="data.motorNum" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="牵引指令下达后的延长时间">
                    <el-input-number :controls="false" v-model="data.delayTime" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="冲击率">
                    <el-input-number :controls="false" v-model="data.rampFun" :min="0"></el-input-number>
                </el-form-item>
            </el-form>
            <el-row :class="$style.curveWrap">
                <el-radio v-model="characteristics" label="1">牵引力曲线自定义1</el-radio>

                <ul :class="$style.curveInfo">
                    <el-form :model="curveData1">
                        <li>
                            <span>恒转速区：</span>
                            <span>
                                速度0-
                                <el-form-item>
                                    <el-input-number
                                        :controls="false"
                                        :class="$style.speedbox"
                                        :min="0"
                                        v-model="curveData1.characterV1"
                                    />
                                </el-form-item>
                            </span>
                            <span style="margin-left:10px">
                                F
                                <el-form-item>
                                    <el-input-number
                                        :controls="false"
                                        :class="$style.speedbox"
                                        :min="0"
                                        v-model="curveData1.characterF"
                                    />
                                </el-form-item>
                            </span>
                        </li>
                        <li>
                            <span>恒功率区:</span>
                            <span>
                                速度
                                <el-form-item>
                                    <el-input-number
                                        :controls="false"
                                        :class="$style.speedbox"
                                        :min="0"
                                        v-model="curveData1.characterV3"
                                    />
                                </el-form-item>-
                                <el-form-item>
                                    <el-input-number
                                        :controls="false"
                                        :class="$style.speedbox"
                                        :min="0"
                                        v-model="curveData1.characterV2"
                                    />
                                </el-form-item>
                            </span>
                            <span>
                                F.v²
                                <el-form-item>
                                    <el-input-number
                                        :controls="false"
                                        :class="$style.speedbox"
                                        :min="0"
                                        v-model="curveData1.characterFv"
                                    />
                                </el-form-item>
                            </span>
                        </li>
                        <li>
                            <span>降速区：</span>
                            <span>
                                速度
                                <el-form-item>
                                    <el-input-number
                                        :controls="false"
                                        :class="$style.speedbox"
                                        :min="0"
                                        v-model="curveData1.characterV5"
                                    />
                                </el-form-item>-
                                <el-form-item>
                                    <el-input-number
                                        :controls="false"
                                        :class="$style.speedbox"
                                        :min="0"
                                        v-model="curveData1.characterFvv"
                                    />
                                </el-form-item>
                            </span>
                            <span>
                                F.v
                                <el-form-item>
                                    <el-input-number
                                        :controls="false"
                                        :class="$style.speedbox"
                                        :min="0"
                                        v-model="curveData1.characterV4"
                                    />
                                </el-form-item>
                            </span>
                        </li>
                    </el-form>
                </ul>
            </el-row>
            <el-row :class="$style.curveWrap">
                <el-radio v-model="characteristics" label="2">牵引力曲线自定义2</el-radio>

                <div :class="$style.curveInfo">
                    <EditTable ref="editTable" />
                    <!-- <div :class="$style.btnGroup">
                        <el-button class="btn-mini" @click="tableAdd">+</el-button>
                        <el-button class="btn-mini" @click="tableDel">-</el-button>
                        <el-button class="btn-mini" @click="tableOpen">打开</el-button>
                        <el-button class="btn-mini" @click="tableSave">保存</el-button>
                    </div>
                    <el-table :data="tableData" height="85" border size="mini">
                        <el-table-column prop="order" label="序号" align="center" width="75" />
                        <el-table-column prop="x" label="x" align="center" width="75">
                            <template slot-scope="scope">
                                <el-input-number :controls="false" v-model="scope.row.x" :min="0"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column prop="fx" label="f(x)" align="center" width="75">
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.fx" :controls="false" :min="0"></el-input-number>
                            </template>
                        </el-table-column>
                    </el-table>-->
                </div>
            </el-row>
        </div>
    </DropDown>
</template>

<script>
import DropDown from "components/DropDown.vue";
import EditTable from "components/EditTable";

import { model } from "api";

export default {
    name: "Traction",
    data() {
        return {
            data: {},
            curveData1: {},
            traction: [],
            // checked1: false,
            // checked2: false,
            characteristics: ""
        };
    },
    components: {
        DropDown,
        EditTable
    },
    props: {
        parentField: {
            type: String
        },
        saveData: {
            type: Function,
            default: () => {}
        }
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            model
        },
        // // table中插入一行
        // tableAdd() {
        //     let { tableData } = this;
        //     tableData.push({ order: tableData.length + 1, x: "", fx: "" });
        //     this.tableData = tableData;
        // },

        // // table中删除一行
        // tableDel() {
        //     let { tableData } = this;
        //     tableData.pop();
        //     this.tableData = tableData;
        // },

        // // TODO 打开和保存功能需后端支持
        // tableOpen() {
        //     this.$message({
        //         message: "打开",
        //         type: "warning"
        //     });
        // },

        // // TODO 打开和保存功能需后端支持
        // tableSave() {
        //     this.$message({
        //         message: "保存",
        //         type: "warning"
        //     });
        // },

        // 保存数据
        save() {
            let data = {
                ...this.data
            };

            // TODO 根据不同条件将curveData1 或tableData处理成后端需要的格式
            if (this.characteristics === "1") {
                data.curveData = this.curveData1;
            } else if (this.characteristics === "2") {
                let tableData = this.$refs.editTable.save();
                data.curveData = tableData;
            }

            if (!this.parentField) return;
            this.saveData({ data, field: this.parentField });
        }
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;

    input {
        font-size: 12px;
    }

    .speedbox {
        width: 30px;
    }

    .curveWrap {
        margin-top: 10px;
        .curveInfo {
            // padding-left: 16px;
            li {
                margin-bottom: 4px;
                font-size: 12px;
            }

            .btnGroup {
                margin-bottom: 10px;
            }

            :global {
                .el-form-item {
                    display: inline-block;
                }
            }
        }
    }

    .subBtnWrap {
        margin-top: 10px;
        text-align: center;
    }

    :global {
        .el-input-number.is-without-controls .el-input__inner {
            padding: $input-pad-s;
        }
        .el-form-item__label,
        .el-form-item__content,
        .el-input,
        .el-input__inner {
            height: 18px;
            line-height: 18px;
        }
        .el-input__inner {
            padding: 0 5px;
        }
        .el-form-item__label,
        .el-checkbox__label {
            font-size: 12px;
            color: $label-color_1;
        }
        .el-form-item {
            margin-bottom: 4px;
        }
    }
}
</style>
