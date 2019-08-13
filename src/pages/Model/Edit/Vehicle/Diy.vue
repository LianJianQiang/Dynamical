<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown :save="save" :size="size" :placeholder="placeholder">
        <div :class="$style.root">
            <div>
                <span>
                    横坐标
                    <el-select v-model="xType" placeholder="请选择">
                        <el-option
                            v-for="item in xOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
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
                    :dataSource="formData"
                    :onSaveCb="onSaveCb"
                    :tableDataChange="tableDataChange"
                    :getParentData="sendDataToEditTableSave()"
                    :tcsdData="dataSource"
                />
            </div>
        </div>
    </DropDown>
</template>

<script>
import DropDown from "components/DropDown.vue";
import EditTable from "components/EditTable";

import { DIY_XAXIS_OPTIONS } from "common/constants";
import { getObjFromStr } from "utils/util";

import editTableMixin from "common/editTableMixin";

export default {
    name: "Diy",
    mixins: [editTableMixin],
    data() {
        let { xType = "", tcsdData = [] } = this;

        // 后端返回的tcsdData为字符串格式；需要进行eval处理；
        tcsdData.length > 0 && (tcsdData = getObjFromStr(tcsdData));

        return {
            xOptions: DIY_XAXIS_OPTIONS,
            xType,
            formData: tcsdData
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
        },
        dataSource: {
            type: Object,
            default: () => ({})
        },
        type: {
            required: true
        }
    },
    watch: {
        dataSource() {
            let { dataSource } = this;
            let { xType = "", tcsdData = [] } = dataSource;

            // 后端返回的tcsdData为字符串格式；需要进行eval处理；
            tcsdData.length > 0 && (tcsdData = getObjFromStr(tcsdData));
            this.xType = xType;
            this.formData = tcsdData;
        },
        xType() {
            this.isXTypeChange = true;
        }
    },
    methods: {
        // editTable组件保存数据时调用，将xType传给editTable
        sendDataToEditTableSave() {
            return () => ({
                xType: this.xType
            });
        },

        // 获取editTable生成的tcsdID
        onSaveCb(id) {
            // id 存在，表示对已打开对数据进行编辑，否则，为新增
            this.curveId = id;
            this.isXTypeChange = false;
        },

        // 保存数据
        save() {
            return new Promise((resolve, reject) => {
                // 调用editTable组件自动保存，生成tcsdID，并通过onSaveCb回调返回
                if ((!this.curveId && this.tableData) || this.isXTypeChange) {
                    this.$message({
                        message: "请先点击保存，保存数据"
                    });
                    resolve(false);
                } else {
                    this.onSaveData();
                    resolve(true);
                }
            });
        },

        // 保存数据
        onSaveData() {
            let data = {
                tcsdId: this.curveId
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
