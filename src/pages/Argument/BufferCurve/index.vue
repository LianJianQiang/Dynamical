<template>
    <div :class="$style.root">
        <div :class="$style.title">缓冲器型号设置</div>
        <div :class="$style.type">
            <el-radio v-model="type" label="symmetry">对称曲线</el-radio>
            <el-radio v-model="type" label="unsymmetry">非对称曲线</el-radio>
        </div>
        <div :class="$style.content"></div>
    </div>
</template>

<script>
export default {
    name: "BufferCurve",
    data() {
        return {
            type: "symmetry"
        };
    },
    props: {}
};
</script>

<style module lang="scss">
.root {
    .title {
        font-size: 20px;
        text-align: center;
    }
    .type {
        margin: 10px 0;
        text-align: center;
    }
}
</style>
