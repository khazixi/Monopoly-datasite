import { GameRoute } from 'server/util/cleaning'
import { Game, Housable, Person } from 'util/client'

export default defineStore('game', () => {
  const selected = ref(0)
  const id = ref<number | null>(null)
  const game = reactive<Game>({
    name: "New Game",
    players: [
      { name: "Player 1", money: 1500, owned: [] },
      { name: "Player 2", money: 1500, owned: [] },
    ]
  })

  const selectedPlayer = computed(() => game.players[selected.value])

  const unselectedPlayer = computed(() =>
    game.players
      .map((v, i) => ({ player: v, index: i }))
      .filter((_, i) => i !== selected.value)
  )

  const playerCount = computed(() => game.players.length)

  const owned = computed(() => game.players.flatMap(v => v.owned))

  function addNewPlayer() {
    game.players.push({ name: `Player ${playerCount.value + 1}`, owned: [], money: 1500 })
  }

  function removePlayer(idx: number) {
    if (game.players.length > 2) game.players.splice(idx, 1)
  }

  function updatePlayer(idx: number, person: Person) {
    game.players[idx] = person
  }

  function addProperty(idx: number, props: Housable) {
    game.players[idx].owned.push(props)
  }

  function removeProperty(idx: number, props: Housable) {
    game.players[idx].owned = game.players[idx].owned.filter((val) => val.position !== props.position)
  }

  // TODO: Refactor to use index: number instead of player: Person
  function updateHouse(idx: number, prop: Housable) {
    const gIdx = game.players[idx].owned.findIndex((p) => p.name === prop.name)
    if (gIdx === -1) {
      game.players[idx].owned.push(prop)
    } else {
      game.players[idx].owned[gIdx] = prop
    }
  }

  function importGame(prop: GameRoute) {
    game.name = prop.data.name
    game.players = prop.data.players
    id.value = prop.id
  }

  // BUG: /api/save seems to get called on changes
  async function saveState(ingame: Game) {
    console.log('Calling Update')
    const { data } = await useFetch('/api/save', {
      method: 'POST',
      body: unref(ingame),
    })
    if (!data.value) {
      console.log('FUCK')
      return
    }
    id.value = data.value.id
  }

  async function updateState(ingame: Game) {
    console.log('Calling Save')
    await useFetch(`/api/game/${id}`, {
      method: 'PATCH',
      body: unref(ingame)
    })
  }

  return {
    id,
    game,
    owned,
    selected,
    saveState,
    importGame,
    updateState,
    addProperty,
    playerCount,
    updateHouse,
    updatePlayer,
    addNewPlayer,
    removePlayer,
    removeProperty,
    selectedPlayer,
    unselectedPlayer,
  }
})
