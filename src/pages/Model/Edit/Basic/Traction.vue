<!-- 牵引力特征曲线参数设置 -->
<template>
    <DropDown :save="save">
        <div :class="$style.root">
            <el-form ref="form" label-position="left" :model="datas" label-width="160px">
                <el-form-item label="整列最大载客工况总质量">
                    <el-input-number :controls="false" v-model="datas.massMax" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="整列车回转质量">
                    <el-input-number :controls="false" v-model="datas.massRotating" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="整列车牵引电机数量">
                    <el-input-number :controls="false" v-model="datas.motorNum" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="牵引指令下达后的延长时间">
                    <el-input-number :controls="false" v-model="datas.delayTime" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="冲击率">
                    <el-input-number :controls="false" v-model="datas.rampFun" :min="0"></el-input-number>
                </el-form-item>
            </el-form>
            <el-row :class="$style.curveWrap">
                <el-radio v-model="characteristics" :label="1">牵引力曲线自定义1</el-radio>

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
                                        :min="0"
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
                                        :min="0"
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
                                        :controls="false"
                                        :class="$style.speedbox"
                                        :min="0"
                                        v-model="datas.characterV3"
                                    />
                                </el-form-item>-
                                <el-form-item>
                                    <el-input-number
                                        :controls="false"
                                        :class="$style.speedbox"
                                        :min="0"
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
                                        :min="0"
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
                                        :controls="false"
                                        :class="$style.speedbox"
                                        :min="0"
                                        v-model="datas.characterV5"
                                    />
                                </el-form-item>-
                                <el-form-item>
                                    <el-input-number
                                        :controls="false"
                                        :class="$style.speedbox"
                                        :min="0"
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
                                        :min="0"
                                        v-model="datas.characterV4"
                                    />
                                </el-form-item>
                            </span>
                        </li>
                    </el-form>
                </ul>
            </el-row>
            <el-row :class="$style.curveWrap">
                <el-radio v-model="characteristics" :label="2">牵引力曲线自定义2</el-radio>
                <div :class="$style.curveInfo">
                    <EditTable
                        ref="editTable"
                        :type="4"
                        :tableDataChange="tableDataChange"
                        :onSaveCb="onSaveCb"
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
            tractionList: []
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
    methods: {
        initData() {
            model
                .tractionView({ modelId: this.curModelId, type: this.type })
                .then(res => {
                    if (!res) return;
                    let { data = {} } = res;
                    this.datas = data;
                    this.characteristics = data.characteristics || 0;
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

        // 保存数据
        save() {
            return new Promise(resolve => {
                if (this.tableData && !this.tcsdId) {
                    this.$message("请先保存表格数据");
                    return resolve(false);
                }

                let params = {
                    type: this.type,
                    vtrInfo: {
                        ...this.datas,
                        modelId: this.curModelId,
                        characteristics: this.characteristics
                    }
                };
                this.tcsdId && (params.tcsdId = this.tcsdId);
                model.tractionSave(params).then(res => {
                    if (!res) return;

                    resolve(true);
                    this.$message({
                        message: "保存成功",
                        type: "success"
                    });
                });
            });
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

    .tractionList {
        max-height: 300px;
        overflow: auto;
        li {
            padding: 10px 20px;
            margin: 0 5px;
        }
    }

    .nameDialog {
        :global {
            .el-input,
            .el-input__inner {
                height: 32px;
                line-height: 32px;
            }
        }
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
