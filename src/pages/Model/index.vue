<template>
    <div :class="$style.root">
        <div :class="$style.left">
            <div class="leftCont">
                <Tree />
            </div>
        </div>
        <div :class="$style.right" ref="rightWrap">
            <div :class="$style.rightContWrap">
                <div :class="$style.btnWrap">
                    <el-button class="btn-xl" @click="getModelsList">打开模型</el-button>
                    <el-button class="btn-xl" @click="newModel">新建模型</el-button>
                </div>
                <div class="rightCont">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <el-dialog title="请选择要编辑的模型树" :visible.sync="dialogVisible" :append-to-body="true">
            <ul :class="$style.modelsContent" class="clearfix" v-if="modelsList.length > 0">
                <!-- <li
                    class="fll cursor-p"
                    v-for="item in modelsList"
                    :key="item.id"
                    @click="onSelectModel(item)"
                >{{item.name}}</li>-->

                <el-tag
                    class="cursor-p"
                    v-for="item in modelsList"
                    :key="item.id"
                    closable
                    @close="onCloseTag(item)"
                    @click="onSelectModel(item)"
                >{{item.name}}</el-tag>
            </ul>
            <dir v-else class="noData">暂无数据</dir>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { MODEL_TREE_TYPE } from "common/constants";

import { model } from "api";
import { getUserIdAndType, isNumZhEn } from "utils/util";

import Tree from "./Tree";

export default {
    name: "Model",
    data() {
        return {
            dialogVisible: false,
            modelsList: []
        };
    },
    components: {
        Tree
    },
    props: {},
    computed: {
        ...mapGetters("models", ["getTreeNodeByType"]),
        ...mapState("models", ["curModelId"]),

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
        ...mapActions("models", [
            "saveModelTreeData",
            "setCurModelId",
            "setCurTreeNodeId",
            "clearAllDataModels"
        ]),

        // 选择要打开的模型树
        onSelectModel(item) {
            this.getModelTreeData(item.id);
        },

        // 请求模型树列表
        getModelsList() {
            const { userId } = getUserIdAndType();

            model.getModels({ userId }).then(res => {
                if (!res) return;
                let { data = [] } = res;
                this.modelsList = data;
                this.dialogVisible = true;
            });
        },

        // 新建模型
        newModel() {
            this.setModelName({
                success: name => {
                    // this.createModel(name);
                    this.createSuccessCb(name);
                }
            });
        },

        /**
         * 设置模型名称
         */
        setModelName: function({ success }) {
            const { userId } = getUserIdAndType();

            this.$prompt("请输入模型名称", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputValidator: this.validatorModelname
            })
                .then(({ value }) => {
                    model.createModel({ userId, name: value }).then(res => {
                        if (!res) return;
                        this.getModelTreeData(res.data.id);
                        this.$message("创建成功");
                    });
                })
                .catch(e => {
                    console.log(e);
                });
        },

        /**
         * 校验模型名称
         */
        validatorModelname: function(value) {
            if (!value) return "请输入名称";
            if (!isNumZhEn(value)) {
                return "名称为只能包含汉字、数字、字母";
            }
            return true;
        },

        /**
         * 获取模型树的数据
         */
        getModelTreeData(id) {
            model.getModelTree({ id }).then(res => {
                if (!res) return;

                this.saveModelTreeData(res.data || []);
                this.setCurModelId(id);

                this.dialogVisible = false;

                this.createSuccessCb();
            });
        },

        // 创建或打开成功回调
        createSuccessCb() {
            let obj = this.getTreeNodeByType(MODEL_TREE_TYPE.basic)[0];
            if (!obj) return;

            let { id, type } = obj;
            this.setCurTreeNodeId(id);

            this.$router.push({
                path: `/page/model/edit`,
                query: { type, id }
            });
        },

        // 删除tag
        onCloseTag(item) {
            model.delModal({ id: item.id }).then(res => {
                if (!res || res.code !== "200") return;
                this.$message(`删除成功`);

                const delIdx = this.modelsList.findIndex(
                    list => list.id === item.id
                );
                this.modelsList.splice(delIdx, 1);

                if (item.id === this.curModelId) {
                    this.clearAllDataModels();
                }
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
        padding: 20px;
        overflow: auto;
        position: absolute;
        top: 0;
        left: $left-width;
        right: 0;
        bottom: 0;
        .rightContWrap {
            min-width: 758px;
        }
        .btnWrap {
            margin-bottom: 20px;
        }
    }
}

.modelsContent {
    max-height: 300px;
    overflow: auto;
    li {
        height: 40px;
        line-height: 40px;
        padding: 0 30px;
        cursor: pointer;
    }
    :global {
        .el-tag {
            margin-right: 10px;
            margin-bottom: 10px;
            background-color: transparent;
        }
    }
}
</style>
