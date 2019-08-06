<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown :save="save">
        <div :class="$style.root">
            <el-row :class="$style.curveWrap">
                <el-radio v-model="formData.coupdef" :label="1">锚点法设置</el-radio>
                <el-form
                    class="clearfix"
                    ref="form"
                    :class="$style.form"
                    label-position="left"
                    :model="formData"
                    label-width="120px"
                >
                    <el-form-item label="型号选择">
                        <el-select v-model="formData.couMdfId" placeholder="请选择">
                            <el-option
                                v-for="item in curveList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="行程">
                        <el-input-number :controls="false" v-model="formData.couRoute" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="间隙">
                        <el-input-number :controls="false" v-model="formData.couGap" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="包络线间震动的阻尼">
                        <el-input-number :controls="false" v-model="formData.couDeboost" :min="0"></el-input-number>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row :class="$style.curveWrap" class="clearfix">
                <el-radio v-model="formData.coupdef" :label="2">分段函数法设置</el-radio>

                <div :class="$style.typeWrap">
                    <div class="clearfix">
                        <div class="fll">型号选择</div>
                        <el-select v-model="formData.couFdhsfId" placeholder="请选择" class="flr">
                            <el-option
                                v-for="item in piecewiseLsit"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
            </el-row>
            <el-row :class="$style.curveWrap" class="clearfix">
                <div class="clearfix">
                    <el-radio v-model="formData.coupdef" :label="3">缓冲器本构</el-radio>

                    <el-input-number
                        class="flr"
                        :controls="false"
                        v-model="formData.couEquation"
                        :min="0"
                        style="width:88px;margin-bottom:6px"
                    ></el-input-number>
                </div>
                <el-form
                    ref="form"
                    :class="$style.form"
                    label-position="left"
                    :model="formData"
                    label-width="120px"
                >
                    <el-form-item label="钩缓质量" label-position="left">
                        <el-input-number :controls="false" v-model="formData.couQuality" :min="0"></el-input-number>
                    </el-form-item>
                </el-form>
            </el-row>
        </div>
    </DropDown>
</template>

<script>
import DropDown from "components/DropDown.vue";
import { getUserIdAndType } from "utils/util";
import { argConfig } from "api";

import mixin from "./mixin/mixin";
import mixinData from "./mixin/mixinData";

const { userId, userType } = getUserIdAndType();

export default {
    name: "ConnectBuffer",
    mixins: [mixin, mixinData],
    data() {
        return {
            curveList: [], // 锚点list
            piecewiseLsit: [] // 分段函数list
        };
    },
    components: {
        DropDown
    },
    computed: {},
    methods: {
        // 查询缓冲器分段函数法模版列表
        getCoupFdhsfTempList() {
            argConfig
                .getCoupFdhsfTempList({ type: userType, userId })
                .then(res => {
                    if (!res) return;
                    this.piecewiseLsit = res.data || [];
                });
        },

        // 查询缓冲器描点法模版列表
        getCoupMdfTempList() {
            argConfig
                .getCoupMdfTempList({ type: userType, userId })
                .then(res => {
                    if (!res) return;
                    this.curveList = res.data || [];
                });
        }
    },
    mounted() {
        this.getCoupFdhsfTempList();
        this.getCoupMdfTempList();
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
