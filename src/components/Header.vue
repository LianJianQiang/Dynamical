<template>
    <div :class="$style.root" class="clearfix">
        <div style="font-size:20px;color:#fff">header</div>
        <!--
        <div :class="$style.logo" class="fll">
            <img :src="logoImg" alt />
        </div>
        <div :class="$style.title" class="fll">客运列车纵向动力学软件系统</div>
        <div :class="$style.user" class="flr">
            <div :class="$style.avatar" class="fll">
                <div :class="$style.imgWrap">
                    <img :src="userAvatar" alt />
                </div>
            </div>
            <div :class="$style.username" class="flr">{{username}}</div>
        </div>
        -->
    </div>
</template>

<script>
import logoImg from "assets/images/logo.png";
export default {
    name: "Header",
    data() {
        return {
            logoImg,
            username: "Lian",
            userAvatar: logoImg
        };
    },
    props: {
        msg: String
    }
};
</script>

<style module lang="scss">

$user-img-h: 60px;
$font-color: #fff;

.root {
    width: 100%;
    height: $header-H;
    .logo {
        width: 144px;
        height: 44px;
        margin-top: 16px;
        margin-right: 12px;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .title {
        height: $header-H;
        line-height: $header-H;
        font-size: 30px;
        color: $font-color;
    }

    .user {
        margin-top: 10px;
        line-height: $user-img-h;
        div {
            display: inline-block;
        }
    }

    .avatar {
        width: 60px;
        height: $user-img-h;
        border-radius: 50%;
        background-color: #3d94b6;
        margin-right: 10px;
        padding: 5px;
        .imgWrap {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
        }
    }

    .username {
        font-size: 18px;
        color: $font-color;
    }
}
</style>
