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
                <span
                    class="custom-tree-node"
                    slot-scope="{ node, data }"
                    :class="{ active: curTreeNodeId === node.data.id }"
                >
                    <img v-if="data.children" :src="fileIcon" alt />
                    <span>{{ node.label }}</span>
                </span>
            </el-tree>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Icon from "assets/icon";
import {
    MODEL_TYPE_LINK_LIST,
    GLOBAL_MSG_CENTER_TOKEN
} from "common/constants";
import msgCenter from "utils/msgCenter";

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
            if (id === this.curTreeNodeId) return;

            if (MODEL_TYPE_LINK_LIST.indexOf(type) === -1) return;
            // this.setCurTreeNodeId(id);

            msgCenter.publish(GLOBAL_MSG_CENTER_TOKEN.page_jump, {
                success: () => {
                    this.setCurTreeNodeId(id);
                    this.$router.push({
                        path: "/page/model/edit",
                        query: { type, id }
                    });
                },
                error: () => {
                    // this.$message("数据保存失败");
                }
            });

            // this.$confirm("页面即将跳转，请检查是否已经保存数据！", "", {
            //     confirmButtonText: "是",
            //     cancelButtonText: "否",
            //     type: "warning"
            // })
            //     .then((...opt) => {})
            //     .catch((...opt) => {
            //         this.setCurTreeNodeId(this.curTreeNodeId);
            //     });
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

            &.active {
                color: $highlight-color_1;
            }
        }
        .el-tree-node,
        .el-tree-node > .el-tree-node__content {
            background-color: transparent;
        }
        // .el-tree-node.is-current > .el-tree-node__content {
        // color: $highlight-color_1;
        // }
    }
}
</style>
