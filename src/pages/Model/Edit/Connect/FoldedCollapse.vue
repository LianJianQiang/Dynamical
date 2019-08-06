<template>
    <DropDown :save="save" :size="size" :placeholder="placeholder">
        <div class="dropPanel clearfix" :class="$style.root">
            <el-row :class="$style.row">
                <label for>选择型号</label>
                <el-select
                    :class="$style.sel"
                    class="flr"
                    v-model="formData.ykgTempId"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :value="item.id"
                        :label="item.name"
                    ></el-option>
                </el-select>
            </el-row>
        </div>
    </DropDown>
</template>

<script>
import { argConfig } from "api";
import mixin from "./mixin/mixin";
import mixinData from "./mixin/mixinData";

import { getUserIdAndType } from "utils/util";

const { userId, userType } = getUserIdAndType();

export default {
    name: "FoldedCollapse",
    mixins: [mixin, mixinData],
    components: {},
    data() {
        return {
            options: []
        };
    },
    methods: {
        getYKGTempList() {
            argConfig.getYKGTempList({ userId, type: userType }).then(res => {
                if (!res) return;
                this.options = res.data;
            });
        }
    },
    mounted() {
        this.getYKGTempList();
    }
};
</script>

<style module lang="scss">
.root {
    .row {
        margin-bottom: 10px;
    }
    .sel {
        width: 100px;
    }
}
</style>



