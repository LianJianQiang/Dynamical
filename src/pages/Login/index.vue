<template>
    <div :class="$style.root">
        <div :class="$style.content">
            <div :class="$style.titleWrap" class="clearfix">
                <div :class="$style.logoWrap" class="fll">
                    <img :src="Logo" alt />
                </div>
                <div class="fll">
                    <div :class="$style.title">国铁吉讯</div>
                    <div :class="$style.desc">让服务联网 让出行智慧</div>
                </div>
            </div>
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        v-model="loginForm.password"
                        autocomplete="off"
                        placeholder="请输入密码"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="submitForm('loginForm')"
                        :class="$style.subBtn"
                        size="small"
                    >登 录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import Logo from "assets/images/logo2.png";
import { login } from "api";

import { SESSION_USERINFO_KEY } from "common/constants";

export default {
    name: "Login",
    components: {},
    data() {
        let validateUsername = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            }
            callback();
        };

        let validatePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            }
            callback();
        };

        return {
            loginForm: {
                username: "",
                password: ""
            },
            rules: {
                username: [{ validator: validateUsername, trigger: "blur" }],
                password: [{ validator: validatePassword, trigger: "blur" }]
            },
            Logo
        };
    },
    methods: {
        submitForm(formName) {
            let { username, password } = this.loginForm;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$router.push("/page");
                    
                    // TODO 测试
                    window.sessionStorage.setItem(
                        SESSION_USERINFO_KEY,
                        JSON.stringify({ userId: "1" })
                    );

                    // login.signIn({ username, password }).then(res => {
                    //     if (!res) return;
                    //     this.$router.push("/page");
                    // });
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
    position: relative;
    .content {
        width: 450px;
        height: 300px;
        background-color: #fff;
        padding: 30px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -225px;
        margin-top: -150px;

        .titleWrap {
            margin-bottom: 20px;
            .logoWrap {
                width: 54px;
                margin-right: 16px;
            }
            .title {
                font-size: 28px;
                font-weight: 500;
                line-height: 1em;
            }
            .desc {
                font-size: 18px;
            }
        }

        .subBtn {
            width: 100%;
            font-size: 14px;
        }
    }

    :global {
        .el-form-item {
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
