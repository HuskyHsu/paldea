import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils';
import { PMSourceMove } from '@/models';

export const usePokemonInfo = (link: string = '906') => {
  const { data, status, ...rest } = useQuery<PMSourceMove>([`pm:${link}`], () =>
    api<PMSourceMove>(`/data/pokemon/${link}.json`)
  );

  return {
    status,
    data: data ?? {
      eggMoves: [],
      levelingUps: [],
      technicalMachines: [],
    },
    ...rest,
  };
};
