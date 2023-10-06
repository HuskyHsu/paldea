import { useSearchParams } from 'react-router-dom';

import { Filter, ValueKeys } from './Pokedex';

export function UseFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter: Filter = {
    keyword: searchParams.get('keyword') || '',
    pokedex: searchParams.get('pokedex') || 'paldea',
    page: Number(searchParams.get('page') || 1),
  };

  //   const toggleState = (key: BoolKeys<Filter>[keyof Filter]) => {
  //     return (bool: boolean) => {
  //       searchParams.set(key, String(bool));
  //     };
  //   };

  const updateState = (key: ValueKeys<Filter, string>[keyof Filter]) => {
    return (val: string) => {
      if (val === '') {
        setSearchParams((prev) => {
          prev.delete(key);
          return prev;
        });
      } else {
        setSearchParams((prev) => {
          prev.set(key, val);
          prev.delete('page');
          return prev;
        });
      }
    };
  };

  const updateNumberState = (
    key: ValueKeys<Filter, number>[keyof Filter],
    fn: (val: number) => number
  ) => {
    setSearchParams((prev) => {
      const val = prev.get(key) || '1';
      const newVal = fn(Number(val));
      prev.set(key, String(newVal));

      return prev;
    });
  };

  return {
    filter,
    // toggleState,
    updateState,
    updateNumberState,
  };
}
