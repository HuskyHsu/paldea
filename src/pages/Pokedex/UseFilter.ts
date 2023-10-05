import { useEffect, useMemo, useState } from 'react';

import { Filter, BoolKeys, ValueKeys } from './Pokedex';

export function UseFilter() {
  const params = document.location.href.split('?');
  const searchParams = useMemo(() => {
    return new URLSearchParams(params.length > 1 ? params[1] : '');
  }, [params]);

  const [filter, setFilter] = useState<Filter>({
    keyword: searchParams.get('keyword') || '',
    types: new Set<string>(),
    pokedex: searchParams.get('pokedex') || 'kitakami',
    displayFilter: false,
    page: Number(searchParams.get('page') || 1),
  });

  useEffect(() => {
    if (filter.keyword !== '') {
      searchParams.set('keyword', filter.keyword);
      searchParams.delete('page');
    } else {
      searchParams.delete('keyword');
    }

    if (filter.pokedex !== '') {
      searchParams.set('pokedex', filter.pokedex);
      searchParams.delete('page');
    } else {
      searchParams.delete('pokedex');
    }

    if (filter.page !== 1) {
      searchParams.set('page', String(filter.page));
    } else {
      searchParams.delete('page');
    }

    window.location.href = document.location.href.split('?')[0] + '?' + searchParams.toString();
  }, [filter, searchParams]);

  const toggleState = (key: BoolKeys<Filter>[keyof Filter]) => {
    return (bool: boolean) => {
      setFilter((prev) => {
        const newPrev = {
          ...prev,
          [key]: bool,
        };

        return newPrev;
      });
    };
  };

  const updateState = (key: ValueKeys<Filter, string>[keyof Filter]) => {
    return (val: string) => {
      setFilter((prev) => {
        const newPrev = {
          ...prev,
          [key]: val,
          page: 1,
        };

        return newPrev;
      });
    };
  };

  const updateNumberState = (
    key: ValueKeys<Filter, number>[keyof Filter],
    fn: (val: number) => number
  ) => {
    setFilter((prev) => {
      const newPrev = {
        ...prev,
        [key]: fn(prev[key]),
      };

      return newPrev;
    });
  };

  return {
    filter,
    toggleState,
    updateState,
    updateNumberState,
  };
}
