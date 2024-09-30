import {
  DashboardIcon,
  LogoutIcon,
  CheckCircleIcon,
  UserCircleIcon,
  ViewListIcon,
  Edit1Icon,
  LayersIcon,
  InternetIcon,
  UserSettingIcon,
} from "tdesign-icons-vue-next";
import { RouteRecordRaw } from "vue-router";
import { shallowRef } from "vue";

import Layout from "@/layouts/index.vue";
import IFrame from "@/layouts/components/FrameBlank.vue";

import DashboardBasePage from "@/pages/dashboard/base/index.vue";
import DashboardDetailPage from "@/pages/dashboard/detail/index.vue";
import ResultSuccessPage from "@/pages/result/success/index.vue";
import ResultFailPage from "@/pages/result/fail/index.vue";
import ResultNetworkErrorPage from "@/pages/result/network-error/index.vue";
import Result403Page from "@/pages/result/403/index.vue";
import Result404Page from "@/pages/result/404/index.vue";
import Result500Page from "@/pages/result/500/index.vue";
import ResultBrowserIncompatiblePage from "@/pages/result/browser-incompatible/index.vue";
import ResultMaintenancePage from "@/pages/result/maintenance/index.vue";
import UserIndexPage from "@/pages/user/index.vue";

import ListBasePage from "@/pages/list/base/index.vue";
import ListCardPage from "@/pages/list/card/index.vue";
import ListFilterPage from "@/pages/list/filter/index.vue";
import ListTreePage from "@/pages/list/tree/index.vue";
import FormBasePage from "@/pages/form/base/index.vue";
import FormStepPage from "@/pages/form/step/index.vue";
import DetailBasePage from "@/pages/detail/base/index.vue";
import DetailAdvancedPage from "@/pages/detail/advanced/index.vue";
import DetailDeployPage from "@/pages/detail/deploy/index.vue";
import DetailSecondaryPage from "@/pages/detail/secondary/index.vue";

const menuList: Array<RouteRecordRaw> = [
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
  },

  {
    path: "/list",
    component: Layout,
    redirect: "/list/base",
    name: "list",
    meta: {
      title: "列表页",
      icon: shallowRef(ViewListIcon),
      orderNo: 0,
    },
    children: [
      {
        path: "base",
        name: "ListBase",
        component: ListBasePage,
        meta: {
          title: "基础列表页",
        },
      },
      {
        path: "card",
        name: "ListCard",
        component: ListCardPage,
        meta: {
          title: "卡片列表页",
        },
      },
      {
        path: "filter",
        name: "ListFilter",
        component: ListFilterPage,
        meta: {
          title: "筛选列表页",
        },
      },
      {
        path: "tree",
        name: "ListTree",
        component: ListTreePage,
        meta: {
          title: "树状筛选列表页",
        },
      },
    ],
  },

  {
    path: "/form",
    component: Layout,
    redirect: "/form/base",
    name: "form",
    meta: {
      title: "表单页",
      icon: shallowRef(Edit1Icon),
      orderNo: 0,
    },
    children: [
      {
        path: "base",
        name: "FormBase",
        component: FormBasePage,
        meta: {
          title: "基础表单页",
        },
      },
      {
        path: "step",
        name: "FormStep",
        component: FormStepPage,
        meta: {
          title: "分步表单页",
        },
      },
    ],
  },
  {
    path: "/detail",
    component: Layout,
    redirect: "/detail/base",
    name: "detail",
    meta: {
      title: "详情页",
      icon: shallowRef(LayersIcon),
      orderNo: 0,
    },
    children: [
      {
        path: "base",
        name: "DetailBase",
        component: DetailBasePage,
        meta: {
          title: "基础详情页",
        },
      },
      {
        path: "advanced",
        name: "DetailAdvanced",
        component: DetailAdvancedPage,
        meta: {
          title: "多卡片详情页",
        },
      },
      {
        path: "deploy",
        name: "DetailDeploy",
        component: DetailDeployPage,
        meta: {
          title: "数据详情页",
        },
      },
      {
        path: "secondary",
        name: "DetailSecondary",
        component: DetailSecondaryPage,
        meta: {
          title: "二级详情页",
        },
      },
    ],
  },

  {
    path: "/frame",
    component: Layout,
    redirect: "/frame/doc",
    name: "frame",
    meta: {
      title: "外部页面",
      icon: shallowRef(InternetIcon),
      orderNo: 0,
    },
    children: [
      {
        path: "doc",
        name: "Doc",
        component: IFrame,
        meta: {
          title: "使用文档（内嵌）",
          frameSrc:
            "https://tdesign.tencent.com/starter/docs/vue-next/get-started",
        },
      },
      {
        path: "TDesign",
        name: "TDesign",
        component: IFrame,
        meta: {
          title: "TDesign 文档（内嵌）",
          frameSrc: "https://tdesign.tencent.com/vue-next/getting-started",
        },
      },
      {
        path: "TDesign2",
        name: "TDesign2",
        component: IFrame,
        meta: {
          frameSrc: "https://tdesign.tencent.com/vue-next/getting-started",
          frameBlank: true,
          title: "TDesign 文档（外链）",
        },
      },
    ],
  },
  {
    path: "/result",
    name: "result",
    component: Layout,
    redirect: "/result/success",
    meta: { title: "结果页", icon: shallowRef(CheckCircleIcon) },
    children: [
      {
        path: "success",
        name: "ResultSuccess",
        component: ResultSuccessPage,
        meta: { title: "成功页" },
      },
      {
        path: "fail",
        name: "ResultFail",
        component: ResultFailPage,
        meta: { title: "失败页" },
      },
      {
        path: "network-error",
        name: "ResultNetworkError",
        component: ResultNetworkErrorPage,
        meta: { title: "网络异常" },
      },
      {
        path: "403",
        name: "Result403",
        component: Result403Page,
        meta: { title: "无权限" },
      },
      {
        path: "404",
        name: "Result404",
        component: Result404Page,
        meta: { title: "访问页面不存在页" },
      },
      {
        path: "500",
        name: "Result500",
        component: Result500Page,
        meta: { title: "服务器出错页" },
      },
      {
        path: "browser-incompatible",
        name: "ResultBrowserIncompatible",
        component: ResultBrowserIncompatiblePage,
        meta: { title: "浏览器不兼容页" },
      },
      {
        path: "maintenance",
        name: "ResultMaintenance",
        component: ResultMaintenancePage,
        meta: { title: "系统维护页" },
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: Layout,
    redirect: "/user/index",
    meta: { title: "个人页", icon: shallowRef(UserSettingIcon) },
    children: [
      {
        path: "index",
        name: "UserIndex",
        component: UserIndexPage,
        meta: { title: "个人中心" },
      },
    ],
  },
  {
    path: "/loginRedirect",
    name: "loginRedirect",
    redirect: "/login",
    meta: { title: "登录页", icon: shallowRef(LogoutIcon) },
    children: [
      {
        path: "index",
        redirect: "/login",
        meta: { title: "登录中心" },
      },
    ],
  },
];

export default menuList;
