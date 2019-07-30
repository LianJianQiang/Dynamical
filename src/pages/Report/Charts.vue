<template>
    <div :class="$style.root" @contextmenu.prevent="onContextmenu" ref="root">
        <Charts :options="chartsOptions" />
        <div
            v-show="contextmenuShow"
            :class="$style.contextmenu"
            ref="contextmenu"
            @contextmenu.prevent.stop="()=>{}"
        >
            <ul>
                <Drawer>
                    <li @click="onClickContextMenu">自定义</li>
                </Drawer>
            </ul>
        </div>
        <div :class="$style.dragDom" ref="dragDom"></div>
    </div>
</template>

<script>
import Charts from "components/Charts";
import DragResize from "lib/dragResize";

import Drawer from "./ChartsDiy";
import data from "./data";

let chartsOptions = {
    tooltip: {
        trigger: "axis"
    },
    legend: {
        data: ["Y"]
    },
    xAxis: {
        type: "category",
        name: "x",
        // splitLine: { show: false },
        data: data.map(function(item) {
            return item[0];
        })
    },
    yAxis: {
        mame: "fx",
        type: "value",
        nameLocation: "left"
    },
    dataZoom: [
        {
            startValue: "2014-11-01"
        },
        {
            type: "inside"
        }
    ],
    series: [
        {
            name: "Y",
            type: "line",
            data: data.map(function(item) {
                return item[1];
            }),
            smooth: true
        }
    ]
};

export default {
    name: "Chart",
    components: {
        Charts,
        Drawer
    },
    data() {
        return {
            chartsOptions,
            contextmenuShow: false
        };
    },
    props: {},
    methods: {
        hideContextmenu() {
            this.contextmenuShow = false;
        },
        onContextmenu(ev) {
            this.$refs.contextmenu.style.left = ev.zrX + 10 + "px";
            this.$refs.contextmenu.style.top = ev.zrY + 10 + "px";
            this.contextmenuShow = true;
        },
        onClickContextMenu() {
            // 点击完成后因此contextmenu
            this.hideContextmenu();
        }
    },
    mounted() {
        DragResize.init({
            dragDom: this.$refs.dragDom,
            resizeDom: this.$refs.root
        });
        document.body.addEventListener("click", this.hideContextmenu);
    },
    beforeDestroy() {
        document.body.removeEventListener("click", this.hideContextmenu);
    }
};
</script>

<style module lang="scss">
.root {
    background-color: #fff;
    display: inline-block;
    width: 48%;
    margin: 10px 1%;
    height: 300px;
    position: relative;
    .contextmenu {
        position: absolute;
        z-index: 16777271;
        background-color: #fff;
        box-shadow: $box-shadow_1;
        line-height: 2em;
        font-size: 12px;
        cursor: pointer;
        li {
            width: 100px;
            text-align: center;
        }
    }

    .dragDom {
        // width: 10px;
        // height: 10px;
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 999;
        cursor: move;

        width: 0;
        height: 0;
        border-width: 5px;
        border-style: solid;
        border-color: transparent #999 #999 transparent;
    }
}
</style>
