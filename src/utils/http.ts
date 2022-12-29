import { useQuery } from '@tanstack/react-query';

const HOST = process.env.PUBLIC_URL;

export async function api<T>(url: string): Promise<T> {
  const response = await fetch(`${HOST}${url}`);
  const data = await response.json();
  return data as T;
}

export function useApi<T>({ queryKey, path }: { queryKey: string; path: string }) {
  const query = useQuery({
    queryKey: [queryKey],
    queryFn: () => api<T>(path),
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
}
