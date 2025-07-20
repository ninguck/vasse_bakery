import useSWR from 'swr'
import { miscContentApi, MiscContent } from '@/lib/api'

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useMiscContent(section?: string) {
  const { data, error, isLoading, mutate } = useSWR<MiscContent[]>(
    section ? `/api/misc-content?section=${encodeURIComponent(section)}` : '/api/misc-content',
    fetcher
  )

  return {
    miscContent: data || [],
    isLoading,
    error,
    mutate
  }
}

export function useMiscContentById(id: string) {
  const { data, error, isLoading, mutate } = useSWR<MiscContent>(
    id ? `/api/misc-content/${id}` : null,
    fetcher
  )

  return {
    miscContent: data,
    isLoading,
    error,
    mutate
  }
} 