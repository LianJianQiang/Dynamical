<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown :save="save" :size="size" :placeholder="placeholder">
        <div :class="$style.root" class="dropPanel">
            <div class="clearfix">
                <span class>数量</span>
                <el-input-number
                    :class="$style.inpNum"
                    class="flr"
                    :controls="false"
                    v-model="jzqNum"
                    :min="0"
                ></el-input-number>
            </div>
            <div :class="$style.tableWrap">
                <h4>特征曲线</h4>
                <EditTable ref="editTable" :type="type" :onSaveCb="onSaveCb" :tableDataChange="tableDataChange"/>
            </div>
        </div>
    </DropDown>
</template>

<script>
import EditTable from "components/EditTable";

import mixin from "./mixin/mixin";
import mixinSaveFunc from "./mixin/mixinSaveFunc";

export default {
    name: "Damper",
    mixins: [mixin, mixinSaveFunc],

    data() {
        return {
            jzqNum: null,
            tableData: []
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

    methods: {
        // 保存数据
        onSaveData() {
            let data = {
                jzqNum: this.jzqNum,
                jzqTcsdId: this.curveId
            };

            if (!this.field) return;
            this.saveData({ data });
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
        width: 150px;
    }

    .tableWrap {
        margin-top: 14px;
        h4 {
            font-size: 12px;
        }
    }
}
</style>
