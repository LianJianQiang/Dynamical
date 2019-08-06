<template>
    <div :class="$style.root">
        <div :class="$style.btnGroup">
            <el-button v-if="showAdd" class="btn-mini" @click="tableAdd">+</el-button>
            <el-button v-if="showDel" class="btn-mini" @click="tableDel">-</el-button>
            <el-button v-if="showOpen" class="btn-mini" @click="onOpenCurve">打开</el-button>
            <el-button v-if="showSave" class="btn-mini" @click="onSaveCurve">保存</el-button>
        </div>
        <el-table :data="tableData" :height="height" border size="mini">
            <el-table-column prop="number" label="序号" align="center" width="75" />
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
            <el-table-column prop="f" label="fx" align="center" width="75">
                <template slot-scope="scope">
                    <el-input-number
                        v-model="scope.row.f"
                        :controls="false"
                        :min="0"
                        @change="dataChange"
                    ></el-input-number>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="请选择曲线" :visible.sync="curveDialogVisible" :modal="false">
            <ul :class="$style.tractionList" class="clearfix">
                <li
                    class="fll cursor-p"
                    v-for="item in tractionList"
                    :key="item.id"
                    @click="onClickTractionLi(item)"
                >{{item.tcsdName}}</li>
            </ul>
        </el-dialog>
        <NameDialog
            :visible="nameDialogVisible"
            :onSaveData="saveData"
            :onCancel="()=>this.toggleDialog('nameDialogVisible',false)"
        />
    </div>
</template>

<script>
import NameDialog from "components/NameDialog";

import { getUserIdAndType } from "utils/util";
import { model } from "api";

const { userId, userType } = getUserIdAndType();

export default {
    name: "Table",
    data() {
        return {
            tableData: [...this.dataSource],
            tcsd: {},

            tractionList: [],

            curveDialogVisible: false,
            nameDialogVisible: false
        };
    },
    components: {
        NameDialog
    },
    props: {
        type: {
            // 如不传，则打开和保存会调用props里到方法
            type: Number
        },
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
        },
        onOpen: {
            type: Function,
            default: () => {}
        },
        onSave: {
            type: Function,
            default: () => {}
        },
        onSaveCb: {
            type: Function
        }
    },
    computed: {},
    watch: {},
    updated() {
        console.log(this.nameDialogVisible);
    },
    methods: {
        initData() {
            if (!this.defaultCurveId) return;
            this.onClickTractionLi({ id: this.defaultCurveId });
        },
        // 切换dialog状态
        toggleDialog(field, bool) {
            this[field] = bool;
            console.log(field, this[field]);
        },
        // 单元格里到值发生变化时回调
        dataChange() {
            this.tableDataChange(this.tableData);
        },
        // table中插入一行
        tableAdd() {
            let { tableData } = this;
            tableData.unshift({
                number: tableData.length + 1,
                x: 0,
                f: 0
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

        // 保存
        tableSave() {
            this.onSave(this.tableData);
        },

        // 打开曲线
        onOpenCurve() {
            if (!this.type) {
                this.onOpen();
                return;
            }
            let type = this.type;
            model.tractionList({ userId, type }).then(res => {
                if (!res) return;
                let { data = [] } = res;
                if (data.length === 0) {
                    this.$message("暂无可选择的数据");
                    return;
                }
                this.tractionList = res.data;
                this.curveDialogVisible = true;
            });
        },

        // 点击打开后，展示列表，并点击list
        onClickTractionLi(item) {
            let { id } = item;
            model.tractionLiView({ id }).then(res => {
                if (!res) return;
                let { data = {} } = res;
                this.tcsd = data;
                this.tableData = data.tcsdData;
                this.curveDialogVisible = false;
            });
        },

        // 点击 table的保存，提示输入名称
        onSaveCurve(data) {
            if (!this.type) {
                this.onSave(this.tableData);
                return;
            }

            this.toggleDialog("nameDialogVisible", true);
        },

        saveData(name) {
            if (!name) {
                this.$message("请输入名称");
                return;
            }
            model
                .tractionLiSave({
                    ...this.tcsd,
                    userId,
                    tcsdName: name,
                    tcsdData: this.tableData || [],
                    type: this.type
                })
                .then(res => {
                    if (!res) return;
                    this.nameDialogVisible = false;

                    // 保存成功后，将id返回给父组件
                    this.onSaveCb && this.onSaveCb(res.data.id);
                });
        },

        // 保存数据，旧
        getTableData() {
            return this.tableData;
        }
    },
    mounted() {
        this.initData();
    }
};
</script>
<style module lang="scss">
.root {
    .btnGroup {
        margin-bottom: 10px;
    }

    .tractionList {
        max-height: 300px;
        overflow: auto;
        li {
            padding: 10px 20px;
            margin: 0 5px;
        }
    }

    .nameDialog {
        :global {
            .el-input,
            .el-input__inner {
                height: 32px;
                line-height: 32px;
            }
        }
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

