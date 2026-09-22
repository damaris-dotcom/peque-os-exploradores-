import { useContext } from 'react'
import { FamiliesContext } from '../context/FamiliesContext'

export function useFamiliesContext() {
  const context = useContext(FamiliesContext)

  if (!context) {
    throw new Error(
      'useFamiliesContext debe usarse dentro de FamiliesProvider'
    )
  }

  return context
}