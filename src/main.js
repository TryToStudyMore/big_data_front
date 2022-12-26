import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs'
Vue.config.productionTip = false
Vue.prototype.$qs = qs
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
}).$mount('#app')
