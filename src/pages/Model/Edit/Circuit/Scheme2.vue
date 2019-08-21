<template>
    <div :class="$style.root">
        <ul>
            <li
                v-for="(file, idx) in files"
                :key="idx"
            >{{file.name}} - Error: {{file.error}}, Success: {{file.success}}</li>
        </ul>
        <file-upload
            ref="upload"
            v-model="files"
            post-action="/post.method"
            put-action="/put.method"
            @input-file="inputFile"
            @input-filter="inputFilter"
        >上传文件</file-upload>
        <button
            v-show="!$refs.upload || !$refs.upload.active"
            @click.prevent="$refs.upload.active = true"
            type="button"
        >开始上传</button>
        <button
            v-show="$refs.upload && $refs.upload.active"
            @click.prevent="$refs.upload.active = false"
            type="button"
        >停止上传</button>
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
    methods: {
        // 上传文件之前的钩子
        beforeUpload(file) {
            console.log(file);
        },

        // 文件上传成功时的钩子
        onSuccess(response, file, fileList) {
            console.log(response, file, fileList);
        }
    },
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
            width: 150px;
            height: 30px;
            line-height: 30px;
            border: 1px solid $highlight-color_1;
            color: $highlight-color_1;
            margin-right: 20px;
            &:last-child {
                margin-right: 0;
            }

            :global {
                .el-upload {
                    width: 100%;
                    height: 100%;
                }
                .el-button {
                    font-size: 14px;
                    padding: 0;
                    background: transparent;
                    color: $highlight-color_1;
                }
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


