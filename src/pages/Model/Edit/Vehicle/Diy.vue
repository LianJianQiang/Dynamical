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
                <EditTable ref="editTable" />
            </div>
        </div>
    </DropDown>
</template>

<script>
import DropDown from "components/DropDown.vue";
import EditTable from "components/EditTable";

const options = [
    { label: "位移", value: "displace" },
    { label: "速度", value: "speed" },
    { label: "时间", value: "time" }
];

export default {
    name: "Diy",
    data() {
        return {
            options,
            x: ""
        };
    },
    components: {
        DropDown,
        EditTable
    },
    props: {
        size: {
            type: String,
            default: ""
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
        // 保存数据
        save() {
            let tableData = this.$refs.editTable.save();
            let data = {
                x: this.x,
                tableData
            };

            if (!this.field) return;
            this.saveData({ data, field: this.field });
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
