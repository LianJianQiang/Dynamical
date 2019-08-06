<template>
    <div :class="[$style.root, size === 'mini' ? $style.mini : '']" class="cursor-p" ref="root">
        <el-popover
            popper-class="drop-down-popover"
            placement="bottom"
            v-on:show="showPop"
            :width="popoverWidth"
            trigger="click"
            :visible-arrow="false"
            v-model="visible"
        >
            <div>
                <slot></slot>
                <div class="subBtnWrap">
                    <el-button class="btn-default" @click="clickCancel">取消</el-button>
                    <el-button class="btn-default" @click="clickSave">应用</el-button>
                </div>
            </div>
            <div slot="reference" class="link inp-border" ref="reference">
                <span>{{placeholder}}</span>
                <span class="triangle-down-6 downIcon"></span>
            </div>
        </el-popover>
    </div>
</template>

<script>
export default {
    name: "DropDown",
    data() {
        return {
            visible: false,
            popoverWidth: 250
        };
    },
    props: {
        size: {
            type: String,
            default: "default"
        },
        placeholder: {
            type: String,
            default: "参数设置"
        },
        save: {
            type: Function,
            default: () => {}
        },
        cancel: {
            type: Function,
            default: () => {}
        }
    },
    methods: {
        showPop: function() {
            this.popoverWidth = this.$refs.reference.offsetWidth;
        },
        setVisible(bool = false) {
            this.visible = bool;
        },
        clickCancel() {
            this.setVisible();
            this.cancel();
        },
        clickSave() {
            this.setVisible();
            this.save();
        }
    },
    mounted() {}
};
</script>

<style module lang="scss">
$height: 28px;
.root {
    width: 100%;
    height: $height;
    line-height: $height - 2px;
    position: relative;
    margin-top: 4px;

    &.mini {
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        :global {
            .link {
                padding: 0 $input-pad-s;
            }
            .downIcon {
                right: 5px;
                top: 9px;
            }
        }
    }

    :global {
        .link {
            padding: 0 $input-pad-default;
        }
        .downIcon {
            position: absolute;
            right: 10px;
            top: 12px;
        }
    }
}

:global {
    .drop-down-popover {
        min-width: 250px !important;
        max-height: 220px !important;
        overflow: auto;
        .subBtnWrap {
            margin-top: 10px;
            text-align: center;
        }
    }
}
</style>
