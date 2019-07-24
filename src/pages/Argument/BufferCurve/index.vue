<template>
    <div :class="$style.root">
        <div :class="$style.title">缓冲器型号设置</div>
        <div :class="$style.type">
            <el-radio
                v-for="(item) in globalTypeList"
                :key="item.type"
                v-model="globalType"
                :label="item.type"
            >{{item.name}}</el-radio>
        </div>
        <div :class="$style.contWrap">
            <Content />
        </div>

        <div :class="$style.contWrap">
            <Content />
        </div>
    </div>
</template>

<script>
import Content from "./Content";

const globalTypeList = [
    { type: "symmetry", name: "对称曲线" },
    { type: "unsymmetry", name: "非对称曲线" }
];

export default {
    name: "BufferCurve",
    components: {
        Content
    },
    data() {
        return {
            globalTypeList,
            globalType: globalTypeList[0].type
        };
    },
    props: {},
    methods: {}
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
    .contWrap {
        margin-bottom: 40px;
    }
}
</style>
