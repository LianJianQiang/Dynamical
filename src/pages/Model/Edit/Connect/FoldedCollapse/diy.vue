<template>
    <DropDown :save="save" size="mini" :placeholder="placeholder" :class="$style.dropdown">
        <div class="dropPanel clearfix" :class="$style.root">
            <el-form ref="form" label-position="left" :model="formData" label-width="160px">
                <el-row :class="$style.row">压溃管1</el-row>
                <el-form-item label="行程">
                    <el-input-number :controls="false" v-model="formData.diy1Journey" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="作用力1">
                    <el-input-number :controls="false" v-model="formData.diy1Effort1" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="作用力2">
                    <el-input-number :controls="false" v-model="formData.diy1Effort2" :min="0"></el-input-number>
                </el-form-item>
                <el-row :class="$style.row">压溃管2</el-row>
                <el-form-item label="行程">
                    <el-input-number :controls="false" v-model="formData.diy2Journey" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="作用力1">
                    <el-input-number :controls="false" v-model="formData.diy2Effort1" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="作用力2">
                    <el-input-number :controls="false" v-model="formData.diy2Effort2" :min="0"></el-input-number>
                </el-form-item>
            </el-form>
        </div>
    </DropDown>
</template>

<script>
import mixin from "../mixin/mixin";
import mixinData from "../mixin/mixinData";

export default {
    name: "FoldedCollapseDiy",
    mixins: [mixin, mixinData]
};
</script>

<style module lang="scss">
.dropdown {
    width: 80px;
    float: right;
}
.root {
    .row {
        margin-bottom: 5px;
        font-size: 14px;
        &:not(:first-child) {
            margin-top: 10px;
        }
    }
}
</style>



