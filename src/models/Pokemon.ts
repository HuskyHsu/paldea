export interface BasePokemon {
  paldeaId: number;
  nationalId: number;
  nameZh: string;
  nameJp: string;
  nameEn: string;
  types: string[];
  stats?: number[];
}
