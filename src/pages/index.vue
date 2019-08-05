<template>
    <div id="app">
        <Layout v-if="support" />
        <div v-else class="nonsupport">请选用高版本浏览器，告别IE</div>
    </div>
</template>

<script>
import Layout from "components/Layout.vue";

import { IEVersion } from "utils/util";

window.__IEVersion__ = IEVersion();

console.log("IEVersion : ", window.__IEVersion__);
const support =
    window.__IEVersion__ < 0 ||
    window.__IEVersion__ >= 9 ||
    window.__IEVersion__ === "edge";

export default {
    name: "app",
    data() {
        return {
            support
        };
    },
    components: {
        Layout
    }
};
</script>

<style lang="scss">
#app {
    width: 100%;
    height: 100%;
    min-width: $app-min-w;
    overflow: auto;

    .nonsupport {
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 20px;
    }
}
</style>

