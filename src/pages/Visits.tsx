import {
  ClipboardList,
  Users,
  TicketCheck,
  CalendarDays,
} from 'lucide-react'

import { useFamiliesContext } from '../hooks/useFamiliesContext'

function Visits() {
  const { families, visits } = useFamiliesContext()


  const familiesWithVisits = families.filter(
    (family) => family.used > 0
  ).length

  const totalUsed = families.reduce(
    (total, family) => total + family.used,
    0
  )

  return (
    <div className="p-8">
      <div>
        <p className="text-sm font-semibold text-purple-600">
          Historial
        </p>

        <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Visitas
        </h2>

        <p className="mt-2 text-slate-500">
          Consulta los ingresos registrados en la demostración.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Visitas registradas
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900">
                {visits.length}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Total de ingresos registrados
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <ClipboardList size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Familias con visitas
              </p>

              <p className="mt-3 text-3xl font-bold text-purple-700">
                {familiesWithVisits}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Familias con actividad registrada
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <Users size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Ingresos utilizados
              </p>

              <p className="mt-3 text-3xl font-bold text-orange-600">
                {totalUsed}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Consumo total de membresías
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <TicketCheck size={22} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Historial de ingresos
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Registro general de visitas.
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
            <CalendarDays size={19} />
          </div>
        </div>

        <div className="grid grid-cols-5 bg-slate-50/70 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
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
              className="grid grid-cols-5 items-center border-t border-slate-100 px-6 py-5"
            >
             <div>
             <p className="text-sm font-medium text-slate-700">
            {visit.date}
              </p>

             <p className="mt-1 text-xs text-slate-400">
             {visit.time}
               </p>
                   </div>

              <p className="font-semibold text-slate-900">
                {visit.family}
              </p>

              <p className="text-sm text-slate-600">
                {visit.child}
              </p>

             <p className="text-sm text-slate-600">
              Ingreso
              </p>

              <div>
                <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                  {visit.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-16 text-center">
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