<template>
    <div :class="$style.root">
        <div :class="$style.btnGroup">
            <span class="btn-mini" :class="$style.btn" @click="tableAdd">+</span>
            <span class="btn-mini" :class="$style.btn" @click="tableDel">-</span>
        </div>
        <el-table :data="tableData" border max-height="500">
            <el-table-column prop="start" label="起始位置" align="center">
                <template slot-scope="scope">
                    <el-input-number
                        v-model="scope.row.start"
                        :controls="false"
                        :min="0"
                        @change="resetTableData"
                    ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column prop="len" label="长度(m)" align="center">
                <template slot-scope="scope">
                    <el-input-number
                        v-model="scope.row.len"
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
            <el-table-column label="坡道设置" align="center">
                <template slot-scope="scope">
                    <Ramp :dataSource="scope.row" />
                    <!-- <i class="el-icon-share cursor-p hover-heighlight" :class="$style.icon"></i> -->
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <span
                        class="cursor-p hover-heighlight"
                        :class="[$style.insert,$style.editBtn]"
                        @click="insertRow(scope.$index,scope.row)"
                    >插入</span>
                    <span
                        class="cursor-p hover-heighlight"
                        :class="[$style.del,$style.editBtn]"
                        @click="deleteRow(scope.$index,scope.row)"
                    >删除</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
// import { MODEL_TREE_TYPE } from "common/constants";

import Ramp from "./Ramp";

export default {
    name: "Circuit",
    components: {
        Ramp
    },
    data() {
        return {
            tableData: [{ start: 0, len: 100 }]
        };
    },
    props: {},
    methods: {
        resetTableData() {
            let { tableData } = this;
            for (let i = tableData.length - 1; i > 0; i--) {
                let cur = tableData[i];
                let pro = tableData[i - 1];
                pro.start = cur.start + cur.len;
            }
            this.tableData = tableData;
        },
        insertRow(idx, row) {
            this.tableData.splice(idx, 0, {
                start: row.start + row.len,
                len: 100
            });
            this.resetTableData();
        },
        deleteRow(idx) {
            this.tableData.splice(idx, 1);
            this.resetTableData();
        },

        // 表头添加按钮，默认添加一条数据到第一行
        tableAdd() {
            if (this.tableData.length === 0) {
                this.tableData.unshift({ start: 0, len: 100 });
                return;
            }
            let last = this.tableData[0];

            this.tableData.unshift({
                start: last.len + last.start,
                len: 100
            });
        },

        // 表头删除按钮，默认删除第一条数据
        tableDel() {
            if (this.tableData.length === 0) {
                return;
            }
            this.tableData.shift();
        }
    },
    computed: {},
    mounted() {}
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


