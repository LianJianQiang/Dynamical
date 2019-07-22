<template>
    <div :class="$style.root" :style="bodyBGImg">{{carInfo.col}}</div>
</template>

<script>
import Img from "assets/images/connect";

const TYPE_DICT = {
    body: "ct01",
    head: "ct02",
    trail: "ct03"
};
export default {
    name: "Header",
    data() {
        const imgUrl = Img[TYPE_DICT[this.type]];
        return {
            bodyBGImg: { backgroundImage: `url(${imgUrl})` }
        };
    },
    props: {
        type: {
            default: "body" // 车头：head，车尾：trail，车身：body
        },
        carInfo: {
            type: Object,
            default: () => {}
        }
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
    display: inline-block;
    background-size: 100% 100%;
    margin: 0 -5px;
    font-size: 20px;
    padding-top: 15px;
    text-align: center;
    cursor: pointer;
}
</style>
