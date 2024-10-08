import Layout from "@/layouts/index.vue";
import { LayersIcon } from "tdesign-icons-vue-next";
import { RouteRecordRaw } from "vue-router";


import DetailBasePage from "./base/index.vue";
import DetailAdvancedPage from "./advanced/index.vue";
import DetailDeployPage from "./deploy/index.vue";
import DetailSecondaryPage from "./secondary/index.vue";


const router: RouteRecordRaw = 
  {
    path: "/detail",
    component: Layout,
    redirect: "/detail/base",
    name: "detail",
    meta: {
      title: "详情页",
      icon: shallowRef(LayersIcon),
      orderNo: 1,
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
  }

export default router;
  