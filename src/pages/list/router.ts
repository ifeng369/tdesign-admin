import Layout from "@/layouts/index.vue";
import Page from "./index.vue";
import { ViewListIcon } from "tdesign-icons-vue-next";

import ListBasePage from "./base/index.vue";
import ListCardPage from "./card/index.vue";
import ListFilterPage from "./filter/index.vue";
import ListTreePage from "./tree/index.vue";
import { RouteRecordRaw } from "vue-router";


const router: RouteRecordRaw = {
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
}


export default router;
  