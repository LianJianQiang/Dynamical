import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入组件
import Home from 'pages/Home.vue';
import Argument from 'pages/Argument.vue';
import Model from 'pages/Model/index.vue';
import Report from 'pages/Report.vue';
import NotFound from 'pages/NotFound.vue';

import EditModel from 'pages/Model/Edit';
import OpenModel from 'pages/Model/Open';


// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/arg', component: Argument },
    {
        path: '/model',
        component: Model,
        children: [
            {
                path: 'edit',
                component: EditModel
            },
            {
                path: 'open',
                component: OpenModel
            }
        ]
    },
    { path: '/report', component: Report },
    { path: '*', component: NotFound }
]

var router = new VueRouter({
    routes
});

export default router;
