import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils';
import { Move } from '@/types/Pokemon';

export const useMoveListInfo = () => {
  const { data, status, ...rest } = useQuery<Move[]>(['move'], () =>
    api<Move[]>(`/data/move_list_300.json`)
  );

  return {
    status,
    data: data ?? [],
    ...rest,
  };
};
