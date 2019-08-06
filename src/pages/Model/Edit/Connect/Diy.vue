<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown :save="save" :size="size" :placeholder="placeholder">
        <div :class="$style.root">
            <div>
                <span>
                    横坐标
                    <el-select v-model="x" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </span>
                <span>纵坐标：力</span>
            </div>
            <div :class="$style.tableWrap">
                <h4>曲线点设置</h4>
                <EditTable
                    ref="editTable"
                    :type="type"
                    :defaultCurveId="curveId"
                    :dataSource="tableData || []"
                    :onSaveCb="onSaveCb"
                />
            </div>
        </div>
    </DropDown>
</template>

<script>
import DropDown from "components/DropDown.vue";
import EditTable from "components/EditTable";
import NameDialog from "components/NameDialog";

import { model } from "api";
import { getUserIdAndType } from "utils/util";

const options = [
    { label: "位移", value: "displace" },
    { label: "速度", value: "speed" },
    { label: "时间", value: "time" }
];

const { userId, userType } = getUserIdAndType();

export default {
    name: "Diy",
    data() {
        return {
            tableData: [],
            options,
            x: "",

            curveId: ""
        };
    },
    components: {
        DropDown,
        EditTable,
        NameDialog
    },
    props: {
        size: {
            type: String,
            default: ""
        },
        type: {
            type: Number,
            required: true
        },
        field: {
            type: String,
            required: true
        },
        saveData: {
            type: Function,
            default: () => {}
        },
        placeholder: {
            type: String,
            default: "参数设置"
        }
    },
    methods: {
        // 点击 table的保存，提示输入名称
        onSaveCb(id) {
            this.curveId = id;
        },

        // 保存数据
        save() {
            let tableData = this.$refs.editTable.save();
            let field = this.field;
            let datas = {
                [`${field}X`]: this.x,
                [`${field}TcsdId`]: this.curveId
            };

            if (!this.field) return;
            this.saveData({ datas});
        }
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
    font-size: 12px;

    .tableWrap {
        margin-top: 14px;
        h4 {
            font-size: 12px;
        }
    }

    :global {
        .el-select {
            width: 90px;
            margin-right: 10px;
        }
        .el-input__inner,
        .el-input__icon {
            height: 20px;
            line-height: 20px;
            font-size: 12px;
        }
    }
}
</style>
