<template>
    <div :class="$style.root" ref="chartWrap">
        <div
            :class="className"
            :id="id"
            :style="{width:`${width}px`,height:`${height}px`}"
            ref="myEchart"
        ></div>
    </div>
</template>

<script>
import echarts from "src/lib/echarts.js";
export default {
    name: "Charts",
    props: {
        className: {
            type: String,
            default: ""
        },
        id: {
            type: String,
            default: ""
        },
        width: {
            type: String
        },
        height: {
            type: String
        },
        options: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            chart: null
            // chartWidth: 600,
            // chartHeight: 300
        };
    },
    created() {},
    mounted() {
        this.$nextTick(() => {
            // 使用nextTick为了保证dom元素都已经渲染完毕
            this.initChart();
            this.initOptionsWatcher();
        });
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        // initSize() {
        //     if (this.width && this.height) return;
        //     let wrap = this.$refs.chartWrap;

        //     this.chartWidth = wrap.offsetWidth;
        //     this.chartHeight = wrap.offsetHeight;
        //     this.chart && this.chart.resize();
        // },
        initChart() {
            this.chart = echarts.init(this.$refs.myEchart);
            // 把配置和数据放这里
            this.chart.setOption(this.options);
        },
        initOptionsWatcher() {
            if (this.__unwatchOptions) {
                this.__unwatchOptions();
                this.__unwatchOptions = null;
            }
            if (!this.manualUpdate) {
                this.__unwatchOptions = this.$watch(
                    "options",
                    (val, oldVal) => {
                        if (!this.chart && val) {
                            this.initChart();
                        } else {
                            this.chart.setOption(val, val !== oldVal);
                        }
                    },
                    { deep: true }
                );
            }
        }
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
}
</style>

