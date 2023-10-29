import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils';
import { FullMove, FullPokemon } from '@/types/Pokemon';

export const usePokemonInfo = (link: string = '906') => {
  const { data, status, ...rest } = useQuery<FullPokemon>([`pokemon:${link}`], () =>
    api<FullPokemon>(`/data/pm/${link}.json`)
  );

  return {
    status,
    data: data as FullPokemon,
    ...rest,
  };
};

export const useMoveInfo = (name: string) => {
  const { data, status, ...rest } = useQuery<FullMove>([`move:${name}`], () =>
    api<FullMove>(`/data/move/${name}.json`)
  );

  return {
    status,
    data: data as FullMove,
    ...rest,
  };
};
