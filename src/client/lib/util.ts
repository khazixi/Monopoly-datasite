import { Color, Drawable, Property, Railroad, Special, Utilities } from '@prisma/client'
import { DrawableSchema, PropertySchema, RailroadSchema, SpecialSchema, SpotSchema, UtilitySchema } from '../../lib/schema'

export type Spot = Property | Railroad | Special | Utilities | Drawable 

export function generateTailwindBackground(spot: Spot): string {
  if (getType(spot.id) !== 'Property') return 'black'


  const property = PropertySchema.parse(spot)

  switch (property.color) {
    case 'BROWN': return 'amber-900'
    case 'LIGHTBLUE': return 'sky-300'
    case 'PINK': return 'pink-300'
    case 'ORANGE': return 'orange-500'
    case 'RED': return 'red-600'
    case 'YELLOW': return 'yellow-400'
    case 'GREEN': return 'green-600'
    case 'BLUE': return 'blue-700'
    default: return 'black'
  }
}

export function getHousePrice(color: Color): number {
  switch (color) {
    case 'BROWN':
    case 'LIGHTBLUE': return 50
    case 'PINK':
    case 'ORANGE': return 100
    case 'RED':
    case 'YELLOW': return 150
    case 'GREEN':
    case 'BLUE': return 200
  }
}

export function createPropertyDescription(property: Property) {
  return `
    Title Deed ${property.name}
    Rent                  M${property.rent[0]}
    Rent with color set   M${property.rent[1]}
    Rent with 1 House     M${property.rent[2]}
    Rent with 2 Houses    M${property.rent[3]}
    Rent with 3 Houses    M${property.rent[4]}
    Rent with 4 Houses    M${property.rent[5]}
    With Hotel            M${property.rent[6]}

    Mortgage Value        M${property.price / 2}
    House Cost            M${getHousePrice(property.color)} each
    Hotels Cost           M${getHousePrice(property.color)} each
    (plus 4 houses)
  `

}

export function createRailroadDescription(railroad: Railroad) {
  return `
    ${railroad.name}
    Rent                  M${railroad.rent[0]}
    If 2 R'R are owned    M${railroad.rent[1]}
    If 3 R'R are owned    M${railroad.rent[2]}
    If 4 R'R are owned    M${railroad.rent[3]}

    Mortgage Value        M${railroad.price / 2}
  `
}

export function createUtilitiesDescription(utility: Utilities) {
  return `
    ${utility.name}
    If one "Utility" is owned rent is 4 times amount shown on dice.
    If one "Utilities" is owned rent is 10 times amount shown on dice.

    Mortgage Value        M${utility.price / 2}
  `
}

// TODO: Deal with the unwraps which result from the API returns
export async function fetchById(id: number): Promise<Spot> {
  // TODO: Break this into individual client Schemas
  return fetch(`/api/spot/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(resp => resp.json())
    .then(json => SpotSchema.parse(json.data))
}

export async function fetchByColor(color: string): Promise<Property[] | string> {
  return fetch(`/api/color/${color}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(resp => resp.json())
    .then(json => PropertySchema.array().parse(json.data))
}

export async function fetchByRailroad(name: string): Promise<Railroad | string> {
  return fetch(`/api/railroad?name=${name}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(resp => resp.json())
    .then(json => RailroadSchema.parse(json.data))
}

export async function fetchByUtility(name: string): Promise<Utilities | string> {
  return fetch(`/api/utility?name=${name}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(resp => resp.json())
    .then(json => UtilitySchema.parse(json.data))
}


export async function FetchBySpots(): Promise<Spot[] | string> { return fetch(`/api/spots`, { method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(resp => resp.json())
    .then(json => SpotSchema.array().parse(json.data))
}

export function getType(index: number) {
  const idx = index % 40
  if ([0, 4, 10, 20, 30].includes(idx)) return 'Special'
  if ([12, 28].includes(idx)) return 'Utility'
  else if ([5, 15, 25, 35].includes(idx)) return 'Railroad'
  else if ([2, 7, 17, 22, 33, 36].includes(idx)) return 'Drawable'
  else return  'Property'
}

// HACK: Using Zod Validation as a way to validate my way out of typescript unions

// NOTE: Consider moving this into InfoCard.vue
export function getSpotName(spot: Spot): string {
  switch(getType(spot.id)) {
    case 'Special':
      spot = SpecialSchema.parse(spot)
      return spot.name
    case 'Utility':
      spot = UtilitySchema.parse(spot)
      return spot.name
    case 'Railroad':
      spot = RailroadSchema.parse(spot)
      return spot.name
    case 'Drawable':
      spot = DrawableSchema.parse(spot)
      return (spot.type === 'CHANCE') ? 'Chance' : 'Community Chest'
    case 'Property':
      spot = PropertySchema.parse(spot)
      return spot.name
  }
}

// NOTE: Consider moving this into InfoCard.vue
export function getDescription(spot: Spot) {
  switch(getType(spot.id)) {
    case 'Special':
      spot = SpecialSchema.parse(spot)
      return spot.description
    case 'Utility':
      spot = UtilitySchema.parse(spot)
      return createUtilitiesDescription(spot)
    case 'Railroad':
      spot = RailroadSchema.parse(spot)
      return createRailroadDescription(spot)
    case 'Drawable':
      spot = DrawableSchema.parse(spot)
      return spot.type
    case 'Property':
      spot = PropertySchema.parse(spot)
      // HACK: Gets around Property Schema returning a union of 'Property | Railroad | Utilities'
      return createPropertyDescription(spot as Property) 
  }
}
