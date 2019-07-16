<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown :save="save" :size="size" :placeholder="placeholder">
        <div :class="$style.root" class="dropPanel">
            <div class="clearfix">
                <span class="">数量</span>
                <el-input-number :class="$style.inpNum" class="flr" :controls="false" v-model="number" :min="0"></el-input-number>
            </div>
            <div :class="$style.tableWrap">
                <h4>特征曲线</h4>
                <EditTable ref="editTable" />
            </div>
        </div>
    </DropDown>
</template>

<script>
import EditTable from "components/EditTable";

import mixin from "./mixin/mixin";

export default {
    name: "Damper",
    mixins: [mixin],

    data() {
        return {
            number: null,
            tableData: []
        };
    },
    components: {
        EditTable
    },

    methods: {
        // 保存数据
        save() {
            let tableData = this.$refs.editTable.save();
            let data = {
                num: this.num,
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

    .inpNum{
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
