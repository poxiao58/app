import Vue from 'vue'
import Router from 'vue-router'
import UploadImg from "../components/UploadImg";
import UploadImgs from "../components/test"
import home from "../components/home";

Vue.use(Router)

/* Layout */

export const constantRouterMap = [
  {
    path: '/',
    component:home
  },
  {
    path: '/uploadImg',
    name:'uploadImg',
    component:UploadImg
  },
  {
    path: '/uploadImgs',
    name:'uploadImgs',
    component:UploadImgs
  },
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
