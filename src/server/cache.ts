import { Card, Color, Drawable, Property, Railroad, Special, Utilities } from '@prisma/client'

type Spot = Property | Special | Drawable | Railroad | Utilities

// TODO: Refactor Caching System

// TODO: The ideal Cahce would be a
// Map<number, Spot> that castes to values 
// based on the spot

// HACK: Caches end up storing duplicates based on api routes
export const IDCache = new Map<number, Spot>()

export const ColorCache = new Map<Color, Property[]>()

export const UtilityCache = new Map<string, Utilities>()

export const RailroadCache = new Map<string, Railroad>()

export const PropertyCache = new Map<string, Property>()

export const SpotCache = new Map<number, Spot[]>



// NOTE: Both Card Routes re-use the same Cache which is more efficient
export const CardCache = new Map<number, Card>()
