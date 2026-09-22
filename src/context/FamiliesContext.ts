import { createContext } from 'react'
import { families as initialFamilies } from '../data/mockData'
import type { Visit } from '../data/visitTypes'

export type Family = (typeof initialFamilies)[number]

export interface NewFamilyData {
  family: string
  parent: string
  child: string
  phone: string
  total: number
}

export interface FamiliesContextType {
  families: Family[]
  visits: Visit[]
  registerVisit: (familyId: number) => void
  addFamily: (data: NewFamilyData) => void
}

export const FamiliesContext =
  createContext<FamiliesContextType | undefined>(undefined)