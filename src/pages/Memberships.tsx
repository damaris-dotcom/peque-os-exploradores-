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

  const totalAvailable = families.reduce(
    (total, family) => total + family.available,
    0
  )

  const lowBalanceCount = families.filter(
    (family) => family.available <= 2
  ).length

  return (
    <div className="p-8">
      <div>
        <p className="text-sm font-semibold text-purple-600">
          Gestión
        </p>

        <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Membresías
        </h2>

        <p className="mt-2 text-slate-500">
          Consulta el estado, consumo y saldo disponible de cada familia.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Membresías activas
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900">
                {families.length}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Familias con plan registrado
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <TicketCheck size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Ingresos disponibles
              </p>

              <p className="mt-3 text-3xl font-bold text-green-700">
                {totalAvailable}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Saldo total entre familias
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <CircleDollarSign size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Saldos bajos
              </p>

              <p className="mt-3 text-3xl font-bold text-orange-600">
                {lowBalanceCount}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Dos ingresos o menos
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <TriangleAlert size={22} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h3 className="text-lg font-bold text-slate-900">
            Estado de membresías
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Detalle de consumo por familia.
          </p>
        </div>

        <div className="grid grid-cols-6 bg-slate-50/70 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <span>Familia</span>
          <span>Plan</span>
          <span>Utilizados</span>
          <span>Disponibles</span>
          <span>Estado</span>
          <span></span>
        </div>

        {families.map((family) => {
          const lowBalance = family.available <= 2
          const percentage = Math.round(
            (family.used / family.total) * 100
          )

          return (
            <button
              key={family.id}
              type="button"
              onClick={() =>
                navigate(`/familias/${family.id}`)
              }
              className="grid w-full grid-cols-6 items-center border-t border-slate-100 px-6 py-5 text-left transition hover:bg-slate-50/70"
            >
              <div>
                <p className="font-semibold text-slate-900">
                  {family.family}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {family.child}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700">
                  {family.plan}
                </p>

                <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-purple-600"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <p className="text-sm font-semibold text-slate-700">
                {family.used}
              </p>

              <div>
                <span
                  className={`inline-flex min-w-10 justify-center rounded-full px-3 py-1 text-sm font-bold ${
                    lowBalance
                      ? 'bg-orange-50 text-orange-700'
                      : 'bg-green-50 text-green-700'
                  }`}
                >
                  {family.available}
                </span>
              </div>

              <div>
                <span className="inline-flex rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-700">
                  {family.status}
                </span>
              </div>

              <div className="flex justify-end">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400">
                  <ChevronRight size={18} />
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Memberships