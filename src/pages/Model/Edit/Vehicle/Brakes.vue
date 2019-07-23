<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown :save="save">
        <div :class="$style.root">
            <!-- <el-checkbox-group v-model="checkboxGroup" :max="1"> -->
            <el-row :class="$style.curveWrap">
                <!-- <el-checkbox label="check1">制动力参数设置</el-checkbox> -->
                <el-radio v-model="radioValue" label="check1">制动力参数设置</el-radio>

                <el-form
                    ref="form"
                    :class="$style.form"
                    label-position="left"
                    :model="check1Data"
                    label-width="120px"
                >
                    <el-form-item label="制动力">
                        <el-input-number :controls="false" v-model="check1Data.brake" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="空走时间">
                        <el-input-number :controls="false" v-model="check1Data.delaytime" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="制动力加载时间">
                        <el-input-number :controls="false" v-model="check1Data.loadtime" :min="0"></el-input-number>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row :class="$style.curveWrap" class="clearfix">
                <!-- <el-checkbox label="check2" class="fll">制动力用户自定义</el-checkbox> -->
                <el-radio v-model="radioValue" label="check2">制动力用户自定义</el-radio>

                <Diy
                    size="mini"
                    field="check2Data"
                    :saveData="saveDropDownData"
                    :class="$style.brakeDiyDown"
                />
            </el-row>
            <!-- <el-row :class="$style.curveWrap">
                    <el-checkbox label="check3">制动控制力定义</el-checkbox>
            </el-row>-->
            <!-- </el-checkbox-group> -->
        </div>
    </DropDown>
</template>

<script>
import DropDown from "components/DropDown.vue";

import Diy from "./Diy";

export default {
    name: "VehicleBrakes",
    data() {
        let { dataSource } = this;
        let { checked, data } = dataSource;
        let check1Data = {},
            check2Data = [],
            radioValue = checked;

        if (checked === "checked1") {
            check1Data = data || {};
        } else if (checked === "checked2") {
            check2Data = data || [];
        } else {
            radioValue = "";
        }

        return {
            check1Data,
            check2Data,
            radioValue
        };
    },
    components: {
        DropDown,
        Diy
    },
    props: {
        dataSource: {
            type: Object,
            default: () => {
                return {};
            }
        },
        field: {
            type: String,
            required: true
        },
        saveData: {
            type: Function,
            default: () => {}
        }
    },
    computed: {},
    methods: {
        // 保存数据
        save() {
            let { check1Data, check2Data, radioValue } = this;

            let data = {};
            if (radioValue === "check1") {
                data = { ...check1Data };
            } else if (radioValue === "check2") {
                data = check2Data;
            }

            if (!this.field) return;
            this.saveData({ data, field: this.field });
        },

        saveDropDownData(params) {
            let { field, data } = params;
            this[field] = data;
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
    }
}

.brakeDiyDown {
    padding-left: 132px;
    width: 100%;
}
</style>
