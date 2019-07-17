<template>
    <div :class="$style.root">
        <div :class="$style.left">
            <div class="leftCont">
                <Tree />
            </div>
        </div>
        <div :class="$style.right" ref="rightWrap">
            <div :class="$style.btnWrap">
                <el-button class="btn-xl" @click="openModel">打开模型</el-button>
                <el-button class="btn-xl" @click="newModel">新建模型</el-button>
            </div>
            <div class="rightCont">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { MODEL_TREE_TYPE, getTreeNodeByType } from "common/constants";

import _util from "utils/util";

import Tree from "./Tree";

export default {
    name: "Model",
    data() {
        return {};
    },
    components: {
        Tree
    },
    props: {},
    computed: {
        ...mapGetters("models", ["isRepeat", "getModelTree"]),
        curTreeNodeId() {
            return this.$route.query.id;
        }
    },
    watch: {
        curTreeNodeId() {
            this.$refs.rightWrap.scrollTop = 0;
        }
    },
    methods: {
        ...mapActions("models", ["createModel"]),

        // 打开模型
        openModel() {
            this.$router.push("/model/open");
        },

        // 新建模型
        newModel() {
            this.setModelName({
                success: name => {
                    // this.$router.push("/model/edit");
                    this.createModel(name);
                    this.createSuccessCb(name);
                }
            });
        },

        /**
         * 设置模型名称
         */
        setModelName: function({ success }) {
            this.$prompt("请输入模型名称", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputValidator: this.validatorModelname
            })
                .then(({ value }) => {
                    typeof success === "function" && success(value);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        /**
         * 校验模型名称
         */
        validatorModelname: function(value) {
            if (!_util.isNumZhEn(value)) {
                return "名称为只能包含汉字、数字、字母";
            }

            if (this.isRepeat({ name: value })) return "模型名称重复";

            return true;
        },

        createSuccessCb(name) {
            let newModelTree = this.getModelTree({ name })[0];

            let arr =
                getTreeNodeByType(newModelTree, MODEL_TREE_TYPE.basic) || [];
            let newBasic = arr[0] || {};

            let { id, modelName, type } = newBasic;
            this.$router.push({
                path: "/model/edit",
                query: { type, name: modelName, id }
            });
        }
    }
};
</script>

<style module lang="scss">
$left-width: 222px;
.root {
    width: 100%;
    height: 100%;
    position: relative;
    .left {
        vertical-align: top;
        width: $left-width;
        height: 100%;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
        background-color: #fff;
        :global {
            .leftCont {
                width: 100%;
                height: 100%;
                overflow: auto;
                padding-bottom: 20px;
            }
        }
    }
    .right {
        height: 100%;
        padding: 20px $wrap-pad 20px 20px;
        overflow: auto;
        position: absolute;
        top: 0;
        left: $left-width;
        right: 0;
        bottom: 0;
        .btnWrap {
            margin-bottom: 20px;
        }
    }
}
</style>
