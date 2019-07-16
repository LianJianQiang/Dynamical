<template>
    <DropDown :save="save" :size="size" :placeholder="placeholder">
        <div class="dropPanel">
            <el-form ref="form" label-position="left" :model="formData" label-width="80px">
                <el-form-item label="选择型号">
                    <el-select v-model="formData.selected" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.id" :value="item.label">
                            <!-- <div @contextmenu.prevent="$refs.ctxMenu.open(item)">{{item.label}}</div> -->
                            <div>{{item.label}}</div>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!-- <context-menu id="context-menu" ref="ctxMenu">
                <li @click="doSomething">删除</li>
            </context-menu>-->
        </div>
    </DropDown>
</template>

<script>
// import contextMenu from "vue-context-menu";

import mixin from "./mixin/mixin";
import mixinData from "./mixin/mixinData";

const options = [
    { id: "1", label: "型号1" },
    { id: "2", label: "型号2" },
    { id: "3", label: "型号3" }
];

export default {
    name: "FoldedCollapse",
    mixins: [mixin, mixinData],
    components: {
        // contextMenu
    },
    data() {
        return {
            options
        };
    },
    methods: {
        doSomething(...rest) {
            console.log(rest);
        }
    }
};
</script>


