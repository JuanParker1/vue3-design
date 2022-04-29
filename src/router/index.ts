/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-04-02 14:12:10
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-04-27 10:58:47
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
    }
  ]
})

export default router
