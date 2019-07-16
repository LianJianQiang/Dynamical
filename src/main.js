import Vue from 'vue';
// import ElementUI from 'element-ui';

import App from './App.vue';
import router from './router.js'
import store from './store'


// 全局样式
import 'styles/index.scss';

import './plugins/element.js'

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
