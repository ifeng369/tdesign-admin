<template>
  <l-header
    :show-logo="settingStore.showHeaderLogo"
    :theme="settingStore.displayMode"
    :layout="settingStore.layout"
    :is-fixed="settingStore.isHeaderFixed"
    :menu="headerMenu"
    :is-compact="settingStore.isSidebarCompact"
  />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { useSettingStore } from "@/store";
import {pageRouterList} from "@/router";
import LHeader from "./Header.vue";
import type { MenuRoute } from "@/types/interface";

const menuRouters = ref(pageRouterList);
const settingStore = useSettingStore();
const headerMenu = computed(() => {
  let newMenuRouters = menuRouters.value as Array<MenuRoute>;
  if (settingStore.layout === "mix") {
    if (settingStore.splitMenu) {
      return newMenuRouters.map((menu) => ({
        ...menu,
        children: [],
      }));
    }
    return [];
  }
  return newMenuRouters;
});
</script>
