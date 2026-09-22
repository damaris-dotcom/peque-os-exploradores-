import {
  Users,
  TicketCheck,
  ClipboardList,
  Sparkles,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import StatCard from '../components/StatCard'
import { useFamiliesContext } from '../hooks/useFamiliesContext'

function Dashboard() {
  const navigate = useNavigate()
  const { families } = useFamiliesContext()

  const totalFamilies = families.length

  const activeMemberships = families.filter(
    (family) => family.status === 'Activo'
  ).length

  const totalVisits = families.reduce(
    (total, family) => total + family.used,
    0
  )

  const totalAvailable = families.reduce(
    (total, family) => total + family.available,
    0
  )

  const recentFamilies = families
    .filter((family) => family.used > 0)
    .slice(0, 4)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Resumen general
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Consulta rápidamente el estado de familias, membresías e ingresos.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
       
        <StatCard
  title="Familias registradas"
  value={String(totalFamilies)}
  detail="Total de familias en el sistema"
  icon={Users}
/>

<StatCard
  title="Membresías activas"
  value={String(activeMemberships)}
  detail="Membresías disponibles"
  icon={TicketCheck}
/>

<StatCard
  title="Visitas registradas"
  value={String(totalVisits)}
  detail="Ingresos utilizados"
  icon={ClipboardList}
/>

<StatCard
  title="Ingresos disponibles"
  value={String(totalAvailable)}
  detail="Saldo total disponible"
  icon={Sparkles}
/>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Familias con actividad
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Resumen de membresías utilizadas recientemente.
              </p>
            </div>

            <button
              onClick={() => navigate('/visitas')}
              className="text-sm font-semibold text-purple-600 hover:text-purple-800"
            >
              Ver visitas
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {recentFamilies.length > 0 ? (
              recentFamilies.map((family) => (
                <button
                  key={family.id}
                  type="button"
                  onClick={() =>
                    navigate(`/familias/${family.id}`)
                  }
                  className="flex w-full items-center justify-between rounded-xl border border-slate-100 p-4 text-left transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                      👦
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        {family.child}
                      </p>

                      <p className="text-sm text-slate-500">
                        {family.family}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">
                      {family.available} disponibles
                    </p>

                    <p className="text-xs text-slate-500">
                      {family.used} utilizados
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="py-10 text-center">
                <p className="font-semibold text-slate-700">
                  Todavía no hay actividad
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Registra un ingreso para comenzar.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">
            Acciones rápidas
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Accede a las operaciones más frecuentes.
          </p>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => navigate('/nuevo-ingreso')}
              className="w-full rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white hover:bg-purple-700"
            >
              + Registrar ingreso
            </button>

            <button
              onClick={() => navigate('/familias/nueva')}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              + Nueva familia
            </button>

            <button
              onClick={() => navigate('/familias')}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Buscar familia
            </button>

            <button
              onClick={() => navigate('/membresias')}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Ver membresías
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard