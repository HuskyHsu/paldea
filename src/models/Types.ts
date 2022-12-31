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

export const TYPE_MAP = Object.keys(TypeMap);

export const allOn = TYPE_MAP.reduce((acc, cur) => {
  acc[cur] = true;
  return acc;
}, {} as TypeShow);
export interface TypeShow {
  [propName: string]: boolean;
}
