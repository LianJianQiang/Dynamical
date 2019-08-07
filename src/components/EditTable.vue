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
            :onSaveData="saveCurveName"
            :onCancel="()=>this.toggleDialog('nameDialogVisible',false)"
        />
    </div>
</template>

<script>
import NameDialog from "components/NameDialog";

import { getUserIdAndType, getObjFromStr } from "utils/util";
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
        // onSave: {
        //     type: Function,
        //     default: () => {}
        // }
        onSaveCb: {
            type: Function,
            default: () => {}
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 切换dialog状态
        toggleDialog(field, bool) {
            this[field] = bool;
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
                this.tableData = getObjFromStr(data.tcsdData) || [];
                this.curveDialogVisible = false;

                // 打开数据后，将id返回给父组件
                this.onSaveCb(res.data.id);
            });
        },

        // 点击 table的保存，提示输入名称
        onSaveCurve(cb) {
            let params = this.getSaveDataParmas();

            if (this.onSave) {
                this.onSave(params);
                return;
            }

            this.tcsd = params;

            if (params.id) {
                this.tractionLiSave(cb);
                return;
            }

            this.toggleDialog("nameDialogVisible", true);
        },

        getSaveDataParmas() {
            return {
                ...this.tcsd,
                userId,
                tcsdData: this.tableData || [],
                type: this.type
            };
        },

        saveCurveName(name) {
            this.tcsdName = name;
            this.tractionLiSave();
        },

        // 保存talbe对数据
        tractionLiSave(cb) {
            let params = this.tcsd;

            if (this.tcsdName) {
                params.tcsdName = this.tcsdName;
            }

            model.tractionLiSave(params).then(res => {
                if (!res) return;
                this.nameDialogVisible = false;

                this.tcsdId = res.data.id;

                // 保存数据后，将id返回给父组件
                this.onSaveCb(res.data.id);

                typeof cb === "function" && cb();
            });
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

    .tractionList {
        max-height: 300px;
        overflow: auto;
        li {
            padding: 10px 20px;
            margin: 0 5px;
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

