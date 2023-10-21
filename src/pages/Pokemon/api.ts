import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils';
import { FullPokemon } from '@/types/Pokemon';

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
