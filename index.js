import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: false,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'example' }
    }]
  },
  {
    path: '/admin',
    component: Layout,
    name: 'AdminUser',
    children: [
      {
        path: 'user',
        name: '管理员',
        component: () => import('@/views/user/index'),
        meta: { title: '会员管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/suite',
    component: Layout,
    name: 'suite',
    meta: { title: '套间管理', icon: 'example' },
    children: [
      {
        path: 'allSuite',
        name: 'allSuite',
        component: () => import('@/views/suite/allSuite/index'),
        meta: { title: '所有套间' }
      },
      {
        path: 'addSuite',
        name: 'addSuite',
        component: () => import('@/views/suite/addSuite/index'),
        meta: { title: '添加套间'}
      },
      {
        path: 'deleSuite',
        name: 'deleSuite',
        component: () => import('@/views/suite/deleSuite/index'),
        meta: { title: '删除套间'}
      }

    ]
  },
  {
    path: '/category',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'category',
        component: () => import('@/views/category/index'),
        meta: { title: '商品分类', icon: 'table' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '商品管理', icon: 'tree' },
    children: [
      {
        path: 'goods',
        name: 'Goods',
        component: () => import('@/views/example/goods/index'),
        meta: { title: '所有商品'}
      },
      {
        path: 'addGoods',
        name: 'addGoods',
        component: () => import('@/views/example/addGoods/index'),
        meta: { title: '添加商品'}
      },
      {
        path: 'editGoods',
        name: 'editGoods',
        component: () => import('@/views/example/editGoods/index'),
        meta: { title: '编辑商品'}
      },
      {
        path: 'deleGoods',
        name: 'deleGoods',
        component: () => import('@/views/example/deleGoods/index'),
        meta: { title: '删除商品'}
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'order',
        component: () => import('@/views/order/index'),
        meta: { title: '订单列表', icon: 'form' }
      }
    ]
  },
  {
    path: '/safety',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'safety',
        component: () => import('@/views/safety/index'),
        meta: { title: '安全设置', icon: 'nested' }
      }
    ]
  },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
