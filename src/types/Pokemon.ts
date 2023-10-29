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
  hiddenAbility: string | null;
  types: string[];
  abilities: string[];
  baseStats: number[];
  baseStatsTotal: number;
  EVs: number[];
  source: string;
  genderRatio: number;
  eggGroups: string[];
};

export type SubPokemon = {
  link: string;
  nameZh: string;
  altForm: string | null;
  types: string[];
};

export type PokedexFrom = 'kitakami' | 'paldea' | 'hisui';

export const PokedexList = ['kitakami', 'paldea', 'hisui'];

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
// Move
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

export type PMMove = LevelingUp | EggMove | TM;

type MoveInfo = {
  levelingUps: LevelingUp[];
  eggMoves: EggMove[];
  TMs: TM[];
};

export enum MoveCategoryEnum {
  '物理' = 'Physical',
  '特殊' = 'Special',
  '變化' = 'Status',
}

export enum LevelMap {
  '進化' = 0,
  '遺傳' = -1,
  '回憶' = -2,
}

export enum Accuracy {
  '變化' = -1,
  '—' = 0,
}

type material = {
  part: string;
  count: number;
  link: number;
};

export type FullMove = Move & {
  levelingUps: (SubPokemon & { level: number })[];
  egg: SubPokemon[];
  TM: {
    materials: material[];
    pid: number;
    leaguePoint: number;
    pm: SubPokemon[];
  };
};

// Evolve
export type Evolve = SubPokemon & {
  condition: string;
};

type MidEvolve = Evolve & {
  to?: Evolve[];
};

type StartEvolve = {
  from: Evolve;
  to: MidEvolve[];
};

export type FullPokemon = Pokemon & {
  moves: MoveInfo;
  evolves?: StartEvolve;
};

// type
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

export enum BgType {
  '蟲' = 'bg-type-bug',
  '惡' = 'bg-type-dark',
  '龍' = 'bg-type-dragon',
  '電' = 'bg-type-electric',
  '妖精' = 'bg-type-fairy',
  '格鬥' = 'bg-type-fighting',
  '火' = 'bg-type-fire',
  '飛行' = 'bg-type-flying',
  '幽靈' = 'bg-type-ghost',
  '草' = 'bg-type-grass',
  '地面' = 'bg-type-ground',
  '冰' = 'bg-type-ice',
  '一般' = 'bg-type-normal',
  '毒' = 'bg-type-poison',
  '超能力' = 'bg-type-psychic',
  '岩石' = 'bg-type-rock',
  '鋼' = 'bg-type-steel',
  '水' = 'bg-type-water',
}

export enum FillType {
  '蟲' = 'fill-type-bug',
  '惡' = 'fill-type-dark',
  '龍' = 'fill-type-dragon',
  '電' = 'fill-type-electric',
  '妖精' = 'fill-type-fairy',
  '格鬥' = 'fill-type-fighting',
  '火' = 'fill-type-fire',
  '飛行' = 'fill-type-flying',
  '幽靈' = 'fill-type-ghost',
  '草' = 'fill-type-grass',
  '地面' = 'fill-type-ground',
  '冰' = 'fill-type-ice',
  '一般' = 'fill-type-normal',
  '毒' = 'fill-type-poison',
  '超能力' = 'fill-type-psychic',
  '岩石' = 'fill-type-rock',
  '鋼' = 'fill-type-steel',
  '水' = 'fill-type-water',
}

export enum BgFromType {
  '蟲' = 'from-type-bug/60',
  '惡' = 'from-type-dark/60',
  '龍' = 'from-type-dragon/60',
  '電' = 'from-type-electric/60',
  '妖精' = 'from-type-fairy/60',
  '格鬥' = 'from-type-fighting/60',
  '火' = 'from-type-fire/60',
  '飛行' = 'from-type-flying/60',
  '幽靈' = 'from-type-ghost/60',
  '草' = 'from-type-grass/60',
  '地面' = 'from-type-ground/60',
  '冰' = 'from-type-ice/60',
  '一般' = 'from-type-normal/60',
  '毒' = 'from-type-poison/60',
  '超能力' = 'from-type-psychic/60',
  '岩石' = 'from-type-rock/60',
  '鋼' = 'from-type-steel/60',
  '水' = 'from-type-water/60',
}

export enum BgToType {
  '蟲' = 'to-type-bug/60',
  '惡' = 'to-type-dark/60',
  '龍' = 'to-type-dragon/60',
  '電' = 'to-type-electric/60',
  '妖精' = 'to-type-fairy/60',
  '格鬥' = 'to-type-fighting/60',
  '火' = 'to-type-fire/60',
  '飛行' = 'to-type-flying/60',
  '幽靈' = 'to-type-ghost/60',
  '草' = 'to-type-grass/60',
  '地面' = 'to-type-ground/60',
  '冰' = 'to-type-ice/60',
  '一般' = 'to-type-normal/60',
  '毒' = 'to-type-poison/60',
  '超能力' = 'to-type-psychic/60',
  '岩石' = 'to-type-rock/60',
  '鋼' = 'to-type-steel/60',
  '水' = 'to-type-water/60',
}
