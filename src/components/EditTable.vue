<template>
    <div :class="$style.root">
        <div :class="$style.btnGroup">
            <el-button v-if="showAdd" class="btn-mini" @click="tableAdd">+</el-button>
            <el-button v-if="showDel" class="btn-mini" @click="tableDel">-</el-button>
            <el-button v-if="showOpen" class="btn-mini" @click="tableOpen">打开</el-button>
            <el-button v-if="showSave" class="btn-mini" @click="tableSave">保存</el-button>
        </div>
        <el-table :data="tableData" :height="height" border size="mini">
            <el-table-column prop="order" label="序号" align="center" width="75" />
            <el-table-column prop="x" label="x" align="center" width="75">
                <template slot-scope="scope">
                    <el-input-number
                        :controls="false"
                        v-model="scope.row.x"
                        :min="0"
                        @change="dataChange"
                    ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column prop="fx" label="f(x)" align="center" width="75">
                <template slot-scope="scope">
                    <el-input-number
                        v-model="scope.row.fx"
                        :controls="false"
                        :min="0"
                        @change="dataChange"
                    ></el-input-number>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "Table",
    data() {
        return {
            tableData: [...this.dataSource]
        };
    },
    props: {
        dataSource: {
            type: Array,
            default: () => {
                return [];
            }
        },
        tableDataChange: {
            type: Function,
            default: () => {}
        },
        height: {
            type: String,
            default: "85"
        },
        showOpen: {
            type: Boolean,
            default: true
        },
        showAdd: {
            type: Boolean,
            default: true
        },
        showDel: {
            type: Boolean,
            default: true
        },
        showSave: {
            type: Boolean,
            default: true
        }
    },
    computed: {
    },
    watch: {
    },
    methods: {
        // 单元格里到值发生变化时回调
        dataChange() {
            this.tableDataChange(this.tableData);
        },
        // table中插入一行
        tableAdd() {
            let { tableData } = this;
            tableData.unshift({
                order: tableData.length + 1,
                x: 0,
                fx: 0
            });
            this.tableData = tableData;
            this.tableDataChange(this.tableData);
        },

        // table中删除一行
        tableDel() {
            let { tableData } = this;
            tableData.pop();
            this.tableData = tableData;
            this.tableDataChange(this.tableData);
        },

        // TODO 打开和保存功能需后端支持
        tableOpen() {
            this.$message({
                message: "打开",
                type: "warning"
            });
        },

        // TODO 打开和保存功能需后端支持
        tableSave() {
            this.$message({
                message: "保存",
                type: "warning"
            });
        },

        // 保存数据
        save() {
            return this.tableData;
        }
    },
    mounted() {}
};
</script>
<style module lang="scss">
.root {
    .btnGroup {
        margin-bottom: 10px;
    }

    :global {
        .el-input-number.is-without-controls .el-input__inner {
            padding: $input-pad-s;
        }
        .el-form-item__label,
        .el-form-item__content,
        .el-input,
        .el-input__inner {
            height: 18px;
            line-height: 18px;
        }
        .el-input__inner {
            padding: 0 5px;
        }
        .el-form-item__label,
        .el-checkbox__label {
            font-size: 12px;
            color: $label-color_1;
        }
        .el-form-item {
            margin-bottom: 4px;
        }

        .el-talbe {
            .cell {
                line-height: 20px;
            }
        }
    }
}
</style>

