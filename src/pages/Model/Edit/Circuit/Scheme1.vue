<template>
    <div :class="$style.root">
        <div :class="$style.btnGroup">
            <span class="btn-mini" :class="$style.btn" @click="tableAdd">+</span>
            <span class="btn-mini" :class="$style.btn" @click="tableDel">-</span>
        </div>
        <el-table :data="tableData" border max-height="500">
            <el-table-column prop="xInitial" label="起始位置" align="center">
                <template slot-scope="scope">
                    <el-input-number
                        v-model="scope.row.xInitial"
                        :controls="false"
                        :min="0"
                        @change="resetTableData"
                    ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column prop="lInitial" label="长度(m)" align="center">
                <template slot-scope="scope">
                    <el-input-number
                        v-model="scope.row.lInitial"
                        :controls="false"
                        :min="0"
                        @change="resetTableData"
                    ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column prop="gradient" label="坡度(ppt)" align="center">
                <template slot-scope="scope">
                    <el-input-number v-model="scope.row.gradient" :controls="false" :min="0"></el-input-number>
                </template>
            </el-table-column>
            <el-table-column prop="radius" label="过渡曲线半径(m)" align="center">
                <template slot-scope="scope">
                    <el-input-number v-model="scope.row.radius" :controls="false" :min="0"></el-input-number>
                </template>
            </el-table-column>
            <!-- <el-table-column label="坡道设置" align="center">
                <template slot-scope="scope">
                    <Ramp :dataSource="scope.row" />
                </template>
            </el-table-column>-->
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <span
                        class="cursor-p hover-heighlight"
                        :class="[$style.insert,$style.editBtn]"
                        @click="tableAdd(scope.$index)"
                    >插入</span>
                    <span
                        class="cursor-p hover-heighlight"
                        :class="[$style.del,$style.editBtn]"
                        @click="deleteRow(scope.$index,scope.row)"
                    >删除</span>
                </template>
            </el-table-column>
        </el-table>
        <Ramp :visible="rampVisible" @saveData="saveRampData" />
    </div>
</template>

<script>
import { mapState } from "vuex";
// import { MODEL_TREE_TYPE } from "common/constants";

import { circuit } from "api";

import Ramp from "./Ramp";

export default {
    name: "Circuit",
    components: {
        Ramp
    },
    data() {
        return {
            tableData: [],
            rampVisible: false,
            insertIdx: 0 // 插入数据的位置，默认第一行
        };
    },
    props: {},
    computed: {
        ...mapState("models", ["curModelId"])
    },
    methods: {
        resetTableData() {
            let { tableData } = this;
            // console.log(JSON.parse(JSON.stringify(tableData)));
            // if (tableData.length === 1) {
            //     tableData[0]["xInitial"] = 0;
            // } else if (tableData.length > 1) {
            //     for (let i = tableData.length - 1; i > 0; i--) {
            //         let cur = tableData[i];
            //         let pro = tableData[i - 1];
            //         pro.xInitial = cur.xInitial + cur.lInitial;
            //     }
            // }

            let len = tableData.length - 1;
            for (let i = len; i >= 0; i--) {
                let cur = tableData[i];

                if (i === len) {
                    cur.xInitial = 0;
                } else {
                    let next = tableData[i + 1];
                    // pro.xInitial = cur.xInitial + cur.lInitial;
                    cur.xInitial = next.xInitial + next.lInitial;
                }
            }
            this.tableData = tableData;
        },

        // 插入一行数据，默认在第一行插入
        insertRow(row = []) {
            let idx = this.insertIdx || 0;
            this.tableData.splice(idx, 0, ...row);
            this.resetTableData();
        },

        // 删除一行数据
        deleteRow(idx, row) {
            circuit.delCircleRow({ id: row.id }).then(res => {
                if (!res) return;
                this.initData();
            });
            // this.tableData.splice(idx, 1);
            // this.resetTableData();
        },

        // 表头添加按钮，默认添加一条数据到第一行
        tableAdd(idx = 0) {
            this.rampVisible = true;
            this.insertIdx = idx;
            // if (this.tableData.length === 0) {
            //     this.tableData.unshift({ xInitial: 0, lInitial: 100 });
            //     return;
            // }
            // let last = this.tableData[0];

            // this.tableData.unshift({
            //     xInitial: last.lInitial + last.xInitial,
            //     lInitial: 100
            // });
        },

        // 表头删除按钮，默认删除第一条数据
        tableDel() {
            if (this.tableData.length === 0) {
                return;
            }
            this.tableData.shift();
        },

        saveRampData(data) {
            this.insertRow(data);
            this.$message.success("操作成功");
            this.rampVisible = false;
        },

        initData() {
            circuit.getCircleData({ modelId: this.curModelId }).then(res => {
                if (!res) return;
                let data = res.data || [];
                data.sort((a, b) => b.xInitial - a.xInitial);
                this.tableData = res.data || [];
            });
        },

        // 保存数据
        saveData() {
            circuit
                .saveCircleData({ lpArr: this.tableData || [] })
                .then(res => {
                    if (!res) return;
                    this.initData();
                });
        }
    },
    mounted() {
        this.initData();
    }
};
</script>


<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
    .btnGroup {
        margin-bottom: 10px;

        .btn {
            // background-color: transparent !important;
            // color: #4baed0 !important;
            // border: 1px solid rgba(75, 174, 208, 0.5);
            margin-right: 5px;
            cursor: pointer;
        }
    }
    .icon {
        margin-right: 10px;
    }

    .editBtn {
        padding: 5px 10px;
    }
}
</style>


