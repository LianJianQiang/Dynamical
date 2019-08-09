<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown :save="save">
        <div :class="$style.root">
            <el-row :class="$style.curveWrap">
                <el-radio v-model="formData.tracdef" :label="1">特征曲线定义</el-radio>
                <el-form
                    ref="form"
                    :class="$style.form"
                    label-position="left"
                    :model="formData"
                    label-width="120px"
                >
                    <el-form-item label="牵引电机数量">
                        <el-input-number :controls="false" v-model="formData.emNum" :min="0"></el-input-number>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row :class="$style.curveWrap">
                <el-radio v-model="formData.tracdef" :label="2">牵引力参数设置</el-radio>

                <el-form
                    ref="form"
                    :class="$style.form"
                    label-position="left"
                    :model="formData"
                    label-width="120px"
                >
                    <el-form-item label="牵引力">
                        <el-input-number :controls="false" v-model="formData.tracf" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="延迟时间">
                        <el-input-number :controls="false" v-model="formData.delayTime" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="牵引力加载时间">
                        <el-input-number :controls="false" v-model="formData.loadTime" :min="0"></el-input-number>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row :class="$style.curveWrap" class="clearfix">
                <el-radio v-model="formData.tracdef" :label="3">制动力用户自定义</el-radio>
                <Diy
                    size="mini"
                    field="tcsdId"
                    :saveData="saveDiyData"
                    :class="$style.diyDown"
                    :type="5"
                    :dataSource="formData.tcsd || {}"
                />
            </el-row>
        </div>
    </DropDown>
</template>

<script>
import { mapState } from "vuex";

import DropDown from "components/DropDown.vue";
import { carArg } from "api";

import Diy from "./Diy";

export default {
    name: "VehicleTraction",
    data() {
        return {
            formData: {}
        };
    },
    components: {
        DropDown,
        Diy
    },
    props: {
    },
    computed: {
        ...mapState("models", ["curTreeNodeId"])
    },
    methods: {
        initData() {
            carArg.tractionView({ caId: this.curTreeNodeId }).then(res => {
                if (!res) return;
                this.formData = res.data || {};
            });
        },

        // 保存数据
        save() {
            return new Promise(resolve => {
                let { formData } = this;

                carArg.tractionEdit({ ...formData }).then(res => {
                    if (!res) {
                        resolve(false);
                        return;
                    }
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                    resolve(true);
                });
            });
        },

        saveDiyData(params) {
            let { field, data } = params;
            this.formData[field] = data.tcsdId;
        }
    },
    mounted() {
        this.initData();
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

    .form {
        margin-left: 22px;
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

    .dropbox {
        line-height: 20px;
        :global {
            .downIcon {
                top: 9px;
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

        // table
        .el-table {
            height: auto !important;
            .el-table__body-wrapper {
                height: auto !important;
            }
            table,
            .el-table__empty-block {
                width: 100% !important;
            }
            td,
            th {
                padding: 0;
            }
            .cell {
                line-height: 20px;
            }
            .el-input__inner {
                border: none !important;
            }
        }
    }
}

.diyDown {
    padding-left: 132px;
    width: 100%;
}
</style>
