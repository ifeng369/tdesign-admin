import Layout from "@/layouts/index.vue";
import Page from "./index.vue";
import { UserSettingIcon } from "tdesign-icons-vue-next";
import { RouteRecordRaw } from "vue-router";
import { shallowRef } from "vue";



const router: RouteRecordRaw ={
    path: "/user",
    name: "user",
    component: Layout,
    redirect: "/user/index",
    meta: { title: "个人页", icon: shallowRef(UserSettingIcon) , orderNo: 0},
    children: [
      {
        path: "index",
        name: Page.name,
        component: Page,
        meta: { title: "个人中心" },
      },
    ],
  }



export default router;