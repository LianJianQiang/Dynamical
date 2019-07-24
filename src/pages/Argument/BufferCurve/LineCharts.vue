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
        }
    },
    data() {
        return {
            chart: null
        };
    },
    mounted() {
        this.initChart();
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
            this.chart.setOption({
                backgroundColor: "#fff",

                title: {
                    text: "",
                    top: 5,
                    left: "center"
                },
                legend: {},
                // X轴
                xAxis: { type: "category" },
                // Y轴
                yAxis: {},
                dataset: {
                    // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
                    // 如果不指定 dimensions，也可以通过指定 series.encode 完成映射，参见后文。
                    dimensions: ["product", "2015", "2016", "2017"],
                    source: [
                        {
                            product: "Matcha Latte",
                            "2015": 43.3,
                            "2016": 85.8,
                            "2017": 93.7
                        },
                        {
                            product: "Milk Tea",
                            "2015": 83.1,
                            "2016": 73.4,
                            "2017": 55.1
                        },
                        {
                            product: "Cheese Cocoa",
                            "2015": 86.4,
                            "2016": 65.2,
                            "2017": 82.5
                        },
                        {
                            product: "Walnut Brownie",
                            "2015": 72.4,
                            "2016": 53.9,
                            "2017": 39.1
                        }
                    ]
                },
                // 数据
                series: [{ type: "line" }, { type: "line" }, { type: "line" }]
            });
        }
    }
};
</script>
