<template>
    <div :class="$style.root">
        <div :class="$style.title">{{curTreeNodeInfo.name}}</div>
        <!-- <div :class="$style.fileBtn">
            <el-button class="btn-default">文件</el-button>
        </div>-->
        <div :class="$style.formWrap" class="clearfix">
            <el-form ref="vehicleForm" :model="formData" :rules="rules" label-width="120px">
                <el-col :span="8">
                    <el-form-item label="车辆质量:" prop="m">
                        <el-input v-model="formData.m" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :offset="2">
                    <el-form-item label="车体刚度:" prop="kcar">
                        <el-input v-model="formData.kcar" clearable></el-input>
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
                    <el-form-item label="车体强度:" prop="qcar">
                        <el-input v-model="formData.qcar" clearable></el-input>
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
                        :label="item.name"
                        :value="item.id"
                        :disabled="item.id === formData.id"
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

import { carArg } from "api";

import Traction from "./Traction";
import Brakes from "./Brakes";
import Diy from "./Diy";
import { type } from "os";
// import Traction from "./Traction";

// 自定义验证规则
const rules = {
    // mass: { max: 10, isInt: true, min: 2 },
    m: {},
    kcar: {},
    qcar: {}
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

            copySource: null,
            rules: {
                m: [{ validator: validateField, trigger: "change" }],
                kcar: [{ validator: validateField, trigger: "change" }],
                qcar: [{ validator: validateField, trigger: "change" }]
            }
        };
    },
    props: {},
    computed: {
        ...mapState("models", ["modelsData"]),
        ...mapGetters("models", ["getTreeNodeByType", "curTreeNodeInfo"]),

        trainList() {
            return this.getTreeNodeByType(MODEL_TREE_TYPE.vehicle);
        }
    },
    methods: {
        initData(cb) {
            let { id } = this.curTreeNodeInfo || {};
            if (!id) return;

            carArg.vehicleView({ id }).then(res => {
                if (!res) return;
                this.formData = res.data || {};

                typeof cb === "function" && cb();
            });
        },

        // 复制
        copy() {
            if (!this.copySource) return;

            // 获取复制源的基本信息
            let sourceInfo = this.trainList.find(
                item => item.id === this.copySource
            );
            if (!sourceInfo) return;

            let { row, cal, id } = sourceInfo;
            carArg.vehicleCopy({ id, carNums: `${row}-${cal}` }).then(res => {
                if (!res) return;

                this.initData(() => {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                });
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

                this.saveData();
            });
        },

        saveData() {
            carArg.vehicleEdit({ ...this.formData }).then(res => {
                if (!res) return;

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
            // this.$refs.vehicleForm.resetFields();
        }
    },
    mounted() {
        this.initData();
    }
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
