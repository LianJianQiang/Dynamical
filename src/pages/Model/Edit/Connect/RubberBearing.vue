<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown :save="save" :size="size" :placeholder="placeholder">
        <div class="dropPanel">
            <el-form ref="form" label-position="left" :model="formData" label-width="160px">
                <el-form-item label="最大变形">
                    <el-input-number :controls="false" v-model="formData.max" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="刚度">
                    <el-input-number :controls="false" v-model="formData.rigidity" :min="0"></el-input-number>
                </el-form-item>
            </el-form>
        </div>
    </DropDown>
</template>

<script>
import mixin from "./mixin/mixin";
import mixinData from "./mixin/mixinData";

export default {
    name: "RubberBearing",
    mixins: [mixin, mixinData]
};
</script>
