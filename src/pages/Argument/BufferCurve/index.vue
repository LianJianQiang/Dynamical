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

        <div :class="$style.contWrap" v-if="tableTypeList.length===0">
            <Content />
        </div>
        <div :class="$style.contWrap" v-else v-for="item in tableTypeList" :key="item.type">
            <Content :type="item.name" />
        </div>
        <div :class="$style.footer">
            <el-button class="btn-xl" type="primary" @click="save">保存</el-button>
            <el-button class="btn-xl" @click="cancel">取消</el-button>
        </div>
    </div>
</template>

<script>
import Content from "./Content";

const globalTypeList = [
    { type: "symmetry", name: "对称曲线" },
    { type: "unsymmetry", name: "非对称曲线" }
];

const tableTypeList = [
    { type: "stretch", name: "拉伸" },
    { type: "compress", name: "压缩" }
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
    computed: {
        tableTypeList() {
            return this.globalType === "symmetry" ? [] : [...tableTypeList];
        }
    },
    methods: {
        save() {},
        cancel() {}
    }
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

    .footer {
        text-align: center;
        margin-bottom: 20px;
    }
}
</style>
