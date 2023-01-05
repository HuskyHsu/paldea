import { useQueries, useQuery } from '@tanstack/react-query';

const HOST = process.env.PUBLIC_URL;

export async function api<T>(url: string): Promise<T> {
  const response = await fetch(`${HOST}${url}`);
  const data = await response.json();
  return data as T;
}

export function useApi<T>({
  queryKey,
  path,
  initialData,
}: {
  queryKey: string;
  path: string;
  initialData: T;
}) {
  const query = useQuery({
    queryKey: [queryKey],
    queryFn: () => api<T>(path),
    initialData: initialData as T,
    enabled: true,
    refetchInterval: false,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
}

export function useMultApi<T>({
  queryKey,
  paths,
  initialData,
}: {
  queryKey: string;
  paths: string[];
  initialData: T;
}) {
  const queries = useQueries({
    queries: paths.map((path) => {
      return {
        queryKey: [queryKey, path],
        queryFn: () => api<T>(path),
        initialData: { ...initialData } as T,
        enabled: true,
        // refetchInterval: false,
        // refetchOnMount: 'always',
        // refetchOnWindowFocus: false,
        // refetchOnReconnect: false,
      };
    }),
  });
  return queries;
}
