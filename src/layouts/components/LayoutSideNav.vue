<template>
  <l-side-nav
    v-if="settingStore.showSidebar"
    :show-logo="settingStore.showSidebarLogo"
    :layout="settingStore.layout"
    :is-fixed="settingStore.isSidebarFixed"
    :menu="sideMenu"
    :theme="settingStore.displaySideMode"
    :is-compact="settingStore.isSidebarCompact"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import { useSettingStore } from "@/store";
import type { MenuRoute } from "@/types/interface";
import {pageRouterList} from "@/router";

import LSideNav from "./SideNav.vue";

const route = useRoute();
const settingStore = useSettingStore();
const menuRouters = ref(pageRouterList);

const sideMenu = computed(() => {
  const { layout, splitMenu } = settingStore;
  let newMenuRouters = menuRouters.value as Array<MenuRoute>;
  if (layout === "mix" && splitMenu) {
    newMenuRouters.forEach((menu) => {
      if (route.path.indexOf(menu.path) === 0) {
        newMenuRouters = menu.children.map((subMenu) => ({
          ...subMenu,
          path: `${menu.path}/${subMenu.path}`,
        }));
      }
    });
  }
  return newMenuRouters;
});
</script>
