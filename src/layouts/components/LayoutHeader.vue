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
import menuList from "@/router/menu";

import LHeader from "./Header.vue";
import type { MenuRoute } from "@/types/interface";

const menuRouters = ref(menuList);
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
