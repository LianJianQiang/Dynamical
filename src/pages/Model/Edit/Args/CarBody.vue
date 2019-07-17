<template>
    <div :class="$style.root">
        <div :class="$style.body">
            <img :src="Img['hc']" title="缓冲器-前端" :class="[$style.frontHC,$style.hc]" />
            <img :src="Img['hc']" title="缓冲器-后端" :class="[$style.backHC,$style.hc]" />
            <img :src="Img['xjth']" title="橡胶弹簧-前端" :class="[$style.frontXJTH,$style.xjth]" />
            <img :src="Img['xjth']" title="橡胶弹簧-前端" :class="[$style.backXJTH,$style.xjth]" />
            <img :src="Img['yk']" title="压馈管-前端" :class="[$style.frontYK,$style.yk]" />
            <img :src="Img['yk']" title="压馈管-前端" :class="[$style.backYK,$style.yk]" />
            <img :src="Img['gz']" title="过载保护-前端" :class="[$style.frontGZ,$style.gz]" />
            <img :src="Img['gz']" title="过载保护-前端" :class="[$style.backGZ,$style.gz]" />
        </div>
    </div>
</template>

<script>
import Img from "assets/images/connect";

export default {
    name: "Args",
    components: {},
    data() {
        return {
            Img
        };
    },
    props: {},
    methods: {},
    computed: {},
    mounted() {}
};
</script>

<style module lang="scss">
.root {
    display: inline-block;
    .body {
        width: 420px;
        height: 220px;
        border: 2px solid #7e7e7e;
        position: relative;
    }
    .hc,
    .xjth {
        position: absolute;
        top: 50%;
    }
    .hc {
        width: 20px;
        height: 15px;
    }

    .frontHC {
        left: 10px;
    }

    .backHC {
        right: 10px;
    }

    .xjth {
        width: 30px;
        height: 10px;
    }
    .frontXJTH {
        left: 35px;
    }
    .backXJTH {
        right: 35px;
    }
}
</style>

