<template>
    <div :class="$style.root">
        <div :class="$style.title">{{dataSource.treeNode.label}}</div>
        <div :class="$style.fileBtn">
            <el-button class="btn-default">文件</el-button>
        </div>
        <el-row :class="$style.content" class="clearfix">
            <el-col :class="$style.front" :span="8">
                <div :class="$style.title">前端面</div>
                <el-form ref="frontForm" :model="frontData" label-width="120px">
                    <el-form-item label="缓冲器:">
                        <Buffer
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData'})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="橡胶轴承:">
                        <RubberBearing
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData'})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="压溃管:">
                        <Foldedcollapse
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData'})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="过载保护:">
                        <OverloadProtection
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData'})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="防爬器:">
                        <Anticreeper
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData'})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="车间减震器:">
                        <Damper
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData'})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="风挡系统:">
                        <Windshield
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData'})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="用户自定义:">
                        <Diy
                            field="diy1"
                            :type="2"
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData'})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="用户自定义:">
                        <!-- <Diy
                            :field="diy2"
                            :type="3"
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData'})"
                            :dataSource="frontData"
                        />-->
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="2" :offset="2" :class="$style.copyArea">
                <div>复制区</div>
                <div class="clearfix" :class="$style.imgWrap">
                    <img class="fll" :src="Img['copyLeft']" alt @click="copyItem('left')" />
                    <img class="flr" :src="Img['copyRight']" alt @click="copyItem('right')" />
                </div>
            </el-col>
            <el-col :class="$style.back" :span="8" :offset="2">
                <div :class="$style.title">后端面</div>
                <el-form ref="frontForm" :model="backData" label-width="120px">
                    <el-form-item label="缓冲器:">
                        <Buffer
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData'})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="橡胶轴承:">
                        <RubberBearing
                            :saveData="(params)=>saveDropDownData({...params,parent:'backData'})"
                            :dataSource="backData"
                        />
                    </el-form-item>
                    <el-form-item label="压溃管:">
                        <Foldedcollapse
                            :saveData="(params)=>saveDropDownData({...params,parent:'backData'})"
                            :dataSource="backData"
                        />
                    </el-form-item>
                    <el-form-item label="过载保护:">
                        <OverloadProtection
                            :saveData="(params)=>saveDropDownData({...params,parent:'backData'})"
                            :dataSource="backData"
                        />
                    </el-form-item>
                    <el-form-item label="防爬器:">
                        <Anticreeper
                            :saveData="(params)=>saveDropDownData({...params,parent:'backData'})"
                            :dataSource="backData"
                        />
                    </el-form-item>
                    <el-form-item label="车间减震器:">
                        <Damper
                            :saveData="(params)=>saveDropDownData({...params,parent:'backData'})"
                            :dataSource="backData"
                        />
                    </el-form-item>
                    <el-form-item label="风挡系统:">
                        <Windshield
                            :saveData="(params)=>saveDropDownData({...params,parent:'backData'})"
                            :dataSource="backData"
                        />
                    </el-form-item>
                    <el-form-item label="用户自定义:">
                        <!-- <Diy
                            :field="diy1"
                            :type="2"
                            :saveData="(params)=>saveDropDownData({...params,parent:'backData'})"
                            :dataSource="backData"
                        />-->
                    </el-form-item>
                    <el-form-item label="用户自定义:">
                        <!-- <Diy
                            :field="diy2"
                            :type="3"
                            :saveData="(params)=>saveDropDownData({...params,parent:'backData'})"
                            :dataSource="backData"
                        />-->
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
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

import Img from "assets/images";
import { MODEL_TREE_TYPE } from "common/constants";

import Foldedcollapse from "./FoldedCollapse";

import Diy from "./Diy";
import Buffer from "./Buffer";
import RubberBearing from "./RubberBearing";
import Damper from "./Damper";
import Anticreeper from "./Anticreeper";
import OverloadProtection from "./OverloadProtection";
import Windshield from "./Windshield";

export default {
    name: "Connect",
    components: {
        RubberBearing,
        Foldedcollapse,
        Damper,
        Anticreeper,
        OverloadProtection,
        Windshield,
        Diy,
        Buffer
    },
    data() {
        /**
         * 当将两列车当数据放到一个formData中时，ele当校验规则会失效
         */
        let formData = { ...this.dataSource };
        // let { front = {}, back = {} } = formData;
        return {
            formData,
            frontData: {},
            backData: {},
            copySource: null,
            modelName: this.dataSource.modelName,
            Img
        };
    },
    props: {
        dataSource: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState("models", ["modelsData"]),
        ...mapGetters("models", ["getTreeListByType"]),

        trainList() {
            return this.getTreeListByType({
                modelName: this.dataSource.modelName,
                type: MODEL_TREE_TYPE.connect
            });
        }
    },
    methods: {
        ...mapActions("models", ["saveModelData"]),

        // 复制端
        copyItem(item) {
            if (item === "left") {
                this.frontData = JSON.parse(JSON.stringify(this.backData));
            } else {
                this.backData = JSON.parse(JSON.stringify(this.frontData));
            }
        },

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
            let { datas, parent } = params;
            console.log(parent, datas);
            this[parent] = { ...this[parent], ...datas };
        },
        /**
         * 保存模型数据
         */
        submitForm: function() {
            console.log(this.frontData, this.backData);
            this.saveModelData({
                id: this.dataSource.id,
                data: {
                    id: this.dataSource.id,
                    type: MODEL_TREE_TYPE.connect,
                    modelName: this.dataSource.modelName,
                    frontData: { ...this.frontData },
                    backData: { ...this.backData }
                }
            });

            this.$message({
                message: "保存成功",
                type: "success"
            });
        },

        /**
         * 取消输入
         */
        resetForm: function() {
            this.frontData = {};
            this.backData = {};
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
    }

    .fileBtn {
        margin-bottom: 50px;
    }

    .content {
        font-size: 14px;
        .title {
            font-size: 16px;
            margin-bottom: 24px;
            font-weight: 500;
        }
    }

    .copyArea {
        font-size: 26px;
        font-weight: 500;
        text-align: center;
        padding-top: 300px;
        .imgWrap {
            width: 86px;
            height: 64px;
            cursor: pointer;
            img {
                width: 50%;
                height: 100%;
            }
        }
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
