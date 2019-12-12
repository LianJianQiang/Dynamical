<template>
    <div :class="$style.root" class="clearfix">
        <div :class="$style.mainWrap" class="fll">
            <slot></slot>
        </div>
        <div :class="$style.suffix" class="flr" v-if="suffix">{{suffix}}</div>
    </div>
</template>

<script>
export default {
    name: "InputNumberWrap",
    data() {
        return {};
    },
    props: ["suffix"]
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 28px;
    border: 1px solid #acc5e5 !important;

    .mainWrap {
        width: calc(100% - 40px);
    }
    .suffix {
        width: 40px;
        text-align: center;
        color: #999;
        font-size: 12px;
    }

    :global {
        .el-input,
        .el-input-number,
        .el-input__inner {
            height: 26px;
            line-height: 26px;
            border: none !important;
        }
    }
}
</style>
