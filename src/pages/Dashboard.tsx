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
    <div className="w-full p-4 sm:p-6 lg:p-8">
      {/* Encabezado */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Resumen general
        </h2>

        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500">
          Consulta rápidamente el estado de familias, membresías e ingresos.
        </p>
      </div>

      {/* Estadísticas */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
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

      {/* Contenido inferior */}
      <section className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 xl:grid-cols-3">
        {/* Familias con actividad */}
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 xl:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                Familias con actividad
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                Resumen de membresías utilizadas recientemente.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/visitas')}
              className="self-start whitespace-nowrap text-sm font-semibold text-purple-600 transition hover:text-purple-800"
            >
              Ver visitas
            </button>
          </div>

          <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
            {recentFamilies.length > 0 ? (
              recentFamilies.map((family) => (
                <button
                  key={family.id}
                  type="button"
                  onClick={() => navigate(`/familias/${family.id}`)}
                  className="
                    flex w-full flex-col gap-3
                    rounded-xl border border-slate-100
                    p-4 text-left
                    transition hover:bg-slate-50
                    sm:flex-row sm:items-center sm:justify-between
                  "
                >
                  {/* Familia */}
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                      👦
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">
                        {family.children
                          .map((child) => child.name)
                          .join(', ')}
                      </p>

                      <p className="truncate text-sm text-slate-500">
                        {family.family}
                      </p>
                    </div>
                  </div>

                  {/* Estado */}
                  <div className="border-t border-slate-100 pt-3 sm:border-0 sm:pt-0 sm:text-right">
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
              <div className="py-8 text-center sm:py-10">
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

        {/* Acciones rápidas */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">
            Acciones rápidas
          </h3>

          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            Accede a las operaciones más frecuentes.
          </p>

          <div className="mt-5 space-y-3 sm:mt-6">
            <button
              type="button"
              onClick={() => navigate('/nuevo-ingreso')}
              className="
                min-h-12 w-full rounded-xl
                bg-purple-600 px-4 py-3
                font-semibold text-white
                transition hover:bg-purple-700
              "
            >
              + Registrar ingreso
            </button>

            <button
              type="button"
              onClick={() => navigate('/familias/nueva')}
              className="
                min-h-12 w-full rounded-xl
                border border-slate-200
                px-4 py-3
                font-semibold text-slate-700
                transition hover:bg-slate-50
              "
            >
              + Nueva familia
            </button>

            <button
              type="button"
              onClick={() => navigate('/familias')}
              className="
                min-h-12 w-full rounded-xl
                border border-slate-200
                px-4 py-3
                font-semibold text-slate-700
                transition hover:bg-slate-50
              "
            >
              Buscar familia
            </button>

            <button
              type="button"
              onClick={() => navigate('/membresias')}
              className="
                min-h-12 w-full rounded-xl
                border border-slate-200
                px-4 py-3
                font-semibold text-slate-700
                transition hover:bg-slate-50
              "
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