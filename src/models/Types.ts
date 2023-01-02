export enum TypeMap {
  'Normal' = 'Normal',
  'Grass' = 'Grass',
  'Fire' = 'Fire',
  'Water' = 'Water',
  'Electric' = 'Electric',
  'Bug' = 'Bug',
  'Fairy' = 'Fairy',
  'Fighting' = 'Fighting',
  'Flying' = 'Flying',
  'Ghost' = 'Ghost',
  'Ground' = 'Ground',
  'Rock' = 'Rock',
  'Ice' = 'Ice',
  'Poison' = 'Poison',
  'Psychic' = 'Psychic',
  'Steel' = 'Steel',
  'Dark' = 'Dark',
  'Dragon' = 'Dragon',
}

export enum CategoryMap {
  'Physical' = 'Physical',
  'Special' = 'Special',
  'Status' = 'Status',
}

export enum TypeNameMap {
  'Normal' = '一般',
  'Grass' = '草',
  'Fire' = '火',
  'Water' = '水',
  'Electric' = '電',
  'Bug' = '蟲',
  'Fairy' = '妖精',
  'Fighting' = '格鬥',
  'Flying' = '飛行',
  'Ghost' = '幽靈',
  'Ground' = '地面',
  'Rock' = '岩石',
  'Ice' = '冰',
  'Poison' = '毒',
  'Psychic' = '超能力',
  'Steel' = '鋼',
  'Dark' = '惡',
  'Dragon' = '龍',
}

export enum BgClass {
  'Bug' = 'bg-type-bug',
  'Dark' = 'bg-type-dark',
  'Dragon' = 'bg-type-dragon',
  'Electric' = 'bg-type-electric',
  'Fairy' = 'bg-type-fairy',
  'Fighting' = 'bg-type-fighting',
  'Fire' = 'bg-type-fire',
  'Flying' = 'bg-type-flying',
  'Ghost' = 'bg-type-ghost',
  'Grass' = 'bg-type-grass',
  'Ground' = 'bg-type-ground',
  'Ice' = 'bg-type-ice',
  'Normal' = 'bg-type-normal',
  'Poison' = 'bg-type-poison',
  'Psychic' = 'bg-type-psychic',
  'Rock' = 'bg-type-rock',
  'Steel' = 'bg-type-steel',
  'Water' = 'bg-type-water',
}

export enum BgFromClass {
  'Bug' = 'from-type-bug/60',
  'Dark' = 'from-type-dark/60',
  'Dragon' = 'from-type-dragon/60',
  'Electric' = 'from-type-electric/60',
  'Fairy' = 'from-type-fairy/60',
  'Fighting' = 'from-type-fighting/60',
  'Fire' = 'from-type-fire/60',
  'Flying' = 'from-type-flying/60',
  'Ghost' = 'from-type-ghost/60',
  'Grass' = 'from-type-grass/60',
  'Ground' = 'from-type-ground/60',
  'Ice' = 'from-type-ice/60',
  'Normal' = 'from-type-normal/60',
  'Poison' = 'from-type-poison/60',
  'Psychic' = 'from-type-psychic/60',
  'Rock' = 'from-type-rock/60',
  'Steel' = 'from-type-steel/60',
  'Water' = 'from-type-water/60',
}

export enum BgToClass {
  'Bug' = 'to-type-bug/60',
  'Dark' = 'to-type-dark/60',
  'Dragon' = 'to-type-dragon/60',
  'Electric' = 'to-type-electric/60',
  'Fairy' = 'to-type-fairy/60',
  'Fighting' = 'to-type-fighting/60',
  'Fire' = 'to-type-fire/60',
  'Flying' = 'to-type-flying/60',
  'Ghost' = 'to-type-ghost/60',
  'Grass' = 'to-type-grass/60',
  'Ground' = 'to-type-ground/60',
  'Ice' = 'to-type-ice/60',
  'Normal' = 'to-type-normal/60',
  'Poison' = 'to-type-poison/60',
  'Psychic' = 'to-type-psychic/60',
  'Rock' = 'to-type-rock/60',
  'Steel' = 'to-type-steel/60',
  'Water' = 'to-type-water/60',
}

export enum TypeColor {
  'Bug' = '#A2A329',
  'Dark' = '#4E4646',
  'Dragon' = '#5871BD',
  'Electric' = '#E2BE2A',
  'Fairy' = '#E28EE3',
  'Fighting' = '#E39423',
  'Fire' = '#E5633F',
  'Flying' = '#77AFD4',
  'Ghost' = '#6C456E',
  'Grass' = '#49983A',
  'Ground' = '#A6753B',
  'Ice' = '#4CCBC8',
  'Normal' = '#848383',
  'Poison' = '#9556CB',
  'Psychic' = '#EA708A',
  'Rock' = '#AFA781',
  'Steel' = '#6EB0C7',
  'Water' = '#339DDF',
}

export const TYPE_MAP = Object.keys(TypeMap);

export const allOn = TYPE_MAP.reduce((acc, cur) => {
  acc[cur] = true;
  return acc;
}, {} as TypeShow);

export const allOff = TYPE_MAP.reduce((acc, cur) => {
  acc[cur] = false;
  return acc;
}, {} as TypeShow);

export interface TypeShow {
  [propName: string]: boolean;
}
