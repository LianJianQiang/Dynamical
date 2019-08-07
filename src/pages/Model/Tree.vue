<template>
    <div :class="$style.root">
        <div :class="$style.title">模型树</div>
        <div :class="$style.treeWrap">
            <div :class="$style.noData" v-if="modelsTree.length === 0">暂无数据</div>
            <el-tree
                v-else
                :data="modelsTree"
                node-key="id"
                :current-node-key="curTreeNodeId"
                default-expand-all
                @node-click="nodeClick"
                :props="{label:'name'}"
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
import { mapState, mapGetters, mapActions } from "vuex";
import Icon from "assets/icon";
import { MODEL_TYPE_LINK_LIST } from "common/constants";

export default {
    data() {
        return {
            fileIcon: Icon["file"]
        };
    },
    computed: {
        ...mapState("models", ["modelsTree", "curTreeNodeId"])
        // ...mapGetters("models", ["getCarData"]),
    },
    methods: {
        ...mapActions("models", ["setCurTreeNodeId"]),
        nodeClick(nodeData) {
            let { type, id } = nodeData;

            if (MODEL_TYPE_LINK_LIST.indexOf(type) === -1) return;
            this.$router.push({
                path: "/page/model/edit",
                query: { type, id }
            });

            this.setCurTreeNodeId(id);

            // const carDetail = this.getCarData({ modelName, row, col });
            // this.$store.dispatch("uiState/saveCurCarDetail", carDetail);
        },
        getQueryId() {
            let { id = "" } = this.$route.query || {};
            return id;
        }
    },
    mounted() {
        this.setCurTreeNodeId(this.getQueryId());
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
