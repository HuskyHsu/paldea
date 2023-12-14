import { Filter } from '@/pages/Pokedex/Pokedex';
import { EVIndex, PokedexFrom, PokedexList, Pokemon } from '@/types/Pokemon';

export function getJsonCache(key: string): Record<string, string> {
  const cacheStr = localStorage.getItem(key);
  let cacheObj = {};
  if (cacheStr !== null) {
    cacheObj = JSON.parse(cacheStr);
  }

  return cacheObj;
}

export function getFilter(cacheObj: Record<string, string>) {
  const filter: Filter = {
    keyword: cacheObj['keyword'] || '',
    pokedex: (cacheObj['pokedex'] || 'paldea') as PokedexFrom | 'home' | 'national',
    page: Number(cacheObj['page'] || 1),
    types: new Set((cacheObj['types'] || '').split('-').filter(Boolean)),
    ability: cacheObj['ability'] || '',
    EV: cacheObj['EV'] || '',
    tags: new Set((cacheObj['tags'] || '').split('-').filter(Boolean)),
  };

  return filter;
}

function filterFn(pm: Pokemon, filter: Filter) {
  let display = true;

  if (filter.keyword !== '') {
    const checkList = [pm.nameZh, pm.nameEn.toLowerCase(), pm.nameJp, pm.altForm || ''];
    const keyword = filter.keyword.toLowerCase();
    display = display && checkList.some((val) => val.includes(keyword));
  }

  if (display && filter.types.size > 0) {
    if (filter.types.size === 1) {
      display = display && pm.types.some((type) => filter.types.has(type));
    } else if (filter.types.size === 2 && pm.types.length === 2) {
      display = display && pm.types.every((type) => filter.types.has(type));
    } else {
      display = false;
    }
  }

  if (display && filter.ability !== '') {
    const checkList = [...pm.abilities, pm.hiddenAbility];
    display = display && checkList.some((ability) => ability === filter.ability);
  }

  if (display && filter.EV !== '') {
    const index = EVIndex[filter.EV as keyof typeof EVIndex];
    display = display && pm.EVs.every((ev, i) => (i === index ? ev > 0 : ev === 0));
  }

  if (display && filter.tags.size > 0) {
    display =
      display && pm.tags.length > 0 && [...filter.tags].every((tab) => pm.tags.includes(tab));
  }

  return display;
}

function filterPokedex(pm: Pokemon, filter: Filter) {
  if (PokedexList.includes(filter.pokedex)) {
    return pm[filter.pokedex as PokedexFrom];
  } else if (filter.pokedex === 'home') {
    return pm.kitakami === null && pm.paldea === null && pm.blueberry === null;
  } else {
    return true;
  }
}

function orderBy(a: Pokemon, b: Pokemon, filter: Filter) {
  if (PokedexList.includes(filter.pokedex)) {
    if ((a[filter.pokedex as PokedexFrom] || 0) - (b[filter.pokedex as PokedexFrom] || 0) !== 0) {
      return (a[filter.pokedex as PokedexFrom] || 0) - (b[filter.pokedex as PokedexFrom] || 0);
    } else {
      return a.link.localeCompare(b.link);
    }
  } else {
    if (a.pid - b.pid !== 0) {
      return a.pid - b.pid;
    } else {
      return a.link.localeCompare(b.link);
    }
  }
}

export function filterPokemonList(
  pokemonList: Pokemon[],
  filter: Filter,
  onlyPokedex: boolean = false
) {
  return pokemonList
    .filter((pm) => onlyPokedex || filterFn(pm, filter))
    .filter((pm) => filterPokedex(pm, filter))
    .sort((a, b) => orderBy(a, b, filter));
}
