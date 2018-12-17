import '@babel/polyfill'
import Vue from 'vue'
import VueMediaQueryMixin from 'vue-media-query-mixin'
import './plugins/vuetify'
import VeeValidate from 'vee-validate'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(VueResource);
Vue.use(VeeValidate);
Vue.use(VueMediaQueryMixin, {framework: 'vuetify'});
Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
