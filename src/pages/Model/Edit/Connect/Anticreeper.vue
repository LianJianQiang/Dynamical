<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown :save="save" :size="size" :placeholder="placeholder">
        <div class="dropPanel">
            <el-form ref="form" label-position="left" :model="formData" label-width="160px">
                <el-form-item label="空行程">
                    <el-input-number :controls="false" v-model="formData.skanclim" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="行程">
                    <el-input-number :controls="false" v-model="formData.sanclim" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="作用力">
                    <el-input-number :controls="false" v-model="formData.fanclim" :min="0"></el-input-number>
                </el-form-item>
            </el-form>
        </div>
    </DropDown>
</template>

<script>
import mixin from "./mixin/mixin";
import mixinData from "./mixin/mixinData";

export default {
    name: "Anticreeper",
    mixins: [mixin, mixinData]
};
</script>
