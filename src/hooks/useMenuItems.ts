import useSWR from "swr";
import { menuItemApi } from "@/lib/api";
import { MenuItem } from "@/types/menuItems";

export function useMenuItems() {
  const { data, error, isLoading, mutate } = useSWR("/api/menu-items", menuItemApi.getAll);
  return {
    menuItems: data as MenuItem[] | undefined,
    isLoading,
    error,
    mutate,
  };
} 