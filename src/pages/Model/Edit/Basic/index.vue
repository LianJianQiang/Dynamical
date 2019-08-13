<template>
    <div :class="$style.root">
        <div :class="$style.title">列车基本参数</div>
        <div :class="$style.formWrap">
            <div>
                <h4>第一列</h4>
                <div :class="$style.cont" class="clearfix">
                    <el-form ref="no1Form" :model="no1" :rules="rules" label-width="120px">
                        <el-col :span="10">
                            <el-form-item label="车辆数量:" prop="num">
                                <el-input v-model="no1.num" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="车辆长度:" prop="length">
                                <el-input v-model="no1.length" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="速度:" prop="v">
                                <el-input v-model="no1.v" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="起动阻力:" prop="qdf">
                                <el-input v-model="no1.qdf" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="brakes(u):" prop="mu">
                                <el-input v-model="no1.mu" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="作用速度:" prop="vlimit">
                                <el-input v-model="no1.vlimit" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="牵引力特征曲线:">
                                <Traction parentField="no1" :saveData="saveTractionData" type="1" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="基本运行阻力:">
                                <el-col :span="7" :offset="1" :class="$style.basicReLabel">
                                    <el-form-item label="A:">
                                        <el-input v-model="no1.basicresisA" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" :offset="1" :class="$style.basicReLabel">
                                    <el-form-item label="B:">
                                        <el-input v-model="no1.basicresisB" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" :offset="1" :class="$style.basicReLabel">
                                    <el-form-item label="C:">
                                        <el-input v-model="no1.basicresisC" />
                                    </el-form-item>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </div>
            </div>
            <div>
                <h4>第二列</h4>
                <div :class="$style.cont" class="clearfix">
                    <el-form ref="no2Form" :model="no2" :rules="rules" label-width="120px">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="车辆数量:" prop="num">
                                    <el-input v-model="no2.num" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="2">
                                <el-form-item label="车辆长度:" prop="length">
                                    <el-input v-model="no2.length" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="速度:" prop="v">
                                    <el-input v-model="no2.v" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="2">
                                <el-form-item label="起动阻力:" prop="qdf">
                                    <el-input v-model="no2.qdf" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="brakes(u):" prop="mu">
                                    <el-input v-model="no2.mu" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="2">
                                <el-form-item label="作用速度:" prop="vlimit">
                                    <el-input v-model="no2.vlimit" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="牵引力特征曲线:">
                                    <Traction
                                        parentField="no2"
                                        :saveData="saveTractionData"
                                        type="2"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="2">
                                <el-form-item label="基本运行阻力:">
                                    <el-col :span="7" :offset="1" :class="$style.basicReLabel">
                                        <el-form-item label="A:">
                                            <el-input v-model="no2.basicresisA" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7" :offset="1" :class="$style.basicReLabel">
                                        <el-form-item label="B:">
                                            <el-input v-model="no2.basicresisB" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7" :offset="1" :class="$style.basicReLabel">
                                        <el-form-item label="C:">
                                            <el-input v-model="no2.basicresisC" />
                                        </el-form-item>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
            <el-row>
                <el-col :span="20" :class="$style.btnWrap">
                    <el-button
                        :class="$style.subBtn"
                        class="btn-xl"
                        type="primary"
                        @click="submitForm"
                    >保存</el-button>
                    <el-button class="btn-xl" @click="resetForm">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import _util from "utils/util";

import { model } from "api";

import Traction from "./Traction";

// 自定义验证规则
const rules = {
    num: { max: 18, isInt: true, min: 2 },
    length: {},
    v: {},
    mu: {},
    vlimit: {},
    qdf: {}
};

const validateField = (rule, value, cb) => {
    let result = _util.validateNum(value, rules[rule.field]);
    if (result) {
        cb(new Error(result));
    }
    cb();
};

export default {
    name: "BasicInfo",
    components: {
        Traction
    },
    data() {
        /**
         * 当将两列车当数据放到一个formData中时，ele当校验规则会失效
         */
        return {
            no1: {},
            no2: {},

            rules: {
                num: [{ validator: validateField, trigger: "change" }],
                length: [{ validator: validateField, trigger: "change" }],
                speed: [{ validator: validateField, trigger: "change" }],
                brakes: [{ validator: validateField, trigger: "change" }],
                startResistance: [
                    { validator: validateField, trigger: "change" }
                ],
                speed2: [{ validator: validateField, trigger: "change" }],
                basicRe: [{ validator: validateField, trigger: "change" }]
            }
        };
    },
    props: {},
    computed: {
        ...mapState("models", ["curModelId"])
    },
    methods: {
        ...mapActions("models", ["getModelData"]),

        initData() {
            model.getVehicleBasic({ modelId: this.curModelId }).then(res => {
                if (!res) return;

                let { data = {} } = res;
                this.no1 = data.ve1 || {};
                this.no2 = data.ve2 || {};
            });
        },

        /**
         * 保存模型数据
         */
        submitForm: function() {
            Promise.all([
                this.$refs.no1Form.validate(),
                this.$refs.no2Form.validate()
            ])
                .then(([val1, val2]) => {
                    if (val1 && val2) {
                        model
                            .vehicleBasicEdit({
                                ve1Info: {
                                    ...this.no1,
                                    modelId: this.curModelId
                                },
                                ve2Info: {
                                    ...this.no2,
                                    modelId: this.curModelId
                                }
                            })
                            .then(res => {
                                if (!res) return;
                                let { data = {} } = res;

                                this.no1 = { ...this.no1, id: data.v1Id };
                                this.no2 = { ...this.no2, id: data.v2Id };

                                // 基本参数变更以后，更新treeData
                                this.getModelData(this.curModelId);
                                this.$message("保存成功");
                            });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        /**
         * 取消输入
         */
        resetForm: function() {
            this.$refs.no1Form.resetFields();
            this.$refs.no2Form.resetFields();
        },

        saveTractionData(params) {
            let { field = "", data = {} } = params;
            if (field) this[field]["traction"] = data;
        }
    },
    mounted() {
        this.initData();
    }
};
</script>

<style module lang="scss">
.root {
    // width: 100%;
    // height: 100%;
    padding: 20px 30px;
    background: #fff;
    border-radius: $raduis_1;

    .title {
        text-align: center;
        font-size: 18px;
        padding: 20px 0;
    }

    .formWrap {
        h4 {
            font-size: 14px;
            margin-bottom: 20px;
        }
    }
    .btnWrap {
        text-align: center;
        .subBtn {
            margin-right: 30px;
        }
    }

    .basicReLabel {
        :global {
            .el-form-item__label {
                width: 20px !important;
            }
            .el-form-item__content {
                margin-left: 20px !important;
            }
            .el-input__inner {
                padding: 0 5px !important;
            }
        }
    }
}
</style>
