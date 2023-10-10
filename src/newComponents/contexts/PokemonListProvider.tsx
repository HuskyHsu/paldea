import { PropsWithChildren, createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import { api } from '@/utils';
import { Pokemon } from '@/types/Pokemon';

type PokemonType = {
  pokemonList: Pokemon[];
};

const PokemonListContext = createContext<PokemonType>({
  pokemonList: [] as Pokemon[],
});

const usePokemonList = () => {
  const fetchUserData = () => api<Pokemon[]>(`/data/base_list_201.json`);

  const { data, status, ...rest } = useQuery<Pokemon[]>(['pmList_201_v1'], fetchUserData);

  return {
    status,
    data: data ?? [],
    ...rest,
  };
};

export const PokemonListProvider = ({ children }: PropsWithChildren) => {
  let { data } = usePokemonList();

  return (
    <PokemonListContext.Provider value={{ pokemonList: data }}>
      {children}
    </PokemonListContext.Provider>
  );
};

export const usePokemonListContext = () => useContext(PokemonListContext);
