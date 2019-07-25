<template>
    <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>
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
            type: String,
            default: "400px"
        },
        height: {
            type: String,
            default: "400px"
        },
        options: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            chart: null
        };
    },
    mounted() {
        this.initChart();
        this.initOptionsWatcher();
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
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
