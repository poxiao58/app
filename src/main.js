// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';
import VueCropper from 'vue-cropper'

Vue.use(VueCropper)

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css' // 加载样式


Vue.use(MuseUI)

import Mui from 'vue-awesome-mui';
Vue.config.productionTip = false
Vue.use(Mui);

import router from './router'

import request from './util/request'
Vue.prototype.$http = request
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
