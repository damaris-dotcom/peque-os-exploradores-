import {
  TicketCheck,
  CircleDollarSign,
  TriangleAlert,
  ChevronRight,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import { useFamiliesContext } from '../hooks/useFamiliesContext'

function Memberships() {
  const navigate = useNavigate()

  const { families } = useFamiliesContext()

  const activeMemberships = families.filter(
    (family) => family.status === 'Activo'
  ).length

  const totalAvailable = families.reduce(
    (total, family) => total + family.available,
    0
  )

  const lowBalanceCount = families.filter(
    (family) => family.available <= 2
  ).length

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      {/* Encabezado */}
      <div>
        <p className="text-sm font-semibold text-purple-600">
          Gestión
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Membresías
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
          Consulta el estado, consumo y saldo disponible de cada familia.
        </p>
      </div>

      {/* Resumen */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-8 xl:grid-cols-3">
        {/* Membresías activas */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Membresías activas
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 sm:mt-3 sm:text-3xl">
                {activeMemberships}
              </p>

              <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:mt-2 sm:text-sm">
                Familias con plan activo
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 sm:h-12 sm:w-12 sm:rounded-2xl">
              <TicketCheck size={22} />
            </div>
          </div>
        </div>

        {/* Ingresos disponibles */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Ingresos disponibles
              </p>

              <p className="mt-2 text-2xl font-bold text-green-700 sm:mt-3 sm:text-3xl">
                {totalAvailable}
              </p>

              <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:mt-2 sm:text-sm">
                Saldo total entre familias
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 sm:h-12 sm:w-12 sm:rounded-2xl">
              <CircleDollarSign size={22} />
            </div>
          </div>
        </div>

        {/* Saldos bajos */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:col-span-2 sm:rounded-3xl sm:p-6 xl:col-span-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Saldos bajos
              </p>

              <p className="mt-2 text-2xl font-bold text-orange-600 sm:mt-3 sm:text-3xl">
                {lowBalanceCount}
              </p>

              <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:mt-2 sm:text-sm">
                Dos ingresos o menos
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 sm:h-12 sm:w-12 sm:rounded-2xl">
              <TriangleAlert size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Listado de membresías */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-6 sm:rounded-3xl">
        {/* Cabecera */}
        <div className="border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">
            Estado de membresías
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Detalle de consumo por familia.
          </p>
        </div>

        {/* Encabezados desktop */}
        <div
          className="
            hidden
            bg-slate-50/70
            px-6 py-3
            text-xs font-semibold uppercase tracking-wide
            text-slate-400
            lg:grid
            lg:grid-cols-[1.5fr_1.3fr_.8fr_.9fr_1fr_auto]
            lg:gap-4
          "
        >
          <span>Familia</span>
          <span>Plan</span>
          <span>Utilizados</span>
          <span>Disponibles</span>
          <span>Estado</span>
          <span />
        </div>

        {families.length > 0 ? (
          families.map((family) => {
            const lowBalance =
              family.available <= 2

            const percentage =
              family.total > 0
                ? Math.round(
                    (family.used /
                      family.total) *
                      100
                  )
                : 0

            return (
              <button
                key={family.id}
                type="button"
                onClick={() =>
                  navigate(
                    `/familias/${family.id}`
                  )
                }
                className="
                  group block w-full
                  border-t border-slate-100
                  p-4 text-left
                  transition
                  hover:bg-slate-50/70

                  lg:grid
                  lg:grid-cols-[1.5fr_1.3fr_.8fr_.9fr_1fr_auto]
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

                    <p className="mt-1 truncate text-xs text-slate-400">
                      {family.children
                        .map(
                          (child) =>
                            child.name
                        )
                        .join(', ')}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {
                        family.children
                          .length
                      }{' '}
                      {family.children
                        .length === 1
                        ? 'niño asociado'
                        : 'niños asociados'}
                    </p>
                  </div>

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 lg:hidden">
                    <ChevronRight size={18} />
                  </div>
                </div>

                {/* Información responsive */}
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 lg:contents">
                  {/* Plan */}
                  <div className="min-w-0">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
                      Plan
                    </p>

                    <p className="truncate text-sm font-medium text-slate-700">
                      {family.plan}
                    </p>

                    <div className="mt-2 h-1.5 w-full max-w-28 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-purple-600"
                        style={{
                          width: `${Math.min(
                            percentage,
                            100
                          )}%`,
                        }}
                      />
                    </div>

                    <p className="mt-1 text-xs text-slate-400 lg:hidden">
                      {percentage}% utilizado
                    </p>
                  </div>

                  {/* Utilizados */}
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
                      Utilizados
                    </p>

                    <p className="text-sm font-semibold text-slate-700">
                      {family.used}
                    </p>
                  </div>

                  {/* Disponibles */}
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
                      Disponibles
                    </p>

                    <span
                      className={`
                        inline-flex min-w-10
                        justify-center rounded-full
                        px-3 py-1
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

                  {/* Estado */}
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
                      Estado
                    </p>

                    <span className="inline-flex rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-700">
                      {family.status}
                    </span>
                  </div>

                  {/* Flecha desktop */}
                  <div className="hidden justify-end lg:flex">
                    <div
                      className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-xl
                        text-slate-400
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
          <div className="px-4 py-12 text-center sm:px-6 sm:py-14">
            <p className="font-semibold text-slate-700">
              No hay membresías registradas
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Las membresías aparecerán aquí cuando registres una familia.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Memberships