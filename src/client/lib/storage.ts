import { Ref } from "vue";

export type Housable = {
  name: string,
  houses: number // 5 Houses = Hotel
}

export type Ownable = {
  name: string
}

export type Person = {
  name: string,
  money: number,
  owned: (Ownable | Housable)[]
}
