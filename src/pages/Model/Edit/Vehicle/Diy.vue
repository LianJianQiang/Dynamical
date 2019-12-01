<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown
        :isHaveData="isHaveData"
        :save="save"
        :resetData="resetData"
        :size="size"
        :placeholder="placeholder"
        :title="$attrs.title || ''"
    >
        <div :class="$style.root">
            <div :class="$style.axis" class="listWrap">
                <div>
                    <label>横坐标</label>
                    <el-select v-model="xType" placeholder="请选择">
                        <el-option
                            v-for="item in xOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <div>
                    <label>纵坐标</label>力
                </div>
            </div>
            <div :class="$style.tableWrap" class="listWrap">
                <h4>曲线点设置</h4>
                <EditTable
                    ref="editTable"
                    :type="type"
                    :dataSource="tcsdData.tcsdData"
                    :onSaveCb="onSaveCb"
                    :tableDataChange="tableDataChange"
                    :getParentData="sendDataToEditTableSave()"
                    :tcsdData="tcsdData"
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
import { model } from "api";

import editTableMixin from "common/editTableMixin";

export default {
    name: "Diy",
    mixins: [editTableMixin],
    data() {
        // let { xType = "", tcsdData = [] } = this;

        // 后端返回的tcsdData为字符串格式；需要进行eval处理；
        // tcsdData.length > 0 && (tcsdData = getObjFromStr(tcsdData));

        return {
            xOptions: DIY_XAXIS_OPTIONS,
            xType: "",
            // formData: [],
            tcsdData: {},
            isHaveData: false
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
            this.getTcsdDataById(this.dataSource.tcsdId);
        }
    },

    methods: {
        getTcsdDataById(id) {
            if (!id) return;
            model.tractionLiView({ id }).then(res => {
                let data = res.data || {};

                if (data && JSON.stringify(data) !== "{}") {
                    this.isHaveData = true;
                }

                if (data.tcsdData) {
                    data = { ...data, tcsdData: getObjFromStr(data.tcsdData) };
                }
                this.tcsdData = data;
                this.xType = data.xType;
                this.cacheTcsdData = { ...data };
            });
        },

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
            this.tcsdData = { ...this.tcsdData, xType: this.xType };
        },

        resetData() {
            this.tcsdData = { ...this.cacheTcsdData };
        },

        // 保存数据
        save() {
            const xTypeChange = this.xType !== this.tcsdData.xType;
            const haveData = this.tableData || this.tcsdData.tcsdData;

            return new Promise((resolve, reject) => {
                // 调用editTable组件自动保存，生成tcsdID，并通过onSaveCb回调返回
                if (xTypeChange && !haveData) {
                    this.$message({
                        message: "请将数据填写完整"
                    });
                    resolve(false);
                } else if ((!this.curveId && this.tableData) || xTypeChange) {
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
                tcsdId: this.curveId || this.tcsdData.id
            };

            if (!this.field) return;
            this.isHaveData = true;
            this.saveData({ data, field: this.field });
        }
    },
    mounted() {
        this.cacheTcsdData = {};
        this.getTcsdDataById(this.dataSource.tcsdId);
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
    font-size: 12px;

    .axis {
        & > div:not(:last-child) {
            margin-bottom: 10px;
        }
        label {
            margin-right: 20px;
        }
    }

    .tableWrap {
        margin-top: 14px;
        h4 {
            font-size: 14px;
            margin-bottom: 10px;
        }
    }
}
</style>
