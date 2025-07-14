import useSWR from "swr";
import { productApi } from "@/lib/api";
import { Product } from "@/types/products";

export function useProducts() {
    const { data, error, isLoading, mutate } = useSWR("/api/products", productApi.getAll);
    return {
        products: data as Product[] | undefined,
        isLoading,
        error,
        mutate,
    };
} 