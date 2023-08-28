export type Housable = {
  position: number;
  name: string;
  houses?: number;
};

export type Person = {
  name: string;
  money: number;
  owned: Housable[];
};

export type Game = {
  name: string
  players: {
    money: number
    name: string
    owned: {
      name: string
      houses?: number
      position: number
    }[]
  }[]
}

export type SavableGame = Game & { id: number }
