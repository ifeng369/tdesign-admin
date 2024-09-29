import { DashboardIcon,LogoutIcon,CheckCircleIcon,UserCircleIcon } from 'tdesign-icons-vue-next';
import { RouteRecordRaw } from 'vue-router';
import { shallowRef } from 'vue';

import Layout from '@/layouts/index.vue';
import DashboardBasePage from '@/pages/dashboard/base/index.vue';
import DashboardDetailPage from '@/pages/dashboard/detail/index.vue';
import ResultSuccessPage from '@/pages/result/success/index.vue';
import ResultFailPage from '@/pages/result/fail/index.vue';
import ResultNetworkErrorPage from '@/pages/result/network-error/index.vue';
import Result403Page from '@/pages/result/403/index.vue';
import Result404Page from '@/pages/result/404/index.vue';
import Result500Page from '@/pages/result/500/index.vue';
import ResultBrowserIncompatiblePage from '@/pages/result/browser-incompatible/index.vue';
import ResultMaintenancePage from '@/pages/result/maintenance/index.vue'
import UserIndexPage from '@/pages/user/index.vue'


const menuList: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/base',
    name: 'dashboard',
    meta: {
      title: '仪表盘',
      icon: shallowRef(DashboardIcon),
      orderNo: 0,
    },
    children: [
      {
        path: 'base',
        name: 'DashboardBase',
        component: DashboardBasePage,
        meta: {
          title: '概览仪表盘',
        },
      },
      {
        path: 'detail',
        name: 'DashboardDetail',
        component: DashboardDetailPage,
        meta: {
          title: '统计报表',
        },
      },
    ],
  },
  {
    path: '/result',
    name: 'result',
    component: Layout,
    redirect: '/result/success',
    meta: { title: '结果页', icon: shallowRef(CheckCircleIcon) },
    children: [
      {
        path: 'success',
        name: 'ResultSuccess',
        component: ResultSuccessPage,
        meta: { title: '成功页' },
      },
      {
        path: 'fail',
        name: 'ResultFail',
        component: ResultFailPage,
        meta: { title: '失败页' },
      },
      {
        path: 'network-error',
        name: 'ResultNetworkError',
        component: ResultNetworkErrorPage,
        meta: { title: '网络异常' },
      },
      {
        path: '403',
        name: 'Result403',
        component: Result403Page,
        meta: { title: '无权限' },
      },
      {
        path: '404',
        name: 'Result404',
        component: Result404Page,
        meta: { title: '访问页面不存在页' },
      },
      {
        path: '500',
        name: 'Result500',
        component: Result500Page,
        meta: { title: '服务器出错页' },
      },
      {
        path: 'browser-incompatible',
        name: 'ResultBrowserIncompatible',
        component: ResultBrowserIncompatiblePage,
        meta: { title: '浏览器不兼容页' },
      },
      {
        path: 'maintenance',
        name: 'ResultMaintenance',
        component: ResultMaintenancePage,
        meta: { title: '系统维护页' },
      },
    ],
  },{
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/index',
    meta: { title: '个人页', icon: shallowRef(UserCircleIcon) },
    children: [
      {
        path: 'index',
        name: 'UserIndex',
        component: UserIndexPage,
        meta: { title: '个人中心' },
      },
    ],
  },
  {
    path: '/loginRedirect',
    name: 'loginRedirect',
    redirect: '/login',
    meta: { title: '登录页', icon: shallowRef(LogoutIcon) },
    children: [
      {
        path: 'index',
        redirect: '/login',
        meta: { title: '登录中心' },
      },
    ],
  }
]

export default menuList
