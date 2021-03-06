<template>
    <div :class="$style.root">
        <div :class="$style.title">缓冲器型号设置-描点法</div>
        <div :class="$style.curBuffer">
            <label>请选择缓冲器型号</label>
            <el-select v-model="curTempId" placeholder="请选择" class="m-l-5">
                <el-option
                    v-for="item in bufferList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
            </el-select>
            <el-checkbox v-model="isDiy" :class="$style.isDiy">自定义</el-checkbox>
            <div :class="$style.deleteBtn" class="cursor-p" @click="onClickDel">删除</div>
        </div>
        <div :class="$style.editType">
            <label>曲线类型</label>
            <el-radio
                v-for="(item) in symmetryTypeList"
                :key="item.type"
                v-model="isSymmetry"
                :label="item.type"
            >{{item.name}}</el-radio>
        </div>
        <div v-if="curTempId || isDiy">
            <div :class="$style.contWrap" v-if="isSymmetry === '1'">
                <ContentLs ref="contentLs" :dataSource="dataSource" />
            </div>
            <div :class="$style.contWrap" v-else>
                <ContentLs :type="1" typeName="拉伸" ref="contentLs" :dataSource="dataSource" />
                <ContentYs :type="2" typeName="压缩" ref="contentYs" :dataSource="dataSource" />
            </div>
            <div :class="$style.footer">
                <el-button class="btn-xl" type="primary" @click="onClickSaveData">保存</el-button>
                <el-button class="btn-xl" @click="cancel">取消</el-button>
            </div>
        </div>

        <NameDialog :visible="nameDialogVisible" :onSaveData="saveData" :onCancel="hideNameDialog" />
    </div>
</template>

<script>
import NameDialog from "components/NameDialog";
import { argConfig } from "api";
import { getUserIdAndType, getObjFromStr } from "utils/util";

import ContentLs from "./ContentLs";
import ContentYs from "./ContentYs";

const symmetryTypeList = [
    { type: "1", name: "对称曲线" },
    { type: "2", name: "非对称曲线" }
];

const needEvalField = [
    "pointAllotDataYs",
    "pointAllotDataLs",
    "pointDataYs",
    "pointDataLs"
];

export default {
    name: "BufferCurve",
    components: {
        ContentLs,
        ContentYs,
        NameDialog
    },
    data() {
        return {
            // 当前的缓冲器型号
            curTempId: "",
            bufferList: [],
            isDiy: false,

            dataSource: {},

            // 是否是对称曲线
            symmetryTypeList,
            isSymmetry: symmetryTypeList[0].type,

            nameDialogVisible: false,

            curBufferTemp: {}
        };
    },
    props: {},
    // computed: {
    //     curBufferTemp() {
    //         let { curTempId, bufferList } = this;
    //         return bufferList.find(item => item.id === curTempId) || {};
    //     }
    // },
    watch: {
        curTempId(newId) {
            let { isSymmetry, bufferList } = this;
            this.curBufferTemp =
                bufferList.find(item => item.id === newId) || {};

            let dataSource = this.curBufferTemp;

            this.isSymmetry = dataSource.isSymmetry || isSymmetry;
            this.dataSource = dataSource;
            this.isDiy = false;
        }
    },
    methods: {
        // 获取模版列表
        getCoupMdfTempList() {
            const { userId, userType } = getUserIdAndType();

            argConfig
                .getCoupMdfTempList({ userId, type: userType })
                .then(res => {
                    if (!res) return;
                    let data = res.data || [];

                    data.map(item => {
                        needEvalField.map(li => {
                            item[li] && (item[li] = getObjFromStr(item[li]));
                        });
                    });

                    this.bufferList = data;
                });
        },

        // 保存模版信息
        saveCoupMdfTemp(params) {
            argConfig.saveCoupMdfTemp(params).then(res => {
                if (!res) return;

                // 保存成功后，刷新select数据
                this.getCoupMdfTempList();

                this.$message({
                    message: "操作成功",
                    type: "success"
                });
            });
        },

        // 点击删除，删除选中项
        onClickDel() {
            if (!this.curTempId) {
                this.$message({
                    message: "请先选择型号",
                    type: "error"
                });
                return;
            }
            argConfig.delCoupMdfTemp({ id: this.curTempId }).then(res => {
                if (!res) return;

                // 保存成功后，刷新select数据，并清空选项
                this.getCoupMdfTempList();
                this.curTempId = "";

                this.$message({
                    message: "操作成功",
                    type: "success"
                });
            });
        },

        onClickSaveData() {
            // 如果是自定义，则输入用户名；否则，覆盖已选数据
            if (this.isDiy) {
                this.nameDialogVisible = true;
                return;
            }

            this.saveData();
        },

        hideNameDialog() {
            this.nameDialogVisible = false;
        },

        saveData(name) {
            let params = {};

            // 神一样对数据格式
            if (this.isSymmetry === "1") {
                let data = this.$refs.contentLs.saveData();
                // 对称曲线
                params.xProportionYs = params.xProportionLs = data.xProportion;

                params.fxProportionYs = params.fxProportionLs =
                    data.fxProportion;

                params.interpolationMethodYs = params.interpolationMethodLs =
                    data.interpolationMethod;

                params.pointAllotDataYs = params.pointAllotDataLs =
                    data.pointAllotData;

                params.pointDataYs = params.pointDataLs = data.pointData;
            } else {
                // 非对称曲线
                let dataYs = this.$refs.contentLs.saveData();
                params.xProportionLs = dataYs.xProportion;
                params.fxProportionLs = dataYs.fxProportion;
                params.interpolationMethodLs = dataYs.interpolationMethod;
                params.pointAllotDataLs = dataYs.pointAllotData;
                params.pointDataLs = dataYs.pointData;

                let dataLs = this.$refs.contentYs.saveData();
                params.xProportionYs = dataLs.xProportion;
                params.fxProportionYs = dataLs.fxProportion;
                params.interpolationMethodYs = dataLs.interpolationMethod;
                params.pointAllotDataYs = dataLs.pointAllotData;
                params.pointDataYs = dataLs.pointData;
            }
            this.hideNameDialog();

            const { userId, userType } = getUserIdAndType();

            let fetchParams = {
                userId,
                type: userType,
                name,
                isSymmetry: this.isSymmetry,
                ...params
            };

            if (!this.isDiy && this.curTempId) {
                fetchParams.id = this.curTempId;
                fetchParams.name = this.curBufferTemp.name;
            }

            this.saveCoupMdfTemp(fetchParams);
        },
        cancel() {}
    },
    mounted() {
        this.getCoupMdfTempList();
    }
};
</script>

<style module lang="scss">
.root {
    .title {
        font-size: 20px;
        text-align: center;
        margin-bottom: 30px;
    }

    .deleteBtn {
        display: inline-block;
        padding: 0 30px;
    }

    label {
        font-size: 14px;
        margin-right: 20px;
    }
    .isDiy {
        margin-left: 20px;
    }

    .editType {
        margin: 10px 0;
        // text-align: center;
    }
    .contWrap {
        margin-bottom: 40px;
    }

    .footer {
        text-align: center;
        margin-bottom: 20px;
    }

    :global {
        .el-input__icon {
            line-height: 1;
        }
    }
}
</style>
