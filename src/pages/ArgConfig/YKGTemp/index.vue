<template>
    <div :class="$style.root">
        <div :class="$style.title">压溃管自定义</div>
        <div :class="$style.curBuffer">
            <label>请选择压溃管型号</label>
            <el-select v-model="curYKGType" placeholder="请选择" class="m-l-5">
                <el-option
                    v-for="item in ykgList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
            </el-select>
            <div :class="$style.deleteBtn" class="cursor-p" @click="onClickDel">删除</div>
        </div>
        <div class="clearfix" :class="$style.formWrap">
            <el-form ref="form" :inline="true" label-position="right" :model="formData">
                <el-row :class="$style.row">压溃管1</el-row>
                <el-form-item label="行程">
                    <el-input-number :controls="false" v-model="formData.sYkg1" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="作用力1">
                    <el-input-number :controls="false" v-model="formData.fYkg11" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="作用力2">
                    <el-input-number :controls="false" v-model="formData.fYkg12" :min="0"></el-input-number>
                </el-form-item>
                <el-row :class="$style.row">压溃管2</el-row>
                <el-form-item label="行程">
                    <el-input-number :controls="false" v-model="formData.sYkg2" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="作用力1">
                    <el-input-number :controls="false" v-model="formData.fYkg21" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="作用力2">
                    <el-input-number :controls="false" v-model="formData.fYkg22" :min="0"></el-input-number>
                </el-form-item>
            </el-form>
        </div>
        <div :class="$style.footer">
            <el-button class="btn-xl" type="primary" @click="save">保存</el-button>
            <el-button class="btn-xl" @click="cancel">取消</el-button>
        </div>

        <el-dialog
            :custom-class="$style.nameDialog"
            title="请输入曲线名称"
            :visible.sync="nameDialogVisible"
            :modal="false"
        >
            <el-input v-model="name"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="nameDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveData">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { argConfig } from "api";
import { getUserInfo } from "utils/util";

const userInfo = getUserInfo();
const { userId, userType = 1 } = userInfo;

export default {
    name: "YKGTemp",
    components: {},
    data() {
        return {
            // 当前的缓冲器型号
            ykgList: [],
            curYKGType: "",
            formData: {},

            nameDialogVisible: false,
            name: ""
        };
    },
    props: {},
    computed: {},
    watch: {
        curYKGType() {
            let list = this.ykgList || [];
            let curKey = this.curYKGType;
            if (!curKey) return;
            this.formData = list.find(item => item.id === curKey);
        }
    },
    methods: {
        getYKGTempList() {
            // TODO type 根据用户身份确定，管理员：1(公用)，普通用户：2(私有)
            argConfig.getYKGTempList({ userId, type: userType }).then(res => {
                if (!res) return;
                this.ykgList = res.data;
            });
        },

        // 点击删除，删除选中项
        onClickDel() {
            if (!this.curYKGType) {
                this.$message({
                    message: "请先选择型号",
                    type: "error"
                });
            }
            argConfig.delYKGTemp({ id: this.curYKGType }).then(res => {
                if (!res) return;
                this.getYKGTempList();
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
            });
        },

        //  保存数据
        saveData() {
            argConfig
                .saveYKGTemp({
                    ...this.formData,
                    userId,
                    type: userType,
                    name: this.name
                })
                .then(res => {
                    if (!res) return;
                    this.nameDialogVisible = false;
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                });
        },
        save() {
            this.nameDialogVisible = true;
        },
        cancel() {}
    },
    mounted() {
        this.getYKGTempList();
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

    label {
        font-size: 14px;
        margin-right: 20px;
    }

    .deleteBtn {
        display: inline-block;
        padding: 0 30px;
    }

    .formWrap {
        margin: 30px 0;
    }
    .row {
        font-size: 16px;
        font-weight: 500;
    }

    .footer {
        text-align: center;
        margin-bottom: 20px;
    }

    .nameDialog {
        :global {
            .el-input,
            .el-input__inner {
                height: 32px;
                line-height: 32px;
            }
        }
    }

    :global {
        .el-input__icon {
            line-height: 1;
        }
        .el-form-item {
            margin-right: 30px;
        }
    }
}
</style>
