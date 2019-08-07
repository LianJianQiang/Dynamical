<template>
    <div :class="$style.root">
        <div v-if="curModelId">
            <div
                :class="$style.close"
                class="cursor-p"
                @click="onClickClose"
                v-if="curTreeNodeType !== modelTreetype.args && curTreeNodeType !== modelTreetype.circuit"
            >
                <img :src="closeIcon" alt />
            </div>
            <BasicInfo v-if="curTreeNodeType === modelTreetype.basic" :key="curTreeNodeId" />
            <Vehicle v-if="curTreeNodeType === modelTreetype.vehicle" :key="curTreeNodeId" />
            <Connect v-if="curTreeNodeType === modelTreetype.connect" :key="curTreeNodeId" />
            <Circuit v-if="curTreeNodeType === modelTreetype.circuit" :key="curTreeNodeId" />
            <Args v-if="curTreeNodeType === modelTreetype.args" :key="curTreeNodeId" />
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
            this.$router.push("/page/model/open");
        }
    },
    computed: {
        ...mapGetters("models", ["curTreeNodeInfo"]),
        ...mapState("models", ["curModelId", "curTreeNodeId"]),

        curTreeNodeType() {
            return this.curTreeNodeInfo.type;
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

