import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils';
import { Pokemon } from '@/types/Pokemon';

export const usePokemonList = () => {
  const fetchUserData = () => api<Pokemon[]>(`/data/base_list_201.json`);

  const { data, status, ...rest } = useQuery<Pokemon[]>(['pmList_201_v1'], fetchUserData);

  return {
    status,
    data: data ?? [],
    ...rest,
  };
};
