export type Housable = {
  name: string,
  houses?: number // 5 Houses = Hotel
}

export type Person = {
  name: string,
  money: number,
  owned: Housable[]
}
