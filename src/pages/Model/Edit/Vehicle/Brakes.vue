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
                    :dataSource="diyDataSource"
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

const FIELD_LIST = ["brakedef", "brakef", "delayTime", "loadTime", "tcsd"];

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
        getIsHaveDataStatus(data = {}) {
            this.isHaveData = false;
            for (let i = 0; i < FIELD_LIST.length; i++) {
                if (data[FIELD_LIST[i]]) {
                    this.isHaveData = true;
                    return;
                }
            }
        },
        initData() {
            carArg.brakesView({ caId: this.curTreeNodeId }).then(res => {
                if (!res) return;
                let data = res.data || {};
                let diyData = data.tcsd || {};

                this.getIsHaveDataStatus(data);

                this.formData = { brakedef: "", ...data };
                this.cacheData = { brakedef: "", ...data };

                this.diyDataSource = { ...diyData, tcsdId: diyData.id };
            });
        },

        onCheckboxChange(value) {
            if (this.formData.brakedef === value) {
                this.formData.brakedef = "";
                // delete this.formData.brakedef;
                return;
            }
            this.formData.brakedef = value;
        },

        resetData() {
            this.formData = { ...this.cacheData };

            let diyData = this.cacheData.tcsd || {};
            this.diyDataSource = { ...diyData, tcsdId: diyData.id };
        },

        // 保存数据
        save() {
            return new Promise(resolve => {
                let { formData } = this;

                let params = {};
                for (let i in formData) {
                    if (formData[i] === 0 || formData[i]) {
                        params[i] = formData[i];
                    }
                }

                carArg.brakesEdit({ ...params }).then(res => {
                    if (!res) {
                        resolve(false);
                        return;
                    }
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });

                    this.isHaveData = false;
                    for (let i in params) {
                        if (params[i]) {
                            this.isHaveData = true;
                            break;
                        }
                    }

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
