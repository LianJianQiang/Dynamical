<template>
    <div id="app">
        <Layout />
    </div>
</template>

<script>
import Layout from "components/Layout.vue";

export default {
    name: "app",
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
}
</style>

