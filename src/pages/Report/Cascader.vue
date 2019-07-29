<template>
    <div :class="$style.root">
        <el-cascader :options="options" :props="props" collapse-tags clearable></el-cascader>
    </div>
</template>

<script>
export default {
    name: "NotFound",
    data() {
        return {
            props: { multiple: true },
            options: [
                {
                    value: 1,
                    label: "东南",
                    children: [
                        {
                            value: 2,
                            label: "上海"
                        },
                        {
                            value: 7,
                            label: "江苏"
                        },
                        {
                            value: 12,
                            label: "浙江"
                        }
                    ]
                },
                {
                    value: 17,
                    label: "西北",
                    children: [
                        {
                            value: 18,
                            label: "陕西"
                        },
                        {
                            value: 21,
                            label: "新疆维吾尔族自治区"
                        }
                    ]
                }
            ]
        };
    },
    props: {}
};
</script>

<style module lang="scss">
.root {
    display: inline-block;
    width: 100%;

    :global {
        .el-cascader {
            width: 100%;
            height: 28px;
            line-height: 28px;
            .el-input__inner {
                height: 28px !important;
            }
        }
    }
}
</style>
