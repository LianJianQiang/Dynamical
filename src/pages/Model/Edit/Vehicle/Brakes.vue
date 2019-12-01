<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown
        :save="save"
        :resetData="resetData"
        :title="$attrs.title || ''"
        :isHaveData="isHaveData"
    >
        <div :class="$style.root">
            <el-row class="listWrap">
                <el-checkbox
                    class="radioWrap"
                    :value="formData.brakedef===1"
                    :label="1"
                    @change="()=>onCheckboxChange(1)"
                >特征曲线定义</el-checkbox>
                <el-form
                    ref="form"
                    :class="$style.form"
                    label-position="left"
                    :model="formData"
                    label-width="120px"
                >
                    <el-form-item label="制动力">
                        <el-input-number :controls="false" v-model="formData.brakef" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="空走时间">
                        <el-input-number :controls="false" v-model="formData.delayTime" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="制动力加载时间">
                        <el-input-number :controls="false" v-model="formData.loadTime" :min="0"></el-input-number>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row class="listWrap">
                <el-checkbox
                    class="radioWrap"
                    :value="formData.brakedef===2"
                    :label="2"
                    @change="()=>onCheckboxChange(2)"
                >制动力用户自定义</el-checkbox>
                <Diy
                    title="制动力用户自定义"
                    field="tcsdId"
                    :saveData="saveDiyData"
                    :class="$style.diyDown"
                    :type="6"
                    :dataSource="{tcsdId: diyDataSource.id}"
                />
            </el-row>
        </div>
    </DropDown>
</template>

<script>
import { mapState } from "vuex";
import DropDown from "components/DropDown.vue";

import { carArg } from "api";

import Diy from "./Diy";

export default {
    name: "VehicleBrakes",
    data() {
        return {
            formData: {},
            diyDataSource: {},
            isHaveData: false
        };
    },
    components: {
        DropDown,
        Diy
    },
    props: {},
    computed: {
        ...mapState("models", ["curTreeNodeId"])
    },
    methods: {
        initData() {
            carArg.brakesView({ caId: this.curTreeNodeId }).then(res => {
                if (!res) return;
                let data = res.data || {};
                let diyData = data.tcsd || {};

                if (data && JSON.stringify(data) !== "{}") {
                    this.isHaveData = true;
                }

                this.formData = { ...data };
                this.cacheData = { ...data };

                this.diyDataSource = { ...diyData };
            });
        },

        onCheckboxChange(value) {
            if (this.formData.brakedef === value) {
                delete formData.brakedef;
                return;
            }
            this.formData.brakedef = value;
        },

        resetData() {
            this.formData = { ...this.cacheData };

            let diyData = this.cacheData.tcsd || {};
            this.diyDataSource = { ...diyData };
        },

        // 保存数据
        save() {
            return new Promise(resolve => {
                let { formData } = this;

                carArg.brakesEdit({ ...formData }).then(res => {
                    if (!res) {
                        resolve(false);
                        return;
                    }
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                    this.isHaveData = true;
                    resolve(true);
                });
            });
        },

        saveDiyData(params) {
            let { field, data } = params;
            this.formData[field] = data.tcsdId;
        }
    },
    mounted() {
        this.initData();
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;

    .form {
        margin-left: 22px;
    }
}

.diyDown {
    padding-left: 144px;
    width: 100%;
}
</style>
