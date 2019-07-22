<template>
    <div :class="$style.root">
        <div v-if="!isOpenCarDetail">
            <div v-for="(item, idx) in listData" :key="idx" :class="$style.trainWrap">
                <div :class="$style.title">{{`第${item[0]}列`}}</div>
                <CarList :list="item[1]" :onClickList="onClickList" />
            </div>
        </div>
        <div v-else :class="$style.detailWrap">
            <div :class="$style.close" class="cursor-p" @click="onClickList({})">
                <img :src="closeIcon" alt />
            </div>
            <div :class="$style.title">{{carDetail.label}}</div>
            <CarBodyDetail :detail="carDetail" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

import Img from "assets/icon";
import CarList from "components/CarList";

import CarBodyDetail from "./CarBodyDetail";

export default {
    name: "Open",
    components: {
        CarBodyDetail,
        CarList
    },
    data() {
        return {
            closeIcon: Img["close"]
        };
    },
    props: {},
    methods: {
        ...mapActions("pageState", ["saveCurCarDetail"]),

        onClickList(info) {
            this.saveCurCarDetail(info);
        }
    },
    computed: {
        ...mapGetters("models", ["getCarListData"]),
        ...mapGetters("pageState", ["isOpenCarDetail"]),
        ...mapState("pageState", ["carDetail"]),

        listData() {
            return this.getCarListData({ modelName: "ces" });
        }
    },
    mounted() {
        // console.log(this.getCarListData({ modelName: "ces" }));
        console.log(this.isOpenCarDetail);
    }
};
</script>

<style module lang="scss">
.root {
    background: #fff;
    border-radius: $raduis_1;
    padding: 20px;
    position: relative;
    .trainWrap {
        margin-bottom: 60px;
        &:last-child {
            margin-bottom: 20px;
        }
    }
    .title {
        text-align: left;
        font-size: 20px;
        font-weight: 500;
        margin: 20px 0;
    }

    .detailWrap {
        text-align: center;
        .title {
            text-align: center;
            font-size: 18px;
            font-weight: normal;
        }
    }
    .close {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 20px;
        right: 20px;
    }
}
</style>
