import create from 'zustand';

import { BasePokemon, TypeMap, TypeShow } from '../models';
import pokemonList from '../data/base_list.json';

interface Filter {
  pokemonList: BasePokemon[];
  types: TypeShow;
  keyword: string;
  targetType: Function;
}

const allOn = Object.keys(TypeMap).reduce((acc, cur) => {
  acc[cur] = true;
  return acc;
}, {} as TypeShow);

const allOff = Object.keys(TypeMap).reduce((acc, cur) => {
  acc[cur] = false;
  return acc;
}, {} as TypeShow);

const targetType = (types: TypeShow, type: keyof TypeMap) => {
  const isAllShow = Object.values(types).every(Boolean);
  if (isAllShow) {
    return {
      ...allOff,
      [type]: true,
    };
  }

  const isOnlyOne = Object.values(types).filter(Boolean).length === 1;
  if (isOnlyOne && types[type as keyof typeof TypeMap]) {
    return allOn;
  }

  return {
    ...types,
    [type]: !types[type as keyof typeof TypeMap],
  };
};

const isDisplay = (pm: BasePokemon, types: TypeShow) => {
  let display = pm.types.some((type) => types[type]);
  if (pm.display !== display) {
    return { ...pm, display: display };
  }

  return pm;
};

const newPokemonList = pokemonList.map((pm) => {
  return {
    ...pm,
    display: true,
  };
});

export const useFilterStore = create<Filter>()((set) => ({
  pokemonList: newPokemonList,
  types: allOn,
  keyword: '',
  targetType: (type: keyof TypeMap) =>
    set((state) => {
      state.types = targetType(state.types, type);

      return {
        types: state.types,
        pokemonList: state.pokemonList.map((pm) => isDisplay(pm, state.types)),
      };
    }),
  updateKeyword: (keyword: string) => set(() => ({ keyword })),
}));
