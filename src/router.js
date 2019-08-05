import Vue from 'vue';
import VueRouter from 'vue-router';


// import { MENU_LIST } from 'common/constants';

// 引入组件
// import Home from 'pages/Home.vue';
// import Argument from 'pages/Argument';
import ArgConfig from 'pages/ArgConfig';
import Model from 'pages/Model';
import Report from 'pages/Report';
import NotFound from 'pages/NotFound';
import Waiting from 'pages/Waiting';

import EditModel from 'pages/Model/Edit';
import OpenModel from 'pages/Model/Open';

import BufferCurve from 'pages/ArgConfig/BufferCurve';
import BufferPiecewise from 'pages/ArgConfig/BufferPiecewise';
import YKGTemp from 'pages/ArgConfig/YKGTemp';
// import Traction from 'pages/ArgConfig/Traction';

import Login from 'pages/Login';
import App from 'pages';
// let redirectUrl = MENU_LIST[0].url || '';

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
        path: '/page',
        component: App,
        redirect: '/page/model',
        children: [
            // { path: 'home', component: Home },
            // { path: 'arg', component: Argument },
            {
                path: 'arg-cfg',
                component: ArgConfig,
                children: [
                    {
                        path: 'buffer-curve',
                        component: BufferCurve
                    },
                    {
                        path: 'buffer-piecewise',
                        component: BufferPiecewise
                    },
                    {
                        path: 'ykg',
                        component: YKGTemp
                    },
                    // {
                    //     path: 'tcsd',
                    //     component: Traction
                    // },
                    { path: '*', component: Waiting }
                ]
            },
            {
                path: 'model',
                component: Model,
                children: [
                    {
                        path: 'edit',
                        component: EditModel
                    },
                    {
                        path: 'open',
                        component: OpenModel
                    },
                    { path: '*', component: Waiting }
                ]
            },
            { path: 'report', component: Report },
            { path: '*', component: NotFound }
        ]
    },
    { path: '*', component: NotFound }

]

var router = new VueRouter({
    routes
});

export default router;
