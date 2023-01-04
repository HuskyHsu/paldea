export enum CategoryType {
  'Physical' = '物理',
  'Special' = '特殊',
  'Status' = '變化',
}

export enum Categories {
  'Physical' = 'Physical',
  'Special' = 'Special',
  'Status' = 'Status',
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
  pid: number;
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

export interface PMMove extends BaseMove {
  source: string;
}

export const CATGEORY_MAP = Object.keys(Categories);

export interface CategoryShow {
  [propName: string]: boolean;
}

export const categoryAllOn = CATGEORY_MAP.reduce((acc, cur) => {
  acc[cur] = true;
  return acc;
}, {} as CategoryShow);

export const categoryAllOff = CATGEORY_MAP.reduce((acc, cur) => {
  acc[cur] = false;
  return acc;
}, {} as CategoryShow);
