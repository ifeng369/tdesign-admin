import _ from "lodash";
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

import login from "@/pages/login/index.vue";
import Result404Page from "@/pages/result/404/index.vue";
import NProgress from "nprogress"; // progress bar
import { useUserStore } from "@/store";
import { MessagePlugin } from "tdesign-vue-next";


// 导入pages路由
const pageModules = import.meta.glob('@/pages/**/router.ts', { eager: true });
export const pageRouterList: Array<RouteRecordRaw> = mapModuleRouterList(pageModules);
const homeUrl = pageRouterList.find(s => s.meta.ishome)?.redirect ?? pageRouterList.flatMap(s => s.children).find(s => s.meta.ishome) ?? pageRouterList[0].redirect;

// 其他固定路由
const defaultRouterList: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/",
    redirect: homeUrl,
  },
  {
    path: "/:w+",
    component: Result404Page,
  },
];


export const allRoutes = [...pageRouterList, ...defaultRouterList];

//固定路由模块转换为路由
export function mapModuleRouterList(modules: Record<string, unknown>): Array<RouteRecordRaw> {
  const routerList: Array<RouteRecordRaw> = [];
  Object.keys(modules).forEach((key) => {
    // @ts-ignore
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routerList.push(...modList);
  });
  routerList.forEach(s=>s.meta.orderNo = s.meta.orderNo?? 9999)

  return routerList;
}

export const getActive = (maxLevel = 3): string => {
  // 非组件内调用必须通过Router实例获取当前路由
  const route = router.currentRoute.value;
  if (!route.path) {
    return "";
  }

  return route.path
    .split("/")
    .filter((_item: string, index: number) => index <= maxLevel && index > 0)
    .map((item: string) => `/${item}`)
    .join("");
};

const router = createRouter({
  // history: env === "github"? createWebHashHistory() : createWebHistory(import.meta.env.VITE_BASE_URL),
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: allRoutes,
  scrollBehavior() {
    return {
      el: "#app",
      top: 0,
      behavior: "smooth",
    };
  },
});



const whiteListRouters = ["/login"];

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const userStore = useUserStore();

  if (userStore.token) {
    if (to.path === "/login") {
      next();
      return;
    }
    try {
      await userStore.getUserInfo();
      if (router.hasRoute(to.name)) {
        next();
      } else {
        next(`/`);
      }
    } catch (error) {
      MessagePlugin.error(error.message);
      next({
        path: "/login",
        query: { redirect: encodeURIComponent(to.fullPath) },
      });
      NProgress.done();
    }
  } else {
    /* white list router */
    if (whiteListRouters.indexOf(to.path) !== -1) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: encodeURIComponent(to.fullPath) },
      });
    }
    NProgress.done();
  }
});

router.afterEach((to) => {
  if (to.path === "/login") {
    const userStore = useUserStore();
    userStore.logout();
  }
  NProgress.done();
});


export default router;
