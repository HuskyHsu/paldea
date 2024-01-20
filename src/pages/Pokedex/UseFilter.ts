import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { BoolKeys, ValueKeys } from '@/utils';
import { PokedexFrom } from '@/types/Pokemon';
import { getJsonCache } from '@/store';

import { Filter, Display } from './Pokedex';

const localStorageKey = 'pokeDexPage';

export function UseFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [display, setDisplay] = useState<Display>({
    advancedFilter: false,
    EVs: false,
    ability: false,
    pid: false,
  });

  let cacheObj = getJsonCache(localStorageKey);

  const filter: Filter = {
    keyword: searchParams.get('keyword') || '',
    pokedex: (searchParams.get('pokedex') || 'national') as PokedexFrom | 'home' | 'national',
    page: Number(searchParams.get('page') || 1),
    types: new Set((searchParams.get('types') || '').split('-').filter(Boolean)),
    ability: searchParams.get('ability') || '',
    EV: searchParams.get('EV') || '',
    tags: new Set((searchParams.get('tags') || '').split('-').filter(Boolean)),
    onlyEvolution: searchParams.get('onlyEvolution') || '',
  };

  const updateState = (key: ValueKeys<Filter, string>[keyof Filter]) => {
    return (val: string) => {
      if (val === '') {
        setSearchParams((prev) => {
          prev.delete(key);
          delete cacheObj[key as keyof typeof cacheObj];

          localStorage.setItem(localStorageKey, JSON.stringify(cacheObj));
          return prev;
        });
      } else {
        setSearchParams((prev) => {
          if (prev.has(key) && prev.get(key) === val) {
            prev.delete(key);
            delete cacheObj[key as keyof typeof cacheObj];
          } else {
            prev.set(key, val);
            cacheObj[key as keyof typeof cacheObj] = val;
          }
          prev.delete('page');
          delete cacheObj['page'];

          localStorage.setItem(localStorageKey, JSON.stringify(cacheObj));
          return prev;
        });
      }
    };
  };

  const updateSetState = (key: ValueKeys<Filter, Set<string>>[keyof Filter]) => {
    return (val: string) => {
      setSearchParams((prev) => {
        const vals = new Set((prev.get(key) || '').split('-').filter(Boolean));
        if (vals.has(val)) {
          vals.delete(val);
        } else {
          vals.add(val);
        }

        if (vals.size === 0) {
          prev.delete(key);
          delete cacheObj[key as keyof typeof cacheObj];
        } else {
          prev.set(key, [...vals].join('-'));
          cacheObj[key as keyof typeof cacheObj] = [...vals].join('-');
        }

        prev.delete('page');
        delete cacheObj['page'];

        localStorage.setItem(localStorageKey, JSON.stringify(cacheObj));
        return prev;
      });
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

  const toggleDisplay = (key: BoolKeys<Display>[keyof Display]) => {
    return (bool: boolean) => {
      setDisplay((prev) => {
        const newDisplay = {
          ...prev,
          [key]: bool,
        };
        return newDisplay;
      });
    };
  };

  useEffect(() => {
    const cacheObj: Record<string, string> = {};
    searchParams.forEach((val, key) => {
      cacheObj[key] = val;
    });

    if (Object.keys(cacheObj).length > 0) {
      localStorage.setItem(localStorageKey, JSON.stringify(cacheObj));
    }
  }, [searchParams]);

  return {
    filter,
    updateState,
    updateNumberState,
    updateSetState,

    display,
    toggleDisplay,
  };
}
