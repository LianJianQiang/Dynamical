<template>
    <div :class="$style.root">
        <div :class="$style.title">缓冲器型号设置-锚点法</div>
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
            <div :class="$style.contWrap" v-if="curveTypeList.length===0">
                <Content ref="content" />
            </div>
            <div :class="$style.contWrap" v-else v-for="item in curveTypeList" :key="item.type">
                <Content :type="item.type" :typeName="item.name" :ref="`content${item.type}`" />
            </div>
            <div :class="$style.footer">
                <el-button class="btn-xl" type="primary" @click="showNameDialog">保存</el-button>
                <el-button class="btn-xl" @click="cancel">取消</el-button>
            </div>
        </div>

        <NameDialog :visible="nameDialogVisible" :onSaveData="saveData" :onCancel="hideNameDialog" />
    </div>
</template>

<script>
import NameDialog from "components/NameDialog";
import { argConfig } from "api";
import { getUserIdAndType } from "utils/util";

import Content from "./Content";

const { userId, userType } = getUserIdAndType();

const symmetryTypeList = [
    { type: 1, name: "对称曲线" },
    { type: 2, name: "非对称曲线" }
];

const curveTypeList = [{ type: 1, name: "拉伸" }, { type: 2, name: "压缩" }];

export default {
    name: "BufferCurve",
    components: {
        Content,
        NameDialog
    },
    data() {
        return {
            // 当前的缓冲器型号
            curTempId: "",
            bufferList: [],
            isDiy: false,

            // 是否是对称曲线
            symmetryTypeList,
            isSymmetry: symmetryTypeList[0].type,

            nameDialogVisible: false
        };
    },
    props: {},
    computed: {
        curveTypeList() {
            return this.isSymmetry === 1 ? [] : [...curveTypeList];
        }
    },
    methods: {
        // 获取模版列表
        getCoupMdfTempList() {
            argConfig
                .getCoupMdfTempList({ userId, type: userType })
                .then(res => {
                    if (!res) return;
                    this.bufferList = res.data || [];
                });
        },

        // 获取所选模版的详细信息
        getCoupMdfTempView() {
            if (!this.curTempId) return;
            argConfig.getCoupMdfTempView({ id: this.curTempId }).then(res => {
                if (!res) return;
                // TODO 待后端改完数据格式后再写
            });
        },

        // 保存模版信息
        saveCoupMdfTemp(params) {
            console.log(params);
            argConfig.saveCoupMdfTemp(params).then(res => {
                if (!res) return;
                this.$message({
                    message: "操作成功",
                    type: "error"
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

        showNameDialog() {
            this.nameDialogVisible = true;
        },

        hideNameDialog() {
            this.nameDialogVisible = false;
        },

        saveData(name) {
            let data = [];

            // TODO 曲线类型分为对称和非对称，后端数据格式不明确，临时定义为data=[]
            if (this.curveTypeList.length === 0) {
                // 对称曲线
                data.push(this.$refs.content.saveData());
            } else {
                // 非对称曲线
                this.curveTypeList.map(item => {
                    data.push(this.$refs[`content${item.type}`].saveData());
                });
            }
            this.hideNameDialog();

            let params = {
                userId,
                type: userType,
                name,
                isSymmetry: this.isSymmetry,
                data
            };

            this.saveCoupMdfTemp(params);
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
