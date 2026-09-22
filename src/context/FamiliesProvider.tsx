import {
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import { families as initialFamilies } from '../data/mockData'
import type { Visit } from '../data/visitTypes'

import {
  FamiliesContext,
  type NewFamilyData,
} from './FamiliesContext'

const FAMILIES_STORAGE_KEY =
  'pequenos-exploradores-families'

const VISITS_STORAGE_KEY =
  'pequenos-exploradores-visits'

export function FamiliesProvider({
  children,
}: {
  children: ReactNode
}) {
  const [families, setFamilies] = useState(() => {
    const savedFamilies = localStorage.getItem(
      FAMILIES_STORAGE_KEY
    )

    if (savedFamilies) {
      return JSON.parse(savedFamilies)
    }

    return initialFamilies
  })

  const [visits, setVisits] = useState<Visit[]>(() => {
    const savedVisits = localStorage.getItem(
      VISITS_STORAGE_KEY
    )

    if (savedVisits) {
      return JSON.parse(savedVisits)
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem(
      FAMILIES_STORAGE_KEY,
      JSON.stringify(families)
    )
  }, [families])

  useEffect(() => {
    localStorage.setItem(
      VISITS_STORAGE_KEY,
      JSON.stringify(visits)
    )
  }, [visits])

  const registerVisit = (familyId: number) => {
    const selectedFamily = families.find(
      (family) => family.id === familyId
    )

    if (
      !selectedFamily ||
      selectedFamily.available <= 0
    ) {
      return
    }

    setFamilies((currentFamilies) =>
      currentFamilies.map((family) => {
        if (family.id !== familyId) {
          return family
        }

        return {
          ...family,
          used: family.used + 1,
          available: family.available - 1,
        }
      })
    )

    const now = new Date()

    const newVisit: Visit = {
      id: Date.now(),
      familyId: selectedFamily.id,
      family: selectedFamily.family,
      child: selectedFamily.child,
      date: now.toLocaleDateString('es-CO'),
      time: now.toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Registrado',
    }

    setVisits((currentVisits) => [
      newVisit,
      ...currentVisits,
    ])
  }

  const addFamily = (data: NewFamilyData) => {
    setFamilies((currentFamilies) => {
      const newId =
        currentFamilies.length > 0
          ? Math.max(
              ...currentFamilies.map(
                (family) => family.id
              )
            ) + 1
          : 1

      const newFamily = {
        id: newId,
        family: data.family,
        parent: data.parent,
        child: data.child,
        phone: data.phone,
        plan: `${data.total} ingresos`,
        total: data.total,
        used: 0,
        available: data.total,
        status: 'Activo',
      }

      return [...currentFamilies, newFamily]
    })
  }

  return (
    <FamiliesContext.Provider
      value={{
        families,
        visits,
        registerVisit,
        addFamily,
      }}
    >
      {children}
    </FamiliesContext.Provider>
  )
}