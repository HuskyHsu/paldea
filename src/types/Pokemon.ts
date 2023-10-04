export type Pokemon = {
  link: string;
  pid: number;
  paldea: number | null;
  kitakami: number | null;
  nameZh: string;
  altForm: string | null;
  hiddenAbility: string;
  types: string[];
  abilities: string[];
  baseStats: number[];
  baseStats_Total: number;
  EVs: number[];
};

export enum TypeEnum {
  '鋼' = 'Steel',
  '幽靈' = 'Ghost',
  '格鬥' = 'Fighting',
  '毒' = 'Poison',
  '草' = 'Grass',
  '地面' = 'Ground',
  '電' = 'Electric',
  '火' = 'Fire',
  '蟲' = 'Bug',
  '超能力' = 'Psychic',
  '水' = 'Water',
  '飛行' = 'Flying',
  '妖精' = 'Fairy',
  '一般' = 'Normal',
  '冰' = 'Ice',
  '岩石' = 'Rock',
  '惡' = 'Dark',
  '龍' = 'Dragon',
}
