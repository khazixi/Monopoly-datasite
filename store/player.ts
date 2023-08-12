import { Housable, Person } from 'util/client'
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
  const players = reactive<Person[]>([
    { name: "Player 1", owned: [], money: 1500 },
    { name: "Player 2", owned: [], money: 1500 }
  ])

  const selectedPlayer = computed(() => players[selected.value])

  const unselectedPlayer = computed(() =>
    players
      .map((v, i) => {
        return { player: v, index: i }
      })
      .filter((_, i) => i !== selected.value)
  )

  const playerCount = computed(() => players.length)

  const owned = computed(() => {
    const owned: Housable[] = []
    players.forEach((v) => {
      owned.push(...v.owned)
    })
    return owned
  })

  function addNewPlayer(name?: string) {
    if (name === undefined) {
      if (players.length < 8) players.push({ name: `Player ${playerCount.value + 1}`, owned: [], money: 1500 })
      return
    }
    if (players.findIndex((val) => val.name === name) !== -1) return
    if (players.length < 8) players.push({ name: name, owned: [], money: 1500 })
  }

  function removePlayer(idx: number) {
    if (players.length > 2) players.splice(idx, 1)
  }

  function updatePlayer(idx: number, person: Person) {
    players[idx] = person
  }

  function storePlayer(player: Person) {
    if (players.findIndex((val) => val.name === player.name) !== -1) return
    players.push(player)
  }

  function addProperty(idx: number, props: Housable) {
    players[idx].owned.push(props)
  }

  function removeProperty(idx: number, props: Housable) {
    players[idx].owned = players[idx].owned.filter((val) => val.id !== props.id)
  }

  // TODO: Refactor to use index: number instead of player: Person
  function updateHouse(player: Person, prop: Housable) {
    const index = player.owned.findIndex(v => v.name === prop.name)
    if (index === -1) {
      player.owned.push(prop)
      return
    }
    player.owned[index] = prop
  }

  // TODO: Make the set function a callback?
  return {
    players,
    unselectedPlayer,
    selectedPlayer,
    updateHouse,
    selected,
    owned,
    playerCount,
    addNewPlayer,
    removePlayer,
    storePlayer,
    addProperty,
    removeProperty,
    updatePlayer,
  }
})
