import create from "zustand";
import { TypeMap, TypeShow } from "../models";

interface Filter {
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

export const useFilterStore = create<Filter>((set) => ({
  types: allOn,
  keyword: "",
  targetType: (type: keyof TypeMap) =>
    set((state) => (state.types = targetType(state.types, type))),
  updateKeyword: (keyword: string) => set(() => ({ keyword })),
}));
