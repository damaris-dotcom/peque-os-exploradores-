import { createContext } from 'react'

import type { Visit } from '../data/visitTypes'

export interface Child {
  id: number
  name: string
}

export interface Family {
  id: number
  family: string
  parent: string
  children: Child[]
  phone: string
  plan: string
  total: number
  used: number
  available: number
  status: string
}

export interface NewFamilyData {
  family: string
  parent: string
  children: Child[]
  phone: string
  total: number
}

export interface FamiliesContextType {
  families: Family[]
  visits: Visit[]

  registerVisit: (
    familyId: number,
    childIds: number[]
  ) => void

  addFamily: (
    data: NewFamilyData
  ) => void
}

export const FamiliesContext =
  createContext<FamiliesContextType | undefined>(
    undefined
  )