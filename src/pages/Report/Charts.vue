<template>
    <div :class="$style.root">
        <LineCharts :options="chartsOptions" />
    </div>
</template>

<script>
import LineCharts from "components/Charts";

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
            startValue: "2014-06-01"
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
        LineCharts
    },
    data() {
        return {
            chartsOptions
        };
    },
    props: {}
};
</script>

<style module lang="scss">
.root {
    background-color: #fff;
    display: inline-block;
    width: 50%;
    height: 300px;
}
</style>
