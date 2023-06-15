import { Color, Drawable, Property, Railroad, Special, Utilities } from '@prisma/client'
export type Spot = Property | Railroad | Special | Utilities | Drawable

export function generateTailwindBackground(spot: Spot | null): string {
  if (!spot) return 'bg-white'
  if (getType(spot.id) !== 'Property') return 'bg-black'

  switch ((spot as Property).color) {
    case 'BROWN': return 'bg-amber-900'
    case 'LIGHTBLUE': return 'bg-sky-300'
    case 'PINK': return 'bg-pink-300'
    case 'ORANGE': return 'bg-orange-500'
    case 'RED': return 'bg-red-600'
    case 'YELLOW': return 'bg-yellow-400'
    case 'GREEN': return 'bg-green-600'
    case 'BLUE': return 'bg-blue-700'
    default: return 'bg-black'
  }
}

export function generateTailwindForeground(spot: Spot | null): string {
  if (!spot) return 'text-red-500'
  if (getType(spot.id) !== 'Property') return 'text-white'
  return 'text-black'
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
		 Rent                   M${property.rent[0]}  
		 Rent with color set    M${property.rent[1]}  
		 Rent with 1 House      M${property.rent[2]}  
		 Rent with 2 Houses     M${property.rent[3]}  
		 Rent with 3 Houses     M${property.rent[4]}  
		 Rent with 4 Houses     M${property.rent[5]}  
		 With Hotel             M${property.rent[6]}  

		 Mortgage Value         M${property.price / 2}  
		 House Cost             M${getHousePrice(property.color)}  each 
		 Hotels Cost            M${getHousePrice(property.color)}  each 
		 (plus 4 houses)
  `
}

export function createRailroadDescription(railroad: Railroad) {
  return `
    ${railroad.name}\n
    Rent                  M${railroad.rent[0]}\n
    If 2 R'R are owned    M${railroad.rent[1]}\n
    If 3 R'R are owned    M${railroad.rent[2]}\n
    If 4 R'R are owned    M${railroad.rent[3]}\n\n

    Mortgage Value        M${railroad.price / 2}\n
  `
}

export function createUtilitiesDescription(utility: Utilities) {
  return `
    ${utility.name}\n
    If one "Utility" is owned rent is 4 times amount shown on dice.\n
    If one "Utilities" is owned rent is 10 times amount shown on dice.\n\n

    Mortgage Value        M${utility.price / 2}\n
  `
}

export function getType(index: number) {
  if ([0, 4, 10, 20, 30, 38].includes(index % 40)) {
    return 'Special'
  } else if ([12, 28].includes(index % 40)) {
    return 'Utility'
  } else if ([5, 15, 25, 35].includes(index % 40)) {
    return 'Railroad'
  } else if ([2, 7, 17, 22, 33, 36].includes(index % 40)) {
    return 'Drawable'
  } else return 'Property'
}

// HACK: Using Zod Validation as a way to validate my way out of typescript unions

// NOTE: Consider moving this into InfoCard.vue
export function getSpotName(spot: Spot): string {
  switch (getType(spot.id)) {
    case 'Special':
      return (spot as Special).name
    case 'Utility':
      return (spot as Utilities).name
    case 'Railroad':
      return (spot as Railroad).name
    case 'Drawable':
      return ((spot as Drawable).type === 'CHANCE') ? 'Chance' : 'Community Chest'
    case 'Property':
      return (spot as Property).name
  }
}

// NOTE: Consider moving this into InfoCard.vue
export function getDescription(spot: Spot) {
  switch (getType(spot.id)) {
    case 'Special':
      return (spot as Special).description
    case 'Utility':
      return createUtilitiesDescription(spot as Utilities)
    case 'Railroad':
      return createRailroadDescription(spot as Railroad)
    case 'Drawable':
      return (spot as Drawable).type
    case 'Property':
      return createPropertyDescription(spot as Property)
  }
}
