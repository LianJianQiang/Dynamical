<template>
    <div :class="$style.root" class="clearfix">
        <ul :class="$style.menuWrap">
            <li
                :class="[$style.menuItem, getMenuItemStatus(item,'active')]"
                class="cursor-p"
                v-for="item in menuList"
                :key="item.key"
                @click="onClickMenuItem(item)"
            >
                <!-- src 临时方案，优化 -->
                <img :src="active===item.key ? item.activeIcon : item.icon" alt />
                <span :class="getMenuItemStatus(item,'active')">{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { MENU_LIST } from "common/constants";

export default {
    name: "LeftMenu",
    data() {
        return {
            menuList: MENU_LIST,
            active: ""
        };
    },
    methods: {
        getMenuItemStatus: function(item = {}, y = "", n = "") {
            return this.active === item.key ? y : n;
        },

        // 点击跳转
        onClickMenuItem: function(item) {
            this.active = item.key;
            this.$router.push(item.url);
        },

        // 初始化页面，默认选中
        initActive: function() {
            const { path } = this.$route;
            let idx = path.indexOf("/", 1);
            let curPath = path;
            if (idx !== -1) {
                curPath = path.substring(0, idx);
            }

            const curMenuItem = MENU_LIST.find(item => {
                return item.url === curPath;
            });

            curMenuItem && (this.active = curMenuItem.key);
        }
    },
    computed: {},
    mounted() {
        this.initActive();
    }
};
</script>

<style module lang="scss">
$user-img-h: 60px;
$font-color: #fff;
$active-color: #4baed0;

.root {
    width: 100%;
    height: 100%;
    overflow: auto;

    .menuWrap {
        margin-top: 4px;
        margin-bottom: $header-H;
        .menuItem {
            height: 56px;
            line-height: 56px;
            color: #fff;
            font-size: 16px;
            padding-left: 52px;
            position: relative;
            &.active {
                background: #fff;
            }
            img {
                width: 20px;
                height: 20px;
                vertical-align: sub;
                margin-right: 18px;
            }
            span {
                display: inline-block;
            }

            :global {
                span.active {
                    color: $active-color;
                }
            }
        }
        :global {
            li.active {
                background-color: #222632;
                &:before {
                    content: "";
                    display: inline-block;
                    width: 6px;
                    height: 100%;
                    background-color: $active-color;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
    }
}
</style>
