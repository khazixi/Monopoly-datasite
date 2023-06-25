import { Housable, Person } from '../lib/storage'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { Color } from '@prisma/client'

type ColorData = {
  count: number
  color: Color
  monopoly: boolean
}

export type OwnableData = {
  data: ColorData[]
  utilities: number
  railroads: number
}


export const usePlayers = defineStore('players', () => {
  const selected = ref(0)
  const players = reactive<Person[]>(
    [
      { name: "Player 1", owned: [], money: 1500 },
      { name: "Player 2", owned: [], money: 1500 }
    ]
  )

  const playerCount = computed(() => players.length)
  const owned = computed(() => {
    let owned: Housable[] = []
    players.forEach((v) => {
      owned.push(...v.owned)
    })
    return owned
  })

  function addNewPlayer(name?: string) {
    if (name === undefined) {
      players.push({ name: `Player ${playerCount.value + 1}`, owned: [], money: 1500 })
      return
    }
    if (players.findIndex((val) => val.name === name) !== -1) return
    players.push({ name: name, owned: [], money: 1500 })
  }

  function removePlayer(idx: number) {
    if (players.length > 2) players.splice(idx)
  }

  function changeName(idx: number, newName: string) {
    players[idx].name = newName
  }

  function storePlayer(player: Person) {
    if (players.findIndex((val) => val.name === player.name) !== -1) return
    players.push(player)
  }

  function addProperty(idx: number, props: Housable) {
    players[idx].owned.push(props)
  }

  function removeProperty(idx: number, props: Housable) {
    players[idx].owned.filter((val) => { val.name !== props.name })
  }

  // TODO: Make the set function a callback?
  return {
    players,
    owned,
    playerCount,
    addNewPlayer,
    removePlayer,
    changeName,
    storePlayer,
    addProperty,
    removeProperty,
  }
})
