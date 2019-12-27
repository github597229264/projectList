// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from "moment"
import $ from 'jquery'
import Echarts from 'echarts'
import HighCharts from 'highcharts'
import VueHighcharts from 'vue-highcharts';
Vue.prototype.Highcharts = VueHighcharts
Vue.use(VueHighcharts)
Vue.prototype.echarts = Echarts
Vue.use(Echarts)
// import store from './store/store'
import {
  getAjax,
  postAjax,
  http
} from './axios/axiosFn.js'
const Bus = new Vue();

Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.use(Vuex);
Vue.prototype.$moment = moment;
Vue.prototype.$gAjax = getAjax;
Vue.prototype.$pAjax = postAjax;
Vue.prototype.$http = http;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: {
    App
  },
  data() {
    return {
      Bus
    }
  },
  template: '<App/>'
})
