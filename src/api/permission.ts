import type { MenuListResult } from "@/api/model/permissionModel";
import { request } from "@/utils/request";

const Api = {
  MenuList: "/get-menu-list",
};

export function getMenuList() {
  return request.get<MenuListResult>({
    url: Api.MenuList,
  });
}
