<template>
    <div :class="$style.root">
        <div :class="$style.title">{{curTreeNodeInfo.name}}</div>
        <!-- <div :class="$style.fileBtn">
            <el-button class="btn-default">文件</el-button>
        </div> -->
        <div :class="$style.formWrap" class="clearfix">
            <el-form ref="vehicleForm" :model="formData" :rules="rules" label-width="120px">
                <el-col :span="8">
                    <el-form-item label="车辆质量:" prop="mass">
                        <el-input v-model="formData.mass" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :offset="2">
                    <el-form-item label="车体刚度:" prop="k_car">
                        <el-input v-model="formData.k_car" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="牵引系统:">
                        <Traction
                            field="traction"
                            :saveData="saveDropDownData"
                            :dataSource="formData.traction"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8" :offset="2">
                    <el-form-item label="车体强度:" prop="q_car">
                        <el-input v-model="formData.q_car" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="制动系统:">
                        <Brakes
                            field="brakes"
                            :saveData="saveDropDownData"
                            :dataSource="formData.brakes"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8" :offset="2">
                    <el-form-item label="用户自定义1:">
                        <Diy
                            field="brakes"
                            :saveData="saveDropDownData"
                            :dataSource="formData.diy1"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户自定义2:">
                        <Diy
                            field="brakes"
                            :saveData="saveDropDownData"
                            :dataSource="formData.diy2"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8" :offset="2">
                    <el-form-item label="用户自定义3:">
                        <Diy
                            field="brakes"
                            :saveData="saveDropDownData"
                            :dataSource="formData.diy3"
                        />
                    </el-form-item>
                </el-col>
            </el-form>
        </div>
        <el-row>
            <el-col :span="20" :class="$style.btnWrap">
                <el-select :class="$style.copySel" v-model="copySource" placeholder="请选择">
                    <el-option
                        v-for="item in trainList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                        :disabled="!modelsData[item.id] || item.id === formData.id"
                    ></el-option>
                </el-select>
                <el-button class="btn-xl" :class="$style.copyBtn" @click="copy">复制</el-button>

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
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

import _util from "utils/util";
import { MODEL_TREE_TYPE } from "common/constants";

import Traction from "./Traction";
import Brakes from "./Brakes";
import Diy from "./Diy";
// import Traction from "./Traction";

// 自定义验证规则
const rules = {
    // mass: { max: 10, isInt: true, min: 2 },
    mass: {},
    k_car: {},
    q_car: {}
};

const validateField = _util.validateField(rules);

export default {
    name: "Vehicle",
    components: {
        Traction,
        Brakes,
        Diy
    },
    data() {
        return {
            formData: {},
            // formData: {
            //     mass: null, // 车体质量
            //     k_car: null, // 车体刚度
            //     q_car: null, // 车体强度
            //     brakes: {}, // 制动系统
            //     traction: {}, // 牵引系统
            //     diy1: {}, // 用户自定义
            //     diy2: {}, // 用户自定义
            //     diy3: {} // 用户自定义
            // },
            copySource: null,
            rules: {
                mass: [{ validator: validateField, trigger: "change" }],
                k_car: [{ validator: validateField, trigger: "change" }],
                q_car: [{ validator: validateField, trigger: "change" }]
            }
        };
    },
    props: {},
    computed: {
        ...mapState("models", ["modelsData", "curModelId"]),
        ...mapGetters("models", ["getTreeNodeByType", "curTreeNodeInfo"]),

        trainList() {
            return this.getTreeNodeByType({
                type: MODEL_TREE_TYPE.vehicle
            });
        }
    },
    methods: {
        ...mapActions("models", ["saveModelData"]),

        // 复制
        copy() {
            if (!this.copySource) return;
            let data = this.modelsData[this.copySource];
            this.formData = { ...data };
            this.$message({
                message: "操作成功",
                type: "success"
            });
        },

        // 保存下拉框的数据
        saveDropDownData(params) {
            let { field, data } = params;
            this.formData[field] = data;
        },
        /**
         * 保存模型数据
         */
        submitForm: function() {
            this.$refs.vehicleForm.validate(vali => {
                if (!vali) return;
                this.saveModelData({
                    id: this.curModelId,
                    data: {
                        type: MODEL_TREE_TYPE.vehicle,
                        ...this.formData
                    }
                });

                this.$message({
                    message: "保存成功",
                    type: "success"
                });
            });
        },

        /**
         * 取消输入
         */
        resetForm: function() {
            this.$refs.vehicleForm.resetFields();
        },

        /**
         * 控制dropDown
         */
        setDropDownVisible(params) {
            let { visible = false, field = "", data = {} } = params;
            if (field) this[field]["traction"] = data;
            this.$refs.traction1.setVisible(visible);
        }
    },
    mounted() {}
};
</script>

<style module lang="scss">
.root {
    padding: 20px 30px;
    min-width: 758px;
    background: #fff;
    border-radius: $raduis_1;

    .title {
        text-align: center;
        font-size: 18px;
        padding-top: 20px;
        margin-bottom: 30px;
    }

    .fileBtn {
        margin-bottom: 50px;
    }

    .copyBtn {
        margin-right: 52px;
    }

    .btnWrap {
        text-align: center;
        .subBtn {
            margin-right: 30px;
        }
    }

    .copySel {
        margin-right: 10px;

        :global {
            .el-input__inner,
            .el-select-dropdown__item {
                height: 22px;
                line-height: 22px;
                font-size: 12px;
            }

            .el-input__icon {
                line-height: 22px;
            }
        }
    }
}
</style>
