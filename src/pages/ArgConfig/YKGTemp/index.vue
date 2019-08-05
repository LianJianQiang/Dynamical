<template>
    <div :class="$style.root">
        <div :class="$style.title">压溃管自定义</div>
        <div :class="$style.curBuffer">
            <label>请选择压溃管型号型号</label>
            <el-select v-model="curYKGType" placeholder="请选择" class="m-l-5">
                <el-option
                    v-for="item in ykgList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
            </el-select>
            <div :class="$style.deleteBtn" class="cursor-p">删除</div>
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
    </div>
</template>

<script>
import { argConfig } from "api";
import { getUserInfo } from "utils/util";

const userId = getUserInfo().userId;

export default {
    name: "YKGTemp",
    components: {},
    data() {
        return {
            // 当前的缓冲器型号
            ykgList: [],
            curYKGType: "",
            formData: {}
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
            argConfig.getYKGTempList({ userId, type: 1 }).then(res => {
                if (!res) return;
                this.ykgList = res.data;
            });
        },
        save() {},
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
