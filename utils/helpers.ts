import { DrawableData, GameData, PropertyData, SpecialData } from "./data";

export const specialIndices = [0, 4, 10, 20, 30, 38] as const;
export const utilityIndices = [12, 28] as const;
export const railroadIndices = [5, 15, 25, 35] as const;
export const drawableIndices = [2, 7, 17, 22, 33, 36] as const;
export const propertyIndices = [
  1, 3, 6, 8, 9, 11, 13, 14, 16, 18, 19, 21, 23, 24, 26, 27, 29, 31, 32, 34, 37,
  39,
] as const;

export type SpecialIndices = (typeof specialIndices)[number];
export type UtilityIndices = (typeof utilityIndices)[number];
export type RailroadIndices = (typeof railroadIndices)[number];
export type DrawableIndices = (typeof drawableIndices)[number];
export type PropertyIndices = (typeof propertyIndices)[number];
export type SpotIndices =
  | SpecialIndices
  | UtilityIndices
  | RailroadIndices
  | DrawableIndices
  | PropertyIndices;

function localFind(a: ReadonlyArray<number>, b: number) {
  return a.includes(b)
}

export function getHousePrice(index: number) {
  if (checkIndices(index, [0,1,2,3,4], propertyIndices))
    return 50
  else if (checkIndices(index, [5,6,7,8,9,10], propertyIndices))
    return 100
  else if (checkIndices(index, [11,12,13,14,15,16], propertyIndices))
    return 150
  else if (checkIndices(index, [17,18,19,20,21], propertyIndices))
    return 200
}

export function getType(spotIndex: number) {
  if (localFind(specialIndices, spotIndex)) return 'Special'
  else if (localFind(utilityIndices, spotIndex)) return 'Utility'
  else if (localFind(railroadIndices, spotIndex)) return 'Railroad'
  else if (localFind(drawableIndices, spotIndex)) return 'Drawable'
  else if (localFind(propertyIndices, spotIndex)) return 'Property'
  else return 'Error'
}

export function getName(spot: GameData[0]) {
  switch (getType(spot.id)) {
    case "Special":
      return (spot as SpecialData).name;
    case "Utility":
    case "Railroad":
    case "Property":
      return (spot as PropertyData).name;
    case "Drawable":
      return (spot as DrawableData).type
    default: return 'name'
  }
}

function checkIndices(v: number, i: number[], a: ReadonlyArray<number>) {
  for (const idx of i) {
    if (v === a[idx]) return true
  }
  return false
}

export function bgBySpot(spot: number) {
  if (0 <= spot && spot <= 39) {
    if (checkIndices(spot, [0, 1], propertyIndices))
      return 'bg-purple-500'
    else if (checkIndices(spot, [2, 3, 4], propertyIndices))
      return 'bg-sky-400'
    else if (checkIndices(spot, [5, 6, 7], propertyIndices))
      return 'bg-fuchsia-400'
    else if (checkIndices(spot, [8, 9, 10], propertyIndices))
      return 'bg-orange-400'
    else if (checkIndices(spot, [11, 12, 13], propertyIndices))
      return 'bg-red-400'
    else if (checkIndices(spot, [14, 15, 16], propertyIndices))
      return 'bg-yellow-400'
    else if (checkIndices(spot, [17, 18, 19], propertyIndices))
      return 'bg-green-400'
    else if (checkIndices(spot, [20, 21], propertyIndices))
      return 'bg-blue-700'
    else if (checkIndices(spot, [0, 1], utilityIndices))
      return 'bg-zinc-800'
    else if (checkIndices(spot, [0, 1, 2, 3], railroadIndices))
      return 'bg-slate-800'
  }
  return 'bg-black'
}
