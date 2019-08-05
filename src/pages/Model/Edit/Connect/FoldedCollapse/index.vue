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
                    <el-option v-for="item in options" :key="item.id" :value="item.label">
                        <!-- <div @contextmenu.prevent="$refs.ctxMenu.open(item)">{{item.label}}</div> -->
                        <div>{{item.label}}</div>
                    </el-option>
                </el-select>
            </el-row>
            <el-row>
                <el-checkbox v-model="isDiy">自定义设置</el-checkbox>
                <Diy field="diyData" :saveData="saveDropDownData" :dataSource="diyData" />
            </el-row>

            <!-- <context-menu id="context-menu" ref="ctxMenu">
                <li @click="doSomething">删除</li>
            </context-menu>-->
        </div>
    </DropDown>
</template>

<script>
import Diy from "./diy";

import mixin from "../mixin/mixin";

const options = [
    { id: "1", label: "型号1" },
    { id: "2", label: "型号2" },
    { id: "3", label: "型号3" }
];

export default {
    name: "FoldedCollapse",
    mixins: [mixin],
    components: {
        Diy
    },
    data() {
        return {
            options,
            formData: { ...this.dataSource },
            isDiy: null,
            diyData: {}
        };
    },
    methods: {
        doSomething(...rest) {
            console.log(rest);
        },

        // 保存自定义数据
        saveDropDownData(params) {
            let { field, data } = params;
            this[field] = data;
        },

        // 保存数据
        save() {
            let data = { ...this.formData };

            if (this.isDiy) {
                data = { ...this.diyData };
            }

            if (!this.field) return;
            this.saveData({ data, field: this.field });
        }
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



