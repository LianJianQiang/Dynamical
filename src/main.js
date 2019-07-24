import Vue from 'vue';
// import ElementUI from 'element-ui';

import App from './App.vue';
import router from './router.js'
import store from './store'


import './plugins/element.js';
// import './plugins/echarts';

// 全局样式
import 'styles/index.scss';

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
