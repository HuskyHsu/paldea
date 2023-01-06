import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils';
import { Move } from '@/models';

export const useMove = (name: string) => {
  const { data, status, ...rest } = useQuery<Move>([`move:${name}`], () =>
    api<Move>(`/data/relation/moves/${name}.json`)
  );

  return {
    status,
    data: data ?? {
      nameZh: '',
      type: 'Normal',
      category: '',
      power: 0,
      accuracy: 100,
      PP: 0,
      description: '',
      eggPokemons: [],
      levelingUps: [],
      technicalMachine: null,
    },
    ...rest,
  };
};
