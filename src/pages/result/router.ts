import Layout from "@/layouts/index.vue";

import { CheckCircleIcon } from "tdesign-icons-vue-next";

import ResultSuccessPage from "@/pages/result/success/index.vue";
import ResultFailPage from "@/pages/result/fail/index.vue";
import ResultNetworkErrorPage from "@/pages/result/network-error/index.vue";
import Result403Page from "@/pages/result/403/index.vue"; 
import Result404Page from "@/pages/result/404/index.vue";
import Result500Page from "@/pages/result/500/index.vue";
import ResultBrowserIncompatiblePage from "@/pages/result/browser-incompatible/index.vue";
import ResultMaintenancePage from "@/pages/result/maintenance/index.vue"; 
import { RouteRecordRaw } from "vue-router";


const router: RouteRecordRaw =
   {
      path: "/result",
      name: "result",
      component: Layout,
      redirect: "/result/success",
      meta: { title: "结果页", icon: shallowRef(CheckCircleIcon) },
      children: [
        {
          path: "success",
          name: ResultSuccessPage.name,
          component: ResultSuccessPage,
          meta: { title: "成功页" },
        },
        {
          path: "fail",
          name: ResultFailPage.name,

          component: ResultFailPage,
          meta: { title: "失败页" },
        },
        {
          path: "network-error",
          name: ResultNetworkErrorPage.name,
          component: ResultNetworkErrorPage,
          meta: { title: "网络异常" },
        },
        {
          path: "403",
          name: Result403Page.name,
          component: Result403Page,
          meta: { title: "无权限" },
        },
        {
          path: "404",
          name: Result404Page.name,
          component: Result404Page,
          meta: { title: "访问页面不存在页" },
        },
        {
          path: "500",
          name: Result500Page.name,
          component: Result500Page,
          meta: { title: "服务器出错页" },
        },
        {
          path: "browser-incompatible",
          name: ResultBrowserIncompatiblePage.name,
          component: ResultBrowserIncompatiblePage,
          meta: { title: "浏览器不兼容页" },
        },
        {
          path: "maintenance",
          name:  ResultMaintenancePage.name,
          component: ResultMaintenancePage,
          meta: { title: "系统维护页" },
        },
      ],
    }

export default router;