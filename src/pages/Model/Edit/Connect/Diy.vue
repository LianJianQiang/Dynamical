<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown
        :save="save"
        :placeholder="placeholder"
        :title="$attrs.title"
        :isHaveData="isHaveData"
    >
        <div :class="$style.root">
            <div :class="$style.axis" class="listWrap">
                <div>
                    <label>横坐标</label>
                    <el-select v-model="x" placeholder="请选择">
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
                    :type="type"
                    :onSaveCb="onSaveCb"
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
            x: "",
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
        dataSource() {
            const { x, tcsdId } = this.dataSource;
            if (x || tcsdId) this.isHaveData = true;

            this.x = x;
            if (tcsdId) {
                this.getTcsdDataById(tcsdId);
            }
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

            this.isHaveData = true;
            this.saveData({ datas });
        },

        getTcsdDataById(id) {
            model.tractionLiView({ id }).then(res => {
                let data = res.data || {};
                if (data.tcsdData) {
                    data = { ...data, tcsdData: getObjFromStr(data.tcsdData) };
                }
                this.tcsdData = data;
            });
        },

        // 保存数据
        save() {
            const xTypeChange = this.x !== this.tcsdData.xType;
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
