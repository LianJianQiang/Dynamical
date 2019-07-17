<template>
    <div :class="$style.root">
        <CarBody />
    </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
// import { MODEL_TREE_TYPE } from "common/constants";
import CarBody from "./CarBody";

export default {
    name: "Args",
    components: {
        CarBody
    },
    data() {
        return {};
    },
    props: {},
    methods: {},
    computed: {},
    mounted() {}
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
        padding: 100px;
    background: #fff;
}
</style>

