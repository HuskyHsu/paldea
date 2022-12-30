interface Gender {
  M: number;
  F: number;
}

interface BasePoint {
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

export enum CategoryType {
  'Physical' = '物理',
  'Special' = '特殊',
  'Status' = '變化',
}

export enum LevelMap {
  '回憶' = -2,
  '進化' = -1,
  '—' = 0,
}

export enum Accuracy {
  '變化' = -1,
  '—' = 0,
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

interface LevelingUps {
  level: number;
  link: string;
}

interface TechnicalMachine {
  leaguePoint: number;
  material: string;
  pokemon: string[];
}
export interface Move extends BaseMove {
  eggPokemons: string[];
  levelingUps: LevelingUps[];
  technicalMachine: TechnicalMachine | null;
}

export interface LevelUpMove extends BaseMove {
  level: number;
}

export interface TMMove extends BaseMove {
  pid: number;
}
