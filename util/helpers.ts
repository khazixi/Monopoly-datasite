import {
  Drawable,
  Property,
  Railroad,
  Special,
  Utilities,
} from "@prisma/client";
import { Housable } from "./client";

export const specialIndices = [0, 4, 10, 20, 30, 38] as const;
export const utilityIndices = [12, 28] as const;
export const railroadIndices = [5, 15, 25, 35] as const;
export const drawableIndices = [2, 7, 17, 22, 33, 36] as const;
export const propertyIndices = [
  1, 3, 6, 8, 9, 11, 13, 14, 16, 18, 19, 21, 23, 24, 26, 27, 29, 31, 32, 34, 37,
  39,
] as const;

export type Spot = Property | Railroad | Special | Utilities | Drawable;
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

export function getType(spot: Spot) {
  const index = spot.id;
  if ([0, 4, 10, 20, 30, 38].includes(index % 40)) {
    return "Special";
  } else if ([12, 28].includes(index % 40)) {
    return "Utility";
  } else if ([5, 15, 25, 35].includes(index % 40)) {
    return "Railroad";
  } else if ([2, 7, 17, 22, 33, 36].includes(index % 40)) {
    return "Drawable";
  } else return "Property";
}

export function getName(spot: Spot) {
  switch (getType(spot)) {
    case "Special":
      return (spot as Special).name;
    case "Utility":
      return (spot as Utilities).name;
    case "Railroad":
      return (spot as Railroad).name;
    case "Drawable":
      return (spot as Drawable).type === "CHANCE"
        ? "Chance"
        : "Community Chest";
    case "Property":
      return (spot as Property).name;
  }
}

function checkIndices(v: number, i: number[], a: ReadonlyArray<number>) {
  for (const idx of i) {
    if (v === a[idx]) return true
  }
  return false
}

export function bgBySpot(spot: Housable) {
  if (0 <= spot.id && spot.id <= 39) {
    if (checkIndices(spot.id, [0, 1], propertyIndices))
      return 'bg-purple-500'
    else if (checkIndices(spot.id, [2, 3, 4], propertyIndices))
      return 'bg-sky-400'
    else if (checkIndices(spot.id, [5, 6, 7], propertyIndices))
      return 'bg-fuchsia-400'
    else if (checkIndices(spot.id, [8, 9, 10], propertyIndices))
      return 'bg-orange-400'
    else if (checkIndices(spot.id, [11, 12, 13], propertyIndices))
      return 'bg-red-400'
    else if (checkIndices(spot.id, [14, 15, 16], propertyIndices))
      return 'bg-yellow-400'
    else if (checkIndices(spot.id, [17, 18, 19], propertyIndices))
      return 'bg-green-400'
    else if (checkIndices(spot.id, [20, 21], propertyIndices))
      return 'bg-blue-700'
    else if (checkIndices(spot.id, [0, 1], utilityIndices))
      return 'bg-zinc-800'
    else if (checkIndices(spot.id, [0,1,2,3], railroadIndices)) 
      return 'bg-slate-800'
  }
  return 'bg-black'
}

export function generateTailwindBackground(spot: Spot | null): string {
  if (!spot) return "bg-white";
  if (getType(spot) !== "Property") return "bg-black";

  switch ((spot as Property).color) {
    case "BROWN":
      return "bg-amber-900";
    case "LIGHTBLUE":
      return "bg-sky-300";
    case "PINK":
      return "bg-fuchsia-500";
    case "ORANGE":
      return "bg-orange-400";
    case "RED":
      return "bg-red-600";
    case "YELLOW":
      return "bg-yellow-400";
    case "GREEN":
      return "bg-green-600";
    case "BLUE":
      return "bg-blue-700";
    default:
      return "bg-black";
  }
}

export function generateTailwindForeground(spot: Spot | null): string {
  if (!spot) return "text-red-500";
  if (getType(spot) !== "Property") return "text-white";
  return "text-black";
}
