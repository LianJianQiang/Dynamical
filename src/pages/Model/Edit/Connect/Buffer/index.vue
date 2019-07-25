<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown :save="save">
        <div :class="$style.root">
            <el-row :class="$style.curveWrap">
                <el-radio v-model="radioValue" label="check1">锚点法设置</el-radio>
                <el-form
                    class="clearfix"
                    ref="form"
                    :class="$style.form"
                    label-position="left"
                    :model="check1Data"
                    label-width="120px"
                >
                    <el-form-item label="型号选择">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="行程">
                        <el-input-number :controls="false" v-model="check1Data.brake" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="间隙">
                        <el-input-number :controls="false" v-model="check1Data.delaytime" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="包络线间震动的阻尼">
                        <el-input-number :controls="false" v-model="check1Data.loadtime" :min="0"></el-input-number>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row :class="$style.curveWrap" class="clearfix">
                <el-radio v-model="radioValue" label="check2">分段函数法设置</el-radio>

                <!-- <el-checkbox label="check2" class="">分段函数法设置</el-checkbox> -->
                <div :class="$style.typeWrap">
                    <div class="clearfix">
                        <div class="fll">型号选择</div>
                        <el-select v-model="value" placeholder="请选择" class="flr">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
            </el-row>
            <el-row :class="$style.curveWrap" class="clearfix">
                <div class="clearfix">
                    <el-radio v-model="radioValue" label="check3">缓冲器本构</el-radio>

                    <!-- <el-checkbox label="check3" class="fll">缓冲器本构</el-checkbox> -->
                    <el-input-number
                        class="flr"
                        :controls="false"
                        v-model="check3Data.num"
                        :min="0"
                        style="width:88px;margin-bottom:6px"
                    ></el-input-number>
                </div>
                <el-form
                    ref="form"
                    :class="$style.form"
                    label-position="left"
                    :model="check3Data"
                    label-width="120px"
                >
                    <el-form-item label="钩缓质量" label-position="left">
                        <el-input-number :controls="false" v-model="check3Data.zl" :min="0"></el-input-number>
                    </el-form-item>
                </el-form>
            </el-row>
        </div>
    </DropDown>
</template>

<script>
import DropDown from "components/DropDown.vue";

export default {
    name: "VehicleBrakes",
    data() {
        let { dataSource } = this;
        let { checked, data } = dataSource;
        let check1Data = {},
            check2Data = [],
            check3Data = {},
            radioValue = "";

        if (checked === "checked1") {
            check1Data = data || {};
        } else if (checked === "checked2") {
            check2Data = data || [];
        }

        return {
            check1Data,
            check2Data,
            check3Data,
            radioValue,

            options: [
                {
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                },
                {
                    value: "选项3",
                    label: "蚵仔煎"
                },
                {
                    value: "选项4",
                    label: "龙须面"
                },
                {
                    value: "选项5",
                    label: "北京烤鸭"
                }
            ],
            value: ""
        };
    },
    components: {
        DropDown
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
        setLine(sour) {
            console.log(sour);
        },
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
    font-size: 12px;
    line-height: 20px;

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

    .typeWrap {
        margin-left: 22px;
    }

    .lineSet {
        font-size: 12px;
        cursor: pointer;
    }

    :global {
        .m-l-5 {
            margin-left: 5px;
        }
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

    :global {
        .el-select {
            width: 90px;
            margin-right: 10px;
        }
        .el-input__inner,
        .el-input__icon {
            height: 20px;
            line-height: 20px;
            font-size: 12px;
        }
    }
}

.brakeDiyDown {
    padding-left: 132px;
    width: 100%;
}
</style>
