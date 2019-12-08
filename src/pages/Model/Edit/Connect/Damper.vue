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
            <div class="listWrap">
                <span :class="$style.numLabel">数量</span>
                <el-input-number :class="$style.inpNum" :controls="false" v-model="jzqNum" :min="0"></el-input-number>
            </div>
            <div :class="$style.tableWrap">
                <h4>特征曲线</h4>
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
import EditTable from "components/EditTable";

import { model } from "api";
import { getObjFromStr } from "utils/util";

import mixin from "./mixin/mixin";
import mixinSaveFunc from "./mixin/mixinSaveFunc";

export default {
    name: "Damper",
    mixins: [mixin, mixinSaveFunc],

    data() {
        return {
            jzqNum: null,
            tcsdData: {}
        };
    },
    components: {
        EditTable
    },
    props: {
        type: {
            required: true
        }
    },

    watch: {
        dataSource(val, oldVal) {
            const { jzqNum, tcsdId } = val;
            this.jzqNum = jzqNum;
            this.cacheJzqNum = jzqNum;
            if (val.tcsdId && val.tcsdId !== oldVal.tcsdId) {
                this.getTcsdDataById(val.tcsdId);
            }
        }
    },

    methods: {
        getTcsdDataById(id) {
            model.tractionLiView({ id }).then(res => {
                let data = res.data || {};
                if (data.tcsdData) {
                    data = { ...data, tcsdData: getObjFromStr(data.tcsdData) };
                }
                this.tcsdData = data;
            });
        },

        resetData() {
            const { jzqNum, tcsdId } = this.dataSource;
            this.jzqNum = jzqNum;
            this.cacheJzqNum = jzqNum;

            if (tcsdId) {
                this.getTcsdDataById(tcsdId);
            } else {
                this.tcsdData = { tcsdData: [] };
            }
        },

        // 保存数据
        onSaveData() {
            let datas = {
                jzqNum: this.jzqNum,
                jzqTcsdId: this.curveId
            };

            this.isHaveData = false;
            for (let i in datas) {
                if (datas[i]) {
                    this.isHaveData = true;
                    break;
                }
            }

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

    .inpNum {
        width: 200px;
    }

    .numLabel {
        display: inline-block;
        width: 40px;
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
