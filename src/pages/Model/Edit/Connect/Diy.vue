<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown
        :save="save"
        :placeholder="placeholder"
        :title="$attrs.title"
        :isHaveData="isHaveData"
        :resetData="resetData"
    >
        <div :class="$style.root">
            <div :class="$style.axis" class="listWrap">
                <div>
                    <label>横坐标</label>
                    <el-select v-model="xType" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
                <div>
                    <label>纵坐标</label>力
                </div>
            </div>
            <div :class="$style.tableWrap">
                <h4>曲线点设置</h4>
                <EditTable
                    ref="editTable"
                    :parentParams="{xType: xType}"
                    :type="type"
                    :onSaveCb="onSaveCb"
                    :onOpenCurveCb="onOpenCurveCb"
                    :tcsdData="tcsdData"
                    :dataSource="tcsdData.tcsdData"
                    :tableDataChange="tableDataChange"
                />
            </div>
        </div>
    </DropDown>
</template>

<script>
import DropDown from "components/DropDown.vue";
import EditTable from "components/EditTable";

import { model } from "api";
import { getObjFromStr } from "utils/util";

import mixinSaveFunc from "./mixin/mixinSaveFunc";

const options = [
    { label: "位移", value: "1" },
    { label: "速度", value: "2" },
    { label: "时间", value: "3" }
];

export default {
    name: "Diy",
    mixins: [mixinSaveFunc],
    data() {
        return {
            options,
            xType: "",
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
        },
        dataSource: {
            type: Object,
            default: () => ({})
        }
    },
    watch: {
        // dataSource(val, oldVal) {
        //     const { xType, tcsdId, tcsdData } = val;
        //     const haveTcsd = tcsdId && tcsdId !== "0";

        //     if (xType || haveTcsd) this.isHaveData = true;

        //     this.xType = xType;
        //     this.tcsdData = { ...tcsdData };

        //     if (haveTcsd && val.tcsdId !== oldVal.tcsdId) {
        //         this.getTcsdDataById(val.tcsdId);
        //     }
        // },

        "dataSource.xType"(val) {
            if (val) this.isHaveData = true;
            this.xType = val;
        },
        "dataSource.tcsdId"(tcsdId, oldId) {
            const haveTcsd = tcsdId && tcsdId !== "0";

            if (haveTcsd) this.isHaveData = true;

            if (haveTcsd && tcsdId !== oldId) {
                this.getTcsdDataById(tcsdId);
            }
        },
        "dataSource.tcsdData"(tcsdData) {
            this.tcsdData = { ...tcsdData };
        },
        xType(val) {
            if (val !== this.cacheXType) {
                this.isSaved = false;
            }
        }
    },
    methods: {
        getTcsdDataById(id) {
            if (!id) return;
            model.tractionLiView({ id }).then(res => {
                let data = res.data || {};
                if (data.tcsdData) {
                    data = { ...data, tcsdData: getObjFromStr(data.tcsdData) };
                }

                const xType = data.xType || data.xtype || "";
                this.xType = xType;
                this.cacheXType = xType;
                this.tcsdData = { ...data, xType };
            });
        },

        resetData() {
            const { xType, tcsdId } = this.dataSource;
            const haveTcsd = tcsdId && tcsdId !== "0";

            if (xType || haveTcsd) this.isHaveData = true;

            this.xType = xType || "";
            this.cacheXType = xType || "";

            if (haveTcsd) {
                this.getTcsdDataById(tcsdId);
            } else {
                this.tcsdData = { xType, tcsdId, tcsdData: [] };
            }
        },

        onOpenCurveCb(data) {
            const xType = data.xType || data.xtype || "";
            this.xType = xType;
            this.cacheXType = xType;
            this.openCurveDataCache = { ...data };
        },

        onSaveData() {
            let field = this.field;
            if (!field) return;

            const openCurveDataCache = this.openCurveDataCache || {};

            let datas = {
                xType: this.xType,
                tcsdId: this.curveId,
                tcsdData: {
                    ...this.tcsdData,
                    ...openCurveDataCache
                }
                // [`${field}X`]: this.xType,
                // [`${field}TcsdId`]: this.curveId,
                // [`${field}TcsdData`]: this.tcsdData
            };

            if (this.tableData) {
                datas.tcsdData.tcsdData = this.tableData;
            }

            this.isHaveData = true;
            this.saveData({ datas });
        },

        // 保存数据
        save() {
            // const xTypeChange = this.xType !== this.tcsdData.xType;
            const haveData = this.tableData || this.tcsdData.tcsdData;

            return new Promise((resolve, reject) => {
                if (!this.xType) {
                    this.$message.error("请先选择横坐标");
                    resolve(false);
                } else if (!haveData && !this.curveId) {
                    this.$message({
                        message: "请将数据填写完整"
                    });
                    resolve(false);
                } else if (!this.isSaved) {
                    this.$message({
                        message: "请先点击保存，保存数据"
                    });
                    resolve(false);
                } else {
                    this.onSaveData();
                    resolve(true);
                }
            });
        }
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
