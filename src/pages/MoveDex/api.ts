import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils';
import { Move } from '@/types/Pokemon';

export type MoveType = Move & { TMPid: number | null };

export const useMoveListInfo = () => {
  const { data, status, ...rest } = useQuery<MoveType[]>(['move'], () =>
    api<MoveType[]>(`/data/move_list_300.json`)
  );

  return {
    status,
    data: data ?? [],
    ...rest,
  };
};
