import '@babel/polyfill';
import Es6Promise from 'es6-promise'
import Vue from 'vue';

import App from './App.vue';
import router from './router.js'
import store from './store'


import './plugins/element.js';
import './plugins/vueGridLayout';
import './plugins/vueDragResize';
// import './plugins/echarts';

// 全局样式
import 'styles/index.scss';

Es6Promise.polyfill();

Vue.config.productionTip = false;


window.onload = function () {
    new Vue({
        store,
        router,
        render: h => h(App)
    }).$mount('#app')
}


