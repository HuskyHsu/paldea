interface Gender {
  M: number;
  F: number;
}
export interface BasePokemon {
  link: string;
  paldeaId: string;
  nationalId: number;
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
  basePoint: string;
  gender: Gender;
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

export interface BaseMove {
  nameZh: string;
  type: string;
  category: string;
  power: number;
  accuracy: number;
  PP: number;
  description: string;
}
export interface LevelUpMove extends BaseMove {
  level: number;
}

export interface TMMove extends BaseMove {
  pid: number;
}
