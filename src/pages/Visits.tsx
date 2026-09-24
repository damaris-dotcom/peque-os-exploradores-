import {
  ClipboardList,
  Users,
  TicketCheck,
  CalendarDays,
} from 'lucide-react'

import { useFamiliesContext } from '../hooks/useFamiliesContext'

function Visits() {
  const { visits } = useFamiliesContext()

  const familiesWithVisits = new Set(
    visits.map((visit) => visit.familyId)
  ).size

  const totalUsed = visits.length

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      {/* Encabezado */}
      <div>
        <p className="text-sm font-semibold text-purple-600">
          Historial
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Visitas
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
          Consulta los ingresos registrados en la demostración.
        </p>
      </div>

      {/* Resumen */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-8 xl:grid-cols-3">
        {/* Visitas registradas */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Visitas registradas
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 sm:mt-3 sm:text-3xl">
                {visits.length}
              </p>

              <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:mt-2 sm:text-sm">
                Total de ingresos registrados
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 sm:h-12 sm:w-12 sm:rounded-2xl">
              <ClipboardList size={22} />
            </div>
          </div>
        </div>

        {/* Familias con visitas */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Familias con visitas
              </p>

              <p className="mt-2 text-2xl font-bold text-purple-700 sm:mt-3 sm:text-3xl">
                {familiesWithVisits}
              </p>

              <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:mt-2 sm:text-sm">
                Familias con actividad registrada
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 sm:h-12 sm:w-12 sm:rounded-2xl">
              <Users size={22} />
            </div>
          </div>
        </div>

        {/* Ingresos utilizados */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:col-span-2 sm:rounded-3xl sm:p-6 xl:col-span-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Ingresos utilizados
              </p>

              <p className="mt-2 text-2xl font-bold text-orange-600 sm:mt-3 sm:text-3xl">
                {totalUsed}
              </p>

              <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:mt-2 sm:text-sm">
                Consumo total de membresías
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 sm:h-12 sm:w-12 sm:rounded-2xl">
              <TicketCheck size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Historial */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-6 sm:rounded-3xl">
        {/* Cabecera */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Historial de ingresos
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Registro general de visitas.
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
            <CalendarDays size={19} />
          </div>
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
            lg:grid-cols-[1.1fr_1.4fr_1.4fr_1fr_1fr]
            lg:gap-4
          "
        >
          <span>Fecha</span>
          <span>Familia</span>
          <span>Niño</span>
          <span>Tipo</span>
          <span>Estado</span>
        </div>

        {visits.length > 0 ? (
          visits.map((visit) => (
            <div
              key={visit.id}
              className="
                border-t border-slate-100
                p-4
                lg:grid
                lg:grid-cols-[1.1fr_1.4fr_1.4fr_1fr_1fr]
                lg:items-center
                lg:gap-4
                lg:px-6
                lg:py-5
              "
            >
              {/* Fecha + estado en mobile */}
              <div className="flex items-start justify-between gap-4 lg:block">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {visit.date}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {visit.time}
                  </p>
                </div>

                <span className="inline-flex shrink-0 rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700 lg:hidden">
                  {visit.status}
                </span>
              </div>

              {/* Información mobile */}
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 lg:contents">
                {/* Familia */}
                <div className="min-w-0">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
                    Familia
                  </p>

                  <p className="truncate font-semibold text-slate-900">
                    {visit.family}
                  </p>
                </div>

                {/* Niño */}
                <div className="min-w-0">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
                    Niño
                  </p>

                  <p className="truncate text-sm text-slate-600">
                    {visit.child}
                  </p>
                </div>

                {/* Tipo */}
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
                    Tipo
                  </p>

                  <p className="text-sm text-slate-600">
                    Ingreso
                  </p>
                </div>

                {/* Estado desktop */}
                <div className="hidden lg:block">
                  <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                    {visit.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-12 text-center sm:px-6 sm:py-16">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <ClipboardList size={20} />
            </div>

            <p className="mt-4 font-semibold text-slate-700">
              Todavía no hay visitas
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Los ingresos registrados aparecerán aquí.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Visits