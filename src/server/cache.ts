import { Color, Drawable, Property, Railroad, Special, Utilities } from '@prisma/client'

type Spot = Property | Special | Drawable | Railroad | Utilities

export const IDCache = new Map<number, Spot>()

export const ColorCache = new Map<Color, Property[]>()

export const UtilityCache = new Map<string, Utilities>()

export const RailroadCache = new Map<string, Railroad>()

export const PropertyCache = new Map<string, Property>()

export const SpotCache = new Map<number, Spot[]>
