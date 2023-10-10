export type BoolKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
};

export type ValueKeys<T, L> = {
  [K in keyof T]: T[K] extends L ? K : never;
};
