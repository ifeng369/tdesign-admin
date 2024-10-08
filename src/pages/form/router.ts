import Layout from "@/layouts/index.vue";
import { Edit1Icon } from "tdesign-icons-vue-next";
import { RouteRecordRaw } from "vue-router";


import FormBasePage from "./base/index.vue";
import FormStepPage from "./step/index.vue";


const router: RouteRecordRaw = 

{
      path: "/form",
      component: Layout,
      redirect: "/form/base",
      name: "form",
      meta: {
        title: "表单页",
        icon: shallowRef(Edit1Icon),
        orderNo: 2,
      },
      children: [
        {
          path: "base",
          name: FormBasePage.name,
          component: FormBasePage,
          meta: {
            title: "基础表单页",
          },
        },
        {
          path: "step",
          name: FormStepPage.name,
          component: FormStepPage,
          meta: {
            title: "分步表单页",
          },
        },
      ],
    }

export default router;
  