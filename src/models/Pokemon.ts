interface Gender {
  M: number;
  F: number;
}

export interface BasePoint {
  Hp: number;
  Atk: number;
  Def: number;
  SpAtk: number;
  SpDef: number;
  Spd: number;
  Total: number;
}

export interface BasePokemon {
  link: string;
  paldeaId: string;
  nationalId: string;
  nameZh: string;
  nameJp: string;
  nameEn: string;
  types: string[];
  stats: number[];
  altForm: string | null;
  abilities: string[];
  hiddenAbility: string | null;
  version: string | null;
  display: boolean;
  basePoint: BasePoint;
  gender: Gender;
  source: string;
  raids?: string[];
  evolutions?: { condition: string; link: string }[];
}

export enum Stats {
  Hp = 0,
  Atk = 1,
  Def = 2,
  SpAtk = 3,
  SpDef = 4,
  Spd = 5,
  Total = 6,
}

export enum NameSuffix {
  '帕底亞' = 'p',
  '帕底亞-鬥戰種' = 'p',
  '帕底亞-火熾種' = 'b',
  '帕底亞-水瀾種' = 'a',
  '伽勒爾' = 'g',
  '阿羅拉' = 'a',
  '洗翠' = 'h',
  '雄性' = '',
  '雌性' = 'f',
  '白晝' = '',
  '黑夜' = 'm',
  '黃昏' = 'd',
  '高調' = '',
  '低調' = 'l',
  '平凡形態' = '',
  '全能形態' = 'h',
  '特殊' = '',
}

export enum VersionType {
  'Scarlet' = '朱',
  'Violet' = '紫',
}
