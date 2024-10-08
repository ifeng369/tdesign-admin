import Layout from "@/layouts/index.vue";
import { DashboardIcon } from "tdesign-icons-vue-next";
import { RouteRecordRaw } from "vue-router";


import DashboardBasePage from "./base/index.vue";
import DashboardDetailPage from "./detail/index.vue";


const router: RouteRecordRaw = 
   {
    path: "/dashboard",
    component: Layout,
    redirect: "/dashboard/base",
    name: "dashboard",
    meta: {
      title: "仪表盘",
      icon: shallowRef(DashboardIcon),
      orderNo: 0,
    },
    children: [
      {
        path: "base",
        name: "DashboardBase",
        component: DashboardBasePage,
        meta: {
          title: "概览仪表盘",
          ishome:true
        },
      },
      {
        path: "detail",
        name: "DashboardDetail",
        component: DashboardDetailPage,
        meta: {
          title: "统计报表",
        },
      },
    ],
  }

export default router;
  