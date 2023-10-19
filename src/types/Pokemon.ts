export type Pokemon = {
  link: string;
  pid: number;
  paldea: number | null;
  kitakami: number | null;
  hisui: number | null;
  nameZh: string;
  nameEn: string;
  nameJp: string;
  altForm: string | null;
  hiddenAbility: string;
  types: string[];
  abilities: string[];
  baseStats: number[];
  baseStatsTotal: number;
  EVs: number[];
  source: string;
  genderRatio: number;
};

type Move = {
  pid: number;
  nameZh: string;
  nameJp: string;
  nameEn: string;
  type: string;
  category: string;
  power: number;
  accuracy: number;
  PP: number;
  description: string;
};

type LevelingUp = Move & { level: number };

type EggMove = Move & { level: number };

type TM = Move & {
  TMPid: number;
  leaguePoint: number;
  materials: {
    material: string;
    count: number;
    pm: string;
  }[];
};

type MoveInfo = {
  levelingUps: LevelingUp[];
  eggMoves: EggMove[];
  TMs: TM[];
};

type Evolve = {
  from: string;
  to: string;
  fromNameZh: string;
  toNameZh: string;
  condition: string;
};

export type FullPokemon = Pokemon & {
  moves: MoveInfo;
  evolves: (Evolve & { evolves?: Evolve[] })[];
};

export type PokedexFrom = 'kitakami' | 'paldea' | 'hisui';

export const PokedexList = ['kitakami', 'paldea', 'hisui'];

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

export enum EVIndex {
  HP = 0,
  Atk = 1,
  Def = 2,
  SpA = 3,
  SpD = 4,
  Spe = 5,
}

export enum EVName {
  'HP' = 'HP',
  'Atk' = '攻擊',
  'Def' = '防禦',
  'SpA' = '特攻',
  'SpD' = '特防',
  'Spe' = '速度',
}
