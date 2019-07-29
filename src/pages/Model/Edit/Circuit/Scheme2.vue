<template>
    <div :class="$style.root">
        <div :class="$style.notice">请依次选取下列文件，选取完毕后，点击‘合成线路信息计算’按钮，等待文件下载完成后，打开确认</div>
        <ul :class="$style.fileList" class="clearfix">
            <li class="fll cursor-p" :class="$style.fileUpload">线路坡道信息文件</li>
            <li class="fll cursor-p" :class="$style.fileUpload">线路曲线信息文件</li>
            <li class="fll cursor-p" :class="$style.fileUpload">线路隧道信息文件</li>
        </ul>

        <div :class="$style.submitBtn" class="cursor-p">合成线路信息计算</div>
    </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
// import { MODEL_TREE_TYPE } from "common/constants";

export default {
    name: "Circuit",
    components: {},
    data() {
        return {};
    },
    props: {},
    methods: {},
    computed: {},
    mounted() {}
};
</script>


<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
    padding: 20px;
    background: #fff;
    border-radius: $radius_1;
    .fileList {
        margin: 20px 0;
        .fileUpload {
            padding: 5px 10px;
            border: 1px solid $highlight-color_1;
            color: $highlight-color_1;
            margin-right: 20px;
            &:last-child {
                margin-right: 0;
            }
        }
    }

    .submitBtn {
        display: inline-block;
        padding: 5px 20px;
        background-color: $highlight-color_1;
        color: #fff;
        border-radius: 4px;
    }
}
</style>


