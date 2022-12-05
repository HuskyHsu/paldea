import create from 'zustand';
import { combine, devtools, NamedSet } from 'zustand/middleware';
import pokemonList from '@/data/base_list.json';
import { BasePokemon, TypeMap, TypeShow, TYPE_MAP } from '@/models';

type FilterAction = {
  actions: {
    targetType: (type: string) => void;
    updateKeyword: (keyword: string) => void;
  };
};

type FilterObject = {
  types: TypeShow;
  keyword: string;
};

interface FilterState extends FilterObject {
  pokemonList: BasePokemon[];
}

const allOn = TYPE_MAP.reduce((acc, cur) => {
  acc[cur] = true;
  return acc;
}, {} as TypeShow);

const allOff = TYPE_MAP.reduce((acc, cur) => {
  acc[cur] = false;
  return acc;
}, {} as TypeShow);

const genTargetType = (types: TypeShow, type: string) => {
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

const isDisplay = (pm: BasePokemon, { keyword, types }: FilterObject) => {
  let oldDisplay = pm.display;

  let newDisplay = pm.types.some((type) => types[type]);

  if (keyword) {
    if (newDisplay) {
      newDisplay =
        pm.paldeaId.toString().includes(keyword) ||
        pm.nameZh.includes(keyword) ||
        pm.nameJp.includes(keyword) ||
        pm.nameEn.includes(keyword) ||
        pm.abilities.some((ability) => ability.includes(keyword)) ||
        (pm.hiddenAbility ? pm.hiddenAbility?.includes(keyword) : false);
    }
  }

  if (oldDisplay !== newDisplay) {
    return { ...pm, display: newDisplay };
  }

  return pm;
};

const newPokemonList = pokemonList.map<BasePokemon>((pm) => {
  return {
    ...pm,
    display: true,
  };
});

const state = {
  pokemonList: newPokemonList,
  types: allOn,
  keyword: '',
};

const actions = (set: NamedSet<FilterState>): FilterAction => ({
  actions: {
    targetType: (type) =>
      set((state) => {
        state.types = genTargetType(state.types, type);

        return {
          types: state.types,
          pokemonList: state.pokemonList.map((pm) =>
            isDisplay(pm, { types: state.types, keyword: state.keyword })
          ),
        };
      }),
    updateKeyword: (keyword) =>
      set((state) => {
        return {
          keyword: keyword,
          pokemonList: state.pokemonList.map((pm) =>
            isDisplay(pm, { types: state.types, keyword: keyword })
          ),
        };
      }),
  },
});

const store = combine<FilterState, FilterAction>(state, actions);
export const useFilterStore = create(devtools(store, { name: 'Paldea filter' }));
export const useFilterActions = () => useFilterStore((state) => state.actions);
