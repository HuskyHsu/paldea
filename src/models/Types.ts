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

export const TYPE_MAP = Object.keys(TypeMap);

export interface TypeShow {
  [propName: string]: boolean;
}
