<template>
    <div :class="$style.root">
        <div v-if="curModelData.length>0">
            <div :class="$style.close" class="cursor-p" @click="onClickClose">
                <img :src="closeIcon" alt />
            </div>
            <BasicInfo
                v-if="curTreeNodeType === modelTreetype.basic"
                :dataSource="dataSource"
                :key="curTreeNodeId"
            />
            <Vehicle
                v-if="curTreeNodeType === modelTreetype.vehicle"
                :dataSource="dataSource"
                :key="curTreeNodeId"
            />
            <Connect
                v-if="curTreeNodeType === modelTreetype.connect"
                :dataSource="dataSource"
                :key="curTreeNodeId"
            />
            <Circuit
                v-if="curTreeNodeType === modelTreetype.circuit"
                :dataSource="dataSource"
                :key="curTreeNodeId"
            />
            <Args
                v-if="curTreeNodeType === modelTreetype.args"
                :dataSource="dataSource"
                :key="curTreeNodeId"
            />
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import { MODEL_TREE_TYPE } from "common/constants";
import Img from "assets/icon";

import BasicInfo from "./Basic";
import Vehicle from "./Vehicle";
import Connect from "./Connect";
import Circuit from "./Circuit";
import Args from "./Args";

export default {
    name: "Home",
    components: {
        BasicInfo,
        Vehicle,
        Connect,
        Circuit,
        Args
    },
    data() {
        return {
            modelTreetype: MODEL_TREE_TYPE,
            closeIcon: Img["close"]
        };
    },
    props: {},
    methods: {
        onClickClose() {
            this.$router.push("/model/open");
        }
    },
    computed: {
        ...mapState("models", ["modelsData", "modelTree"]),
        ...mapGetters("models", ["getModelTree", "getTreeNode"]),

        curModelName() {
            return this.$route.query.name;
        },
        curTreeNodeType() {
            return this.$route.query.type;
        },
        curTreeNodeId() {
            return this.$route.query.id;
        },
        curModelData() {
            return this.getModelTree({ name: this.curModelName });
        },
        curModelTreeInfo() {
            return this.getTreeNode({ id: this.curTreeNodeId });
        },
        dataSource() {
            let modelsData = this.modelsData[this.curTreeNodeId];
            let treeNode = this.curModelTreeInfo || {};
            if (modelsData) {
                return {
                    ...modelsData,
                    treeNode
                };
            }

            return {
                modelName: this.curModelName,
                id: this.curTreeNodeId,
                treeNode
            };
        }
    },
    mounted() {}
};
</script>

<style module lang="scss">
.root {
    position: relative;
    .close {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 20px;
        right: 20px;
    }
}
</style>

