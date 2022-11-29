export interface BasePokemon {
  paldeaId: number;
  nationalId: number;
  nameZh: string;
  nameJp: string;
  nameEn: string;
  types: string[];
  stats?: number[];
  altForm: string | null;
  abilities: string[];
  hiddenAbility: string | null;
  specific?: string | null;
}

export enum NameSuffix {
  "帕底亞" = "p",
  "帕底亞-鬥戰種" = "p",
  "帕底亞-火熾種" = "b",
  "帕底亞-水瀾種" = "a",
}
