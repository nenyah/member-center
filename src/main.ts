/*
 * @Description:
 * @Author: Steven
 * @Date: 2020-11-06 12:11:16
 * @LastEditors: Steven
 * @LastEditTime: 2020-11-06 16:39:11
 */
import Vue from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css' //引入tailwind
import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false

new App().$mount()
