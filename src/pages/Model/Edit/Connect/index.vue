<template>
    <div :class="$style.root">
        <div :class="$style.title">{{curTreeNodeInfo.name}}</div>
        <!-- <div :class="$style.fileBtn">
            <el-button class="btn-default">文件</el-button>
        </div>-->
        <el-row :class="$style.content" class="clearfix">
            <el-col :class="$style.front" :span="10">
                <div :class="$style.title">前端面</div>
                <el-form ref="frontForm" :model="frontData" label-width="120px">
                    <el-form-item label="缓冲器:">
                        <Buffer
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.hcq })"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="橡胶轴承:">
                        <RubberBearing
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.xjzc})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="压溃管:">
                        <Foldedcollapse
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.ykg})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="过载保护:">
                        <OverloadProtection
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.gzbh})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="防爬器:">
                        <Anticreeper
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.fpq})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="车间减震器:">
                        <Damper
                            :type="1"
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.cjjz})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="风挡系统:">
                        <Windshield
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.fd})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="用户自定义:">
                        <Diy
                            field="diy1"
                            :type="2"
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.diy1})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="用户自定义:">
                        <Diy
                            field="diy2"
                            :type="3"
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.diy2})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="2" :offset="1" :class="$style.copyArea">
                <div>复制区</div>
                <div class="clearfix" :class="$style.imgWrap">
                    <img class="fll" :src="Img['copyLeft']" alt @click="copyItem('left')" />
                    <img class="flr" :src="Img['copyRight']" alt @click="copyItem('right')" />
                </div>
            </el-col>
            <el-col :class="$style.back" :span="10" :offset="1">
                <div :class="$style.title">后端面</div>
                <el-form ref="frontForm" :model="backData" label-width="120px">
                    <el-form-item label="缓冲器:">
                        <Buffer
                            :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.hcq})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="橡胶轴承:">
                        <RubberBearing
                            :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.xjzc})"
                            :dataSource="backData"
                        />
                    </el-form-item>
                    <el-form-item label="压溃管:">
                        <Foldedcollapse
                            :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.ykg})"
                            :dataSource="backData"
                        />
                    </el-form-item>
                    <el-form-item label="过载保护:">
                        <OverloadProtection
                            :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.gzbh})"
                            :dataSource="backData"
                        />
                    </el-form-item>
                    <el-form-item label="防爬器:">
                        <Anticreeper
                            :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.fpq})"
                            :dataSource="backData"
                        />
                    </el-form-item>
                    <el-form-item label="车间减震器:">
                        <Damper
                            :type="1"
                            :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.cjjz})"
                            :dataSource="backData"
                        />
                    </el-form-item>
                    <el-form-item label="风挡系统:">
                        <Windshield
                            :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.fd})"
                            :dataSource="backData"
                        />
                    </el-form-item>
                    <el-form-item label="用户自定义:">
                        <Diy
                            field="diy1"
                            :type="2"
                            :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.diy1})"
                            :dataSource="frontData"
                        />
                    </el-form-item>
                    <el-form-item label="用户自定义:">
                        <Diy
                            field="diy2"
                            :type="3"
                            :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.diy2})"
                            :dataSource="frontData"
                        />
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
                        :label="item.name"
                        :value="item.id"
                        :disabled="item.id === curTreeNodeId"
                    ></el-option>
                </el-select>
                <el-button class="btn-xl" :class="$style.copyBtn" @click="copyCar">复制</el-button>

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
import {
    MODEL_TREE_TYPE,
    CONNECT_ELE_DICT,
    CAR_ELE_DICT
} from "common/constants";
import { filterJson } from "utils/util";
import { model } from "api";

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
        return {
            frontData: {},
            backData: {},
            copySource: null,
            Img,
            eleDict: CONNECT_ELE_DICT
        };
    },
    props: {},
    computed: {
        ...mapState("models", ["curModelId", "curTreeNodeId"]),
        ...mapGetters("models", [
            "getTreeNodeByType",
            "curTreeNodeInfo",
            "getTreeNodeById",
            "curCarNum"
        ]),

        trainList() {
            return this.getTreeNodeByType(MODEL_TREE_TYPE.connect);
        },
        carNameStr() {
            let { curCarNum } = this;
            if (!this.curCarNum) return "";
            return `${curCarNum.row}-${curCarNum.cal}`;
        }
    },
    methods: {
        ...mapActions("uiState", ["saveDefinedConnect"]),

        // 获取页面数据
        initData(carNameStr, cb) {
            carNameStr = carNameStr || this.carNameStr;
            if (!carNameStr) return;

            model
                .getAllCoupTypeByModelId({
                    modelId: this.curModelId,
                    carNum: carNameStr
                })
                .then(res => {
                    if (!res) return;

                    let { data = [] } = res;
                    let front = data.find(item => item.faceType === "1") || {};
                    let back = data.find(item => item.faceType === "2") || {};

                    this.frontData = { ...front };
                    this.backData = { ...back };

                    typeof cb === "function" && cb();
                });
        },
        // 复制端
        copyItem(item) {
            if (item === "left") {
                this.frontData = { ...this.backData };
            } else {
                this.backData = { ...this.frontData };
            }
            this.$message("操作成功");
        },

        // 复制 其他车辆
        copyCar() {
            if (!this.copySource) {
                this.$message("请先选择车辆");
                return;
            }

            // TODO 未测试
            let sourceInfo = this.getTreeNodeById(this.copySource);
            console.log(sourceInfo);

            let { row, cal } = sourceInfo;
            if (!row || !cal) return null;

            this.initData(`${row}-${cal}`, () => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
            });
        },

        // 保存下拉框的数据
        saveDropDownData(params) {
            let { datas, parent, ele } = params;
            this[parent] = { ...this[parent], ...datas };

            // 保存已定义的元件列表，图形显示使用
            let faceType = CAR_ELE_DICT.back.key;
            if (parent === "frontData") {
                faceType = CAR_ELE_DICT.front.key;
            }
            this.saveDefinedConnect({
                id: this.carNameStr,
                type: faceType,
                eleType: ele
            });
        },

        /**
         * 保存模型数据
         */
        submitForm: function() {
            let frontData = filterJson(this.frontData);
            let backData = filterJson(this.backData);

            if (!this.carNameStr) {
                this.$message({
                    message: "数据错误",
                    type: "error"
                });
                return;
            }

            Object.assign(frontData, {
                modelId: this.curModelId,
                faceType: 1,
                carNum: this.carNameStr
            });

            Object.assign(backData, {
                modelId: this.curModelId,
                faceType: 2,
                carNum: this.carNameStr
            });

            let params = {
                allCoupTypeArr: [{ ...frontData }, { ...backData }]
            };

            model.saveAllCoupType(params).then(res => {
                if (!res) return;

                this.frontData = { ...frontData, id: res.data["1"] };
                this.backData = { ...backData, id: res.data["2"] };

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
            // this.frontData = {};
            // this.backData = {};
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
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        padding-top: 300px;
        .imgWrap {
            width: 100%;
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

    :global {
        .el-form-item__label {
            text-align: center;
        }
    }
}
</style>
