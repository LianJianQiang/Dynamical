import Vue from 'vue';
import VueRouter from 'vue-router';


// import { MENU_LIST } from 'common/constants';

// 引入组件
// import ArgConfig from 'pages/ArgConfig';
// import Model from 'pages/Model';
// import Report from 'pages/Report';
// import NotFound from 'pages/NotFound';
// import Waiting from 'pages/Waiting';

// import EditModel from 'pages/Model/Edit';
// import OpenModel from 'pages/Model/Open';

// import BufferCurve from 'pages/ArgConfig/BufferCurve';
// import BufferPiecewise from 'pages/ArgConfig/BufferPiecewise';
// import YKGTemp from 'pages/ArgConfig/YKGTemp';

// import Login from 'pages/Login';
// import App from 'pages';

const ArgConfig = resolve => require(['pages/ArgConfig'], resolve);
const Model = resolve => require(['pages/Model'], resolve);
const Report = resolve => require(['pages/Report'], resolve);

const NotFound = resolve => require(['pages/NotFound'], resolve);
const Waiting = resolve => require(['pages/Waiting'], resolve);

const EditModel = resolve => require(['pages/Model/Edit'], resolve);
const OpenModel = resolve => require(['pages/Model/Open'], resolve);

const BufferCurve = resolve => require(['pages/ArgConfig/BufferCurve'], resolve);
const BufferPiecewise = resolve => require(['pages/ArgConfig/BufferPiecewise'], resolve);
const YKGTemp = resolve => require(['pages/ArgConfig/YKGTemp'], resolve);

const Login = resolve => require(['pages/Login'], resolve);
const App = resolve => require(['pages'], resolve);



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
