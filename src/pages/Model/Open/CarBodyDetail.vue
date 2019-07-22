<template>
    <div :class="$style.root">
        <div :class="$style.train" class="cursor-p" :style="bodyBGImg">
            <div>
                <img
                    :src="Img['hc']"
                    title="缓冲器-前端"
                    :class="[$style.frontHC,$style.hc,$style.connectEle]"
                />
                <img
                    :src="Img['hc']"
                    title="缓冲器-后端"
                    :class="[$style.backHC,$style.hc,$style.connectEle]"
                />
                <img
                    :src="Img['xjth']"
                    title="橡胶弹簧-前端"
                    :class="[$style.frontXJTH,$style.xjth,$style.connectEle]"
                />
                <img
                    :src="Img['xjth']"
                    title="橡胶弹簧-后端"
                    :class="[$style.backXJTH,$style.xjth,$style.connectEle]"
                />
                <img
                    :src="Img['yk']"
                    title="压馈管-前端"
                    :class="[$style.frontYK,$style.yk,$style.connectEle]"
                />
                <img
                    :src="Img['yk']"
                    title="压馈管-后端"
                    :class="[$style.backYK,$style.yk,$style.connectEle]"
                />
                <img
                    :src="Img['gz']"
                    title="过载保护-前端"
                    :class="[$style.frontGZ,$style.gz,$style.connectEle]"
                />
                <img
                    :src="Img['gz']"
                    title="过载保护-后端"
                    :class="[$style.backGZ,$style.gz,$style.connectEle]"
                />
                <img
                    :src="Img['fp']"
                    title="防爬-前端"
                    :class="[$style.frontFP,$style.fp,$style.connectEle]"
                />
                <img
                    :src="Img['fp']"
                    title="防爬-后端"
                    :class="[$style.backFP,$style.fp,$style.connectEle]"
                />
                <div :class="[$style.diy,$style.connectDiy,$style.frontDIY1,$style.connectEle]">diy1</div>
                <div :class="[$style.diy,$style.connectDiy,$style.frontDIY2,$style.connectEle]">diy2</div>
                <div :class="[$style.diy,$style.connectDiy,$style.backDIY1,$style.connectEle]">diy1</div>
                <div :class="[$style.diy,$style.connectDiy,$style.backDIY2,$style.connectEle]">diy2</div>
                <img
                    :src="Img['fd']"
                    title="风挡-前端"
                    :class="[$style.frontFD,$style.fd,$style.connectEle]"
                />
                <img
                    :src="Img['fd']"
                    title="风挡-后端"
                    :class="[$style.backFD,$style.fd,$style.connectEle]"
                />
                <img
                    :src="Img['cjjz']"
                    title="防爬-前端"
                    :class="[$style.frontCJJZ,$style.cjjz,$style.connectEle]"
                />
                <img
                    :src="Img['cjjz']"
                    title="防爬-后端"
                    :class="[$style.backCJJZ,$style.cjjz,$style.connectEle]"
                />
                <img :src="Img['qy']" title="牵引系统" :class="[$style.qy,$style.btmEle]" />
                <img :src="Img['zd']" title="制动系统" :class="[$style.zd,$style.btmEle]" />
                <div :class="[$style.diy,$style.carDiy,$style.btmDIY1,$style.btmEle]">diy1</div>
                <div :class="[$style.diy,$style.carDiy,$style.btmDIY2,$style.btmEle]">diy2</div>
                <div :class="[$style.diy,$style.carDiy,$style.btmDIY3,$style.btmEle]">diy3</div>
            </div>
        </div>
    </div>
</template>

<script>
import Img from "assets/images/connect";

export default {
    name: "CarBodyDetail",
    components: {},
    data() {
        return {
            Img,
            bodyBGImg: { backgroundImage: `url(${Img["ct01"]})` }
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
    background-color: #fff;
    margin: 0 auto;
    img{
        cursor: pointer;
    }

    .train {
        width: 666px;
        height: 288px;
        margin: 50px 100px 150px;
        position: relative;
        background-repeat: no-repeat;
        background-size: 100%;
    }
    .diy {
        width: 28px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        font-size: 12px;
        border: 1px solid rgba(255, 116, 255, 0.6);
        color: rgba(255, 116, 255, 0.6);
    }
    .connectEle {
        position: absolute;
        top: 56%;
    }
    .hc {
        width: 20px;
        height: 16px;
        margin-top: -8px;
    }

    .frontHC {
        left: 120px;
    }

    .backHC {
        right: 120px;
    }

    .xjth {
        width: 30px;
        height: 10px;
        margin-top: -5px;
    }
    .frontXJTH {
        left: 146px;
    }
    .backXJTH {
        right: 146px;
    }

    .yk {
        width: 20px;
        height: 30px;
        margin-top: -15px;
    }
    .frontYK {
        left: 180px;
    }
    .backYK {
        right: 180px;
    }

    .gz {
        width: 10px;
        height: 30px;
        margin-top: -15px;
    }
    .frontGZ {
        left: 208px;
    }
    .backGZ {
        right: 208px;
    }

    .connectDiy {
        margin-top: -9px;
    }
    .frontDIY1 {
        left: 224px;
    }
    .backDIY1 {
        right: 224px;
    }
    .frontDIY2 {
        left: 260px;
    }
    .backDIY2 {
        right: 260px;
    }

    .fd {
        width: 20px;
        height: 25px;
        bottom: 42px;
        top: auto;
    }
    .frontFD {
        left: 68px;
    }
    .backFD {
        right: 68px;
    }

    .fp {
        width: 20px;
        height: 20px;
        margin-top: -10px;
    }
    .frontFP {
        left: -30px;
    }
    .backFP {
        right: -30px;
    }

    .cjjz {
        width: 40px;
        height: 10px;
        top: 10px;
    }
    .frontCJJZ {
        left: 58px;
    }
    .backCJJZ {
        right: 58px;
    }

    .btmEle {
        position: absolute;
        left: 50%;
    }
    .qy {
        width: 40px;
        height: 20px;
        margin-left: -20px;
        bottom: -10px;
    }

    .zd {
        width: 40px;
        height: 30px;
        margin-left: -20px;
        bottom: -50px;
    }

    .carDiy {
        margin-left: -14px;
    }
    .btmDIY1 {
        bottom: -78px;
    }
    .btmDIY2 {
        bottom: -106px;
    }
    .btmDIY3 {
        bottom: -134px;
    }
}
</style>

