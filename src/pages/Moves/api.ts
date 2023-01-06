import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils';
import { BaseMove } from '@/models';

export const useMoveList = () => {
  const { data, status, ...rest } = useQuery<BaseMove[]>(['moves'], () =>
    api<BaseMove[]>('/data/relation/moves.json')
  );

  return {
    status,
    data: data ?? [],
    ...rest,
  };
};
