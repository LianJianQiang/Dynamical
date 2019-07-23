<template>
    <div :class="$style.root">
        <div :class="$style.content">
            <BufferCurve />
        </div>
    </div>
</template>

<script>
import BufferCurve from "./BufferCurve";
export default {
    name: "Argument",
    components: {
        BufferCurve
    },
    data() {
        return {};
    },
    props: {}
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
    padding: 20px;

    .content {
        width: 100%;
        height: 100%;
        padding: 20px;
        background-color: #fff;
        border-radius: $raduis_1;
        overflow: auto;
    }
}
</style>
