import {
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import { families as initialFamilies } from '../data/mockData'
import type { Visit } from '../data/visitTypes'

import {
  FamiliesContext,
  type Family,
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
  const [families, setFamilies] =
    useState<Family[]>(() => {
      const savedFamilies =
        localStorage.getItem(
          FAMILIES_STORAGE_KEY
        )

      if (savedFamilies) {
        return JSON.parse(
          savedFamilies
        ) as Family[]
      }

      return initialFamilies
    })

  const [visits, setVisits] =
    useState<Visit[]>(() => {
      const savedVisits =
        localStorage.getItem(
          VISITS_STORAGE_KEY
        )

      if (savedVisits) {
        return JSON.parse(
          savedVisits
        ) as Visit[]
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

  const registerVisit = (
    familyId: number,
    childIds: number[]
  ) => {
    const selectedFamily =
      families.find(
        (family) =>
          family.id === familyId
      )

    if (!selectedFamily) {
      return
    }

    if (childIds.length === 0) {
      return
    }

    const selectedChildren =
      selectedFamily.children.filter(
        (child) =>
          childIds.includes(child.id)
      )

    if (
      selectedChildren.length === 0
    ) {
      return
    }

    const visitsCount =
      selectedChildren.length

    if (
      selectedFamily.available <
      visitsCount
    ) {
      return
    }

    setFamilies(
      (currentFamilies) =>
        currentFamilies.map(
          (family) => {
            if (
              family.id !== familyId
            ) {
              return family
            }

            return {
              ...family,
              used:
                family.used +
                visitsCount,
              available:
                family.available -
                visitsCount,
            }
          }
        )
    )

    const now = new Date()

    const newVisits: Visit[] =
      selectedChildren.map(
        (child, index) => ({
          id:
            Date.now() +
            index,

          familyId:
            selectedFamily.id,

          family:
            selectedFamily.family,

          childId:
            child.id,

          child:
            child.name,

          date:
            now.toLocaleDateString(
              'es-CO'
            ),

          time:
            now.toLocaleTimeString(
              'es-CO',
              {
                hour: '2-digit',
                minute: '2-digit',
              }
            ),

          status:
            'Registrado',
        })
      )

    setVisits(
      (currentVisits) => [
        ...newVisits,
        ...currentVisits,
      ]
    )
  }

  const addFamily = (
    data: NewFamilyData
  ) => {
    setFamilies(
      (currentFamilies) => {
        const newId =
          currentFamilies.length > 0
            ? Math.max(
                ...currentFamilies.map(
                  (family) =>
                    family.id
                )
              ) + 1
            : 1

        const newFamily: Family = {
          id: newId,
          family: data.family,
          parent: data.parent,
          children: data.children,
          phone: data.phone,
          plan: `${data.total} ingresos`,
          total: data.total,
          used: 0,
          available: data.total,
          status: 'Activo',
        }

        return [
          ...currentFamilies,
          newFamily,
        ]
      }
    )
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