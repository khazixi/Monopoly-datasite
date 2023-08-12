export type Housable = {
  // TODO: Incoporate id Numbers
  id: number;
  name: string;
  houses?: number;
};

export type Person = {
  name: string;
  money: number;
  owned: Housable[];
};
