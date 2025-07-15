import useSWR from "swr";
import { faqApi } from "@/lib/api";
import { FAQ } from "@/lib/api";

export function useFaqs() {
  const { data, error, isLoading, mutate } = useSWR("/api/faqs", faqApi.getAll);
  return {
    faqs: data as FAQ[] | undefined,
    isLoading,
    error,
    mutate,
  };
} 