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
                        :dataSource="tcsd.tcsdData || []"
                        :onOpen="onOpenCurve"
                        :onSave="onSaveCurve"
                    />
                </div>
            </el-row>
            <el-dialog title="请选择牵引力曲线" :visible.sync="dialogVisible" :modal="false">
                <ul :class="$style.tractionList" class="clearfix">
                    <li
                        class="fll cursor-p"
                        v-for="item in tractionList"
                        :key="item.id"
                        @click="onClickTractionLi(item)"
                    >{{item.tcsdName}}</li>
                </ul>
            </el-dialog>
            <el-dialog
                :custom-class="$style.nameDialog"
                title="请输入曲线名称"
                :visible.sync="nameDialogVisible"
                :modal="false"
            >
                <el-input v-model="tractionTableName"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="nameDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveTractionTable">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </DropDown>
</template>

<script>
import { mapActions, mapState } from "vuex";

import DropDown from "components/DropDown.vue";
import EditTable from "components/EditTable";

import { getUserInfo } from "utils/util";

import { model } from "api";

const userId = getUserInfo().userId;

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

        // 打开曲线
        onOpenCurve() {
            // TODO ？ 牵引力曲线type
            model.tractionList({ userId, type: "4" }).then(res => {
                if (!res) return;
                let { data = [] } = res;
                if (data.length === 0) {
                    this.$message("暂无可选择的数据");
                    return;
                }
                this.tractionList = res.data;
                this.tcsdId = res.data.id;
                this.dialogVisible = true;
            });
        },

        // 点击打开后，展示列表，并点击list
        onClickTractionLi(item) {
            let { id } = item;
            model.tractionLiView({ id }).then(res => {
                if (!res) return;
                this.tcsd = res.data || {};
                this.dialogVisible = false;
            });
        },

        // 点击 table的保存，提示输入名称
        onSaveCurve(data) {
            this.nameDialogVisible = true;
            this.tscdData = data;
        },

        // 保存table数据
        saveTractionTable() {
            if (!this.tractionTableName) {
                this.$message("请输入名称");
                return;
            }
            model
                .tractionLiSave({
                    ...this.tcsd,
                    userId,
                    tcsdName: this.tractionTableName,
                    tcsdData: this.tscdData || [],
                    type: 4
                })
                .then(res => {
                    if (!res) return;
                    this.tcsdId = res.data.id;
                    this.nameDialogVisible = false;
                });
        },

        // 保存数据
        save() {
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
                this.$message({
                    message: "保存成功",
                    type: "success"
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
