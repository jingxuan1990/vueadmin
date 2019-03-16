import Vue from 'vue'

import Element from 'element-ui'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import 'element-ui/lib/theme-chalk/index.css'
import i18n from './lang' // Internationalization

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
import '../mock' // simulation data

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

/* 创建全局过滤器 */
Vue.filter('date', (val) => {
  // 把bigint转换为yyyy-mm-dd
  var date = new Date(val)
  var yy = date.getFullYear()
  var mm = date.getMonth() + 1
  mm = mm > 9 ? mm : '0' + mm
  var dd = date.getDate()
  dd = dd > 9 ? dd : '0' + dd
  return yy + '-' + mm + '-' + dd
})
Vue.filter('datetime', (val) => {
  // 把bigint转换为yyyy-mm-dd hh:mm:ss
  var date = new Date(val)
  var yy = date.getFullYear()
  var mm = date.getMonth() + 1
  mm = mm > 9 ? mm : '0' + mm
  var dd = date.getDate()
  dd = dd > 9 ? dd : '0' + dd

  var hh = date.getHours()
  hh = hh > 9 ? hh : '0' + hh
  var mi = date.getMinutes()
  mi = mi > 9 ? mi : '0' + mi
  var ss = date.getSeconds()
  ss = ss > 9 ? ss : '0' + ss

  return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mi + ':' + ss
})
Vue.filter('currency', (val) => {
  // 把int转换为￥xx.yy
  return '￥' + val.toFixed(2)
})
Vue.filter('tableStatus', (val) => {
  if (val === 1) return '空闲'
  else if (val === 2) return '预定'
  else if (val === 3) return '占用'
  else return '其它'
})

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
