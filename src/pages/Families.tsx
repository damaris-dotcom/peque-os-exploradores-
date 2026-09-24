import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Search,
  Plus,
  Users,
  ChevronRight,
} from 'lucide-react'

import { useFamiliesContext } from '../hooks/useFamiliesContext'

function Families() {
  const navigate = useNavigate()
  const { families } = useFamiliesContext()

  const [search, setSearch] = useState('')

  const filteredFamilies = families.filter((family) => {
    const term = search.toLowerCase().trim()

    const matchesChild = family.children.some((child) =>
      child.name.toLowerCase().includes(term)
    )

    return (
      family.family.toLowerCase().includes(term) ||
      family.parent.toLowerCase().includes(term) ||
      matchesChild ||
      family.phone.toLowerCase().includes(term)
    )
  })

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      {/* Encabezado */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-purple-600">
            Gestión
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Familias
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
            Consulta familias, acudientes, niños y saldos disponibles.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/familias/nueva')}
          className="
            flex min-h-12 w-full items-center justify-center gap-2
            rounded-2xl bg-purple-600
            px-5 py-3
            font-semibold text-white
            shadow-sm transition
            hover:bg-purple-700
            sm:w-auto
          "
        >
          <Plus size={18} />
          Nueva familia
        </button>
      </div>

      {/* Buscador */}
      <div
        className="
          mt-6 flex items-center gap-3
          rounded-2xl border border-slate-200
          bg-white p-3 shadow-sm
          sm:mt-8 sm:gap-4 sm:rounded-3xl sm:p-5
        "
      >
        <div
          className="
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-xl bg-purple-50 text-purple-600
            sm:h-11 sm:w-11 sm:rounded-2xl
          "
        >
          <Search size={19} />
        </div>

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar familia, acudiente, niño o teléfono..."
          className="
            min-w-0 w-full
            bg-transparent
            text-sm text-slate-900
            outline-none
            placeholder:text-slate-400
          "
        />
      </div>

      {/* Listado */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-6 sm:rounded-3xl">
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Users size={19} />
            </div>

            <div className="min-w-0">
              <h3 className="font-bold text-slate-900">
                Familias registradas
              </h3>

              <p className="text-sm text-slate-500">
                {filteredFamilies.length} resultado
                {filteredFamilies.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>
        </div>

        {/* Encabezados solo en desktop */}
        <div
          className="
            hidden
            bg-slate-50/70
            px-6 py-3
            text-xs font-semibold uppercase tracking-wide
            text-slate-400
            lg:grid
            lg:grid-cols-[1.2fr_1.2fr_1.5fr_1fr_.8fr_auto]
            lg:gap-4
          "
        >
          <span>Familia</span>
          <span>Acudiente</span>
          <span>Niños</span>
          <span>Plan</span>
          <span>Disponibles</span>
          <span />
        </div>

        {/* Familias */}
        {filteredFamilies.length > 0 ? (
          filteredFamilies.map((family) => {
            const lowBalance = family.available <= 2

            return (
              <button
                key={family.id}
                type="button"
                onClick={() => navigate(`/familias/${family.id}`)}
                className="
                  block w-full
                  border-t border-slate-100
                  p-4 text-left
                  transition
                  hover:bg-slate-50/70

                  lg:grid
                  lg:grid-cols-[1.2fr_1.2fr_1.5fr_1fr_.8fr_auto]
                  lg:items-center
                  lg:gap-4
                  lg:px-6
                  lg:py-5
                "
              >
                {/* Familia */}
                <div className="flex items-start justify-between gap-3 lg:block">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {family.family}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {family.phone}
                    </p>
                  </div>

                  <div
                    className="
                      flex h-9 w-9 shrink-0
                      items-center justify-center
                      rounded-xl text-slate-400
                      lg:hidden
                    "
                  >
                    <ChevronRight size={18} />
                  </div>
                </div>

                {/* Información mobile / tablet */}
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 lg:contents">
                  {/* Acudiente */}
                  <div className="min-w-0">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400 lg:hidden">
                      Acudiente
                    </p>

                    <p className="truncate text-sm text-slate-600">
                      {family.parent}
                    </p>
                  </div>

                  {/* Niños */}
                  <div className="min-w-0">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400 lg:hidden">
                      Niños
                    </p>

                    <p className="truncate text-sm font-medium text-slate-700">
                      {family.children
                        .map((child) => child.name)
                        .join(', ')}
                    </p>

                    <p className="mt-1 hidden text-xs text-slate-400 lg:block">
                      {family.children.length}{' '}
                      {family.children.length === 1
                        ? 'niño registrado'
                        : 'niños registrados'}
                    </p>
                  </div>

                  {/* Plan */}
                  <div className="min-w-0">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400 lg:hidden">
                      Plan
                    </p>

                    <p className="truncate text-sm text-slate-600">
                      {family.plan}
                    </p>
                  </div>

                  {/* Disponibles */}
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400 lg:hidden">
                      Disponibles
                    </p>

                    <span
                      className={`
                        inline-flex min-w-10 justify-center
                        rounded-full px-3 py-1
                        text-sm font-bold
                        ${
                          lowBalance
                            ? 'bg-orange-50 text-orange-700'
                            : 'bg-green-50 text-green-700'
                        }
                      `}
                    >
                      {family.available}
                    </span>
                  </div>

                  {/* Flecha desktop */}
                  <div className="hidden justify-end lg:flex">
                    <div
                      className="
                        flex h-9 w-9 items-center justify-center
                        rounded-xl text-slate-400
                        transition
                        group-hover:bg-purple-50
                        group-hover:text-purple-600
                      "
                    >
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </button>
            )
          })
        ) : (
          <div className="px-4 py-12 text-center sm:px-6 sm:py-16">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Search size={20} />
            </div>

            <p className="mt-4 font-semibold text-slate-700">
              No encontramos familias
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Intenta con otro nombre, acudiente, niño o teléfono.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Families