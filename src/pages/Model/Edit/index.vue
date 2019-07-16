<template>
    <div>
        <div v-if="curModelData.length>0">
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
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import { MODEL_TREE_TYPE } from "common/constants";

import BasicInfo from "./Basic";
import Vehicle from "./Vehicle";
import Connect from "./Connect";
import Circuit from "./Circuit";

export default {
    name: "Home",
    components: {
        BasicInfo,
        Vehicle,
        Connect,
        Circuit
    },
    data() {
        return {
            modelTreetype: MODEL_TREE_TYPE
        };
    },
    props: {},
    methods: {
        onChange(value) {}
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
    mounted() {
    }
};
</script>
