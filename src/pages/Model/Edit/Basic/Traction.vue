<!-- 牵引力特征曲线参数设置 -->
<template>
    <DropDown :save="save" title="牵引力特征曲线" :isHaveData="isHaveData" :resetData="clearData">
        <div :class="$style.root">
            <el-row class="listWrap">
                <el-form ref="form" label-position="left" :model="datas" label-width="160px">
                    <el-form-item label="整列最大载客工况总质量">
                        <el-input-number :controls="false" v-model="datas.massMax"></el-input-number>
                    </el-form-item>
                    <el-form-item label="整列车回转质量">
                        <el-input-number :controls="false" v-model="datas.massRotating"></el-input-number>
                    </el-form-item>
                    <el-form-item label="整列车牵引电机数量">
                        <el-input-number :controls="false" v-model="datas.motorNum"></el-input-number>
                    </el-form-item>
                    <el-form-item label="牵引指令下达后的延长时间">
                        <el-input-number :controls="false" v-model="datas.delayTime"></el-input-number>
                    </el-form-item>
                    <el-form-item label="冲击率">
                        <el-input-number :controls="false" v-model="datas.rampFun"></el-input-number>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row class="listWrap">
                <el-checkbox
                    class="radioWrap"
                    :value="characteristics===1"
                    :label="1"
                    @change="()=>onCheckboxChange(1)"
                >牵引力曲线自定义1</el-checkbox>

                <ul :class="$style.curveInfo">
                    <el-form :model="datas">
                        <li>
                            <span>恒转速区：</span>
                            <span>
                                速度0-
                                <el-form-item>
                                    <el-input-number
                                        :controls="false"
                                        :class="$style.speedbox"
                                        v-model="datas.characterV1"
                                    />
                                </el-form-item>
                            </span>
                            <span style="margin-left:10px">
                                F
                                <el-form-item>
                                    <el-input-number
                                        :controls="false"
                                        :class="$style.speedbox"
                                        v-model="datas.characterF"
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
                                        :disabled="true"
                                        :controls="false"
                                        :class="$style.speedbox"
                                        v-model="datas.characterV3"
                                    />
                                </el-form-item>-
                                <el-form-item>
                                    <el-input-number
                                        :controls="false"
                                        :class="$style.speedbox"
                                        v-model="datas.characterV2"
                                    />
                                </el-form-item>
                            </span>
                            <span>
                                F.v²
                                <el-form-item>
                                    <el-input-number
                                        :controls="false"
                                        :class="$style.speedbox"
                                        v-model="datas.characterFv"
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
                                        :disabled="true"
                                        :controls="false"
                                        :class="$style.speedbox"
                                        v-model="datas.characterV5"
                                    />
                                </el-form-item>-
                                <el-form-item>
                                    <el-input-number
                                        :controls="false"
                                        :class="$style.speedbox"
                                        v-model="datas.characterFvv"
                                    />
                                </el-form-item>
                            </span>
                            <span>
                                F.v
                                <el-form-item>
                                    <el-input-number
                                        :controls="false"
                                        :class="$style.speedbox"
                                        v-model="datas.characterV4"
                                    />
                                </el-form-item>
                            </span>
                        </li>
                    </el-form>
                </ul>
            </el-row>
            <el-row class="listWrap">
                <el-checkbox
                    class="radioWrap"
                    :value="characteristics===2"
                    :label="2"
                    @change="()=>onCheckboxChange(2)"
                >牵引力曲线自定义2</el-checkbox>

                <div :class="$style.curveInfo">
                    <EditTable
                        ref="editTable"
                        :type="4"
                        :onSaveCb="onSaveCb"
                        :tcsdData="tcsd"
                        :dataSource="tcsd.tcsdData"
                        :tableDataChange="tableDataChange"
                    />
                </div>
            </el-row>
        </div>
    </DropDown>
</template>

<script>
import { mapState } from "vuex";

import DropDown from "components/DropDown.vue";
import EditTable from "components/EditTable";
import { getObjFromStr } from "utils/util";

import { model } from "api";

export default {
    name: "Traction",
    data() {
        return {
            datas: {},
            tcsd: {},
            characteristics: 0,
            dialogVisible: false,

            nameDialogVisible: false,
            tractionTableName: "",

            // 牵引力曲线列表
            tractionList: [],

            isHaveData: false
        };
    },
    components: {
        DropDown,
        EditTable
    },
    props: {
        type: {
            // 表示第几列车
            type: String,
            required: true
        }
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState("models", ["curModelId"])
    },
    watch: {
        "datas.characterV1"(val) {
            this.datas.characterV3 = val;
        },
        "datas.characterV2"(val) {
            this.datas.characterV5 = val;
        }
        // "datas.characterV3"(val) {
        //     this.datas.characterV1 = val;
        // },
        // "datas.characterV5"(val) {
        //     this.datas.characterV2 = val;
        // }
    },
    methods: {
        initData() {
            model
                .tractionView({ modelId: this.curModelId, type: this.type })
                .then(res => {
                    if (!res) return;
                    let { data = {} } = res;

                    // if (data && JSON.stringify(data) !== "{}") {
                    //     this.isHaveData = true;
                    // }
                    this.setHaveDataStatus(data);

                    if (data.tcsd && data.tcsd.tcsdData) {
                        data.tcsd.tcsdData = getObjFromStr(data.tcsd.tcsdData);
                    }

                    this.datas = data;
                    this.characteristics = data.characteristics || "";
                    this.tcsd = data.tcsd || {};
                });
        },

        tableDataChange(data) {
            this.tableData = data;

            // 数据编辑以后，将id清空，后续提示用户保存数据
            this.tcsdId = "";
        },

        onSaveCb(id) {
            this.tcsdId = id;
        },

        onCheckboxChange(value) {
            if (this.characteristics === value) {
                return (this.characteristics = "");
            }
            this.characteristics = value;
        },

        clearData() {
            const { id, modelId } = this.datas;
            const newDatas = { id, modelId };

            this.datas = newDatas;

            this.characteristics = "";
            this.tcsd = {};

            this.$refs.editTable.clearData();

            this.setHaveDataStatus(newDatas);
        },

        // 保存数据
        async save() {
            if (this.tableData && !this.tcsdId) {
                // this.$message("请先保存表格数据");
                // return resolve(false);
                await this.$refs.editTable.tractionLiSave();
            }

            return new Promise(resolve => {
                // if (this.tableData && !this.tcsdId) {
                //     this.$message("请先保存表格数据");
                //     return resolve(false);
                // }

                const params = this.getSaveParams();
                this.setHaveDataStatus(params.vtrInfo);

                resolve(true);
            });
        },

        setHaveDataStatus(params = {}) {
            this.isHaveData = false;
            for (let i in params) {
                if (i === "id" || i === "modelId") continue;
                if (params[i]) {
                    this.isHaveData = true;
                    break;
                }
            }
        },

        getSaveParams() {
            let params = {
                type: this.type,
                vtrInfo: {
                    ...this.datas,
                    modelId: this.curModelId
                }
            };

            if (this.characteristics) {
                params.vtrInfo.characteristics = this.characteristics;
            }

            this.tcsdId &&
                (params.tcsdId = this.tcsdId) &&
                (params.vtrInfo.tcsdId = this.tcsdId);

            return params;
        },

        saveDataToServe() {
            const params = this.getSaveParams();
            return model.tractionSave(params);
        }
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;

    .speedbox {
        width: 50px;
        input {
            padding-left: 5px !important;
            padding-right: 5px !important;
        }
    }

    .curveInfo {
        li {
            font-size: 12px;
            color: $label-color_1;
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

    // :global {
    // .el-form-item__label,
    // .el-checkbox__label {
    //     font-size: 12px;
    //     color: $label-color_1;
    // }
    // .el-form-item {
    //     margin-bottom: 10px;
    // }
    // }
}
</style>
