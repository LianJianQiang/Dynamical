<template>
    <div :class="$style.root">
        <div :class="$style.title">缓冲器型号设置-分段函数法</div>
        <div :class="$style.curBuffer">
            <label>请选择缓冲器型号</label>
            <el-select v-model="curBufferType" placeholder="请选择" class="m-l-5">
                <el-option
                    v-for="item in bufferList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <el-checkbox v-model="isDiy" :class="$style.isDiy">自定义</el-checkbox>
        </div>
        <div :class="$style.editType">
            <label>曲线类型</label>
            <el-radio
                v-for="(item) in globalTypeList"
                :key="item.type"
                v-model="globalType"
                :label="item.type"
            >{{item.name}}</el-radio>
        </div>
        <div v-if="curBufferType || isDiy">
            <div class="clearfix" :class="$style.content">
                <div class="fll" :class="$style.tableWrap">
                    <div :class="$style.title">压缩加载</div>
                    <Table />
                </div>
                <div class="fll" :class="$style.tableWrap">
                    <div :class="$style.title">压缩加载</div>
                    <Table />
                </div>
                <div class="fll" :class="$style.tableWrap">
                    <div :class="$style.title">压缩加载</div>
                    <Table />
                </div>
                <div class="fll" :class="$style.tableWrap">
                    <div :class="$style.title">压缩加载</div>
                    <Table />
                </div>
            </div>
            <div :class="$style.footer">
                <el-button class="btn-xl" type="primary" @click="save">保存</el-button>
                <el-button class="btn-xl" @click="cancel">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import Table from "./Table";

// const tableData = [
//     {
//         order: "2016-05-03",
//         start: "王小虎",
//         end: "上海",
//         desc: "上海市普陀区金沙江路 1518 弄"
//     },
//     {
//         order: "2016-05-03",
//         start: "王小虎",
//         end: "上海",
//         desc: "上海市普陀区金沙江路 1518 弄"
//     },
//     {
//         order: "2016-05-03",
//         start: "王小虎",
//         end: "上海",
//         desc: "上海市普陀区金沙江路 1518 弄"
//     }
// ];

const globalTypeList = [
    { type: "symmetry", name: "对称曲线" },
    { type: "unsymmetry", name: "非对称曲线" }
];

export default {
    name: "BufferPiecewise",
    components: {
        Table
    },
    data() {
        return {
            // 当前的缓冲器型号
            curBufferType: "",
            bufferList: [],
            isDiy: true,

            // 是否是对称曲线
            globalTypeList,
            globalType: globalTypeList[0].type
        };
    },
    props: {},
    computed: {},
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
        margin-bottom: 30px;
    }

    label {
        font-size: 14px;
        margin-right: 20px;
    }
    .isDiy {
        margin-left: 20px;
    }

    .editType {
        margin: 10px 0;
        // text-align: center;
    }

    .content {
        .title {
            font-size: 14px;
            font-weight: 500;
            text-align: left;
            margin-bottom: 10px;
        }
    }
    .tableWrap {
        width: 50%;
        padding: 10px;
    }

    .footer {
        text-align: center;
        margin: 20px;
    }

    :global {
        .el-input__icon {
            line-height: 1;
        }
    }
}
</style>
