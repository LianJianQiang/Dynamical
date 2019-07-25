<template>
    <div :class="$style.root">
        <div :class="$style.title">模型树</div>
        <div :class="$style.treeWrap">
            <div :class="$style.noData" v-if="modelsTree.length === 0">暂无数据</div>
            <el-tree
                v-else
                :data="modelsTree"
                node-key="id"
                :current-node-key="getQueryId"
                default-expand-all
                @node-click="nodeClick"
            >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <img v-if="data.children" :src="fileIcon" alt />
                    <span>{{ node.label }}</span>
                </span>
            </el-tree>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Icon from "assets/icon";

export default {
    data() {
        return {
            fileIcon: Icon["file"]
        };
    },
    computed: {
        ...mapState("models", ["modelsTree"]),
        ...mapGetters("models", ["getCarData"]),

        getQueryId() {
            let { id = "" } = this.$route.query || {};
            return id;
        }
    },
    methods: {
        nodeClick(nodeData) {
            let { type, modelName, id, col, row } = nodeData;
            if (nodeData.children) return;
            if (type && modelName) {
                this.$router.push({
                    path: "/model/edit",
                    query: { type, name: modelName, id }
                });

                const carDetail = this.getCarData({ modelName, row, col });
                this.$store.dispatch("uiState/saveCurCarDetail", carDetail);
            }
        }
    }
};
</script>

<style module lang="scss">
.root {
    padding: 16px 0 0 22px;

    .noData {
        text-align: center;
        line-height: 200px;
        color: #999;
        margin-left: -16px;
    }
    .title {
        font-size: 16px;
    }
    .treeWrap {
        padding-left: 16px;
    }
    :global {
        .custom-tree-node {
            img {
                width: 12px;
                height: 10px;
                margin-right: 4px;
            }
            span {
                font-size: 12px;
            }
        }
        .el-tree-node,
        .el-tree-node > .el-tree-node__content {
            background-color: transparent;
        }
        .el-tree-node.is-current > .el-tree-node__content {
            color: $highlight-color_1;
        }
    }
}
</style>
