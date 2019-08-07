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
                <EditTable ref="editTable" :type="type" :onSaveCb="onSaveCb" />
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

import mixinSaveFunc from "./mixin/mixinSaveFunc";

const options = [
    { label: "位移", value: "displace" },
    { label: "速度", value: "speed" },
    { label: "时间", value: "time" }
];

const { userId, userType } = getUserIdAndType();

export default {
    name: "Diy",
    mixins: [mixinSaveFunc],
    data() {
        return {
            options,
            x: ""
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
        onSaveData() {
            let field = this.field;
            if (!field) return;

            let datas = {
                [`${field}X`]: this.x,
                [`${field}TcsdId`]: this.curveId
            };

            this.saveData({ datas });
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
