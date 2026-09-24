import {
  ArrowLeft,
  Phone,
  UserRound,
  Baby,
  CheckCircle2,
  TicketCheck,
} from 'lucide-react'

import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import { useFamiliesContext } from '../hooks/useFamiliesContext'

function FamilyProfile() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { families, visits } = useFamiliesContext()

  const family = families.find(
    (item) => item.id === Number(id)
  )

  if (!family) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Familia no encontrada
        </h2>

        <button
          type="button"
          onClick={() => navigate('/familias')}
          className="mt-4 font-semibold text-purple-600"
        >
          Volver a familias
        </button>
      </div>
    )
  }

  const percentage =
    family.total > 0
      ? Math.round((family.used / family.total) * 100)
      : 0

  const familyVisits = visits.filter(
    (visit) => visit.familyId === family.id
  )

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      {/* Volver */}
      <button
        type="button"
        onClick={() => navigate('/familias')}
        className="
          flex items-center gap-2
          text-sm font-semibold text-slate-500
          transition hover:text-purple-600
        "
      >
        <ArrowLeft size={17} />
        Volver a familias
      </button>

      {/* Encabezado */}
      <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-purple-600">
            Perfil familiar
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {family.family}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
            Consulta la información de la familia, su membresía y el historial de ingresos.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/nuevo-ingreso')}
          disabled={family.available === 0}
          className="
            flex min-h-12 w-full items-center justify-center gap-2
            rounded-2xl bg-purple-600
            px-5 py-3
            font-semibold text-white
            shadow-sm transition
            hover:bg-purple-700
            disabled:cursor-not-allowed
            disabled:bg-slate-300
            sm:w-auto
          "
        >
          <TicketCheck size={18} />

          {family.available > 0
            ? 'Registrar ingreso'
            : 'Sin ingresos disponibles'}
        </button>
      </div>

      {/* Información + membresía */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-6 xl:grid-cols-3">
        {/* Información familiar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Información familiar
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Datos principales del registro.
            </p>
          </div>

          <div className="mt-6 space-y-5 sm:mt-7">
            {/* Acudiente */}
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <UserRound size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Acudiente
                </p>

                <p className="mt-1 break-words font-semibold text-slate-800">
                  {family.parent}
                </p>
              </div>
            </div>

            {/* Niños */}
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <Baby size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Niños asociados
                </p>

                <div className="mt-2 space-y-3">
                  {family.children.map((child) => {
                    const childVisits = familyVisits.filter(
                      (visit) => visit.childId === child.id
                    )

                    return (
                      <div key={child.id}>
                        <p className="break-words font-semibold text-slate-800">
                          {child.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {childVisits.length}{' '}
                          {childVisits.length === 1
                            ? 'visita registrada'
                            : 'visitas registradas'}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <Phone size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Teléfono
                </p>

                <p className="mt-1 break-words font-semibold text-slate-800">
                  {family.phone}
                </p>
              </div>
            </div>

            {/* Estado */}
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <CheckCircle2 size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Estado
                </p>

                <p className="mt-1 font-semibold text-green-700">
                  {family.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Membresía */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 xl:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-purple-600">
                Membresía actual
              </p>

              <h3 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                {family.plan}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Estado actual del paquete de ingresos.
              </p>
            </div>

            <span className="self-start rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
              Vigente
            </span>
          </div>

          {/* Métricas */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
              <p className="text-sm font-medium text-slate-500">
                Total
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                {family.total}
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-4 sm:p-5">
              <p className="text-sm font-medium text-orange-700">
                Utilizados
              </p>

              <p className="mt-2 text-2xl font-bold text-orange-700 sm:text-3xl">
                {family.used}
              </p>
            </div>

            <div className="rounded-2xl bg-green-50 p-4 sm:p-5">
              <p className="text-sm font-medium text-green-700">
                Disponibles
              </p>

              <p className="mt-2 text-2xl font-bold text-green-700 sm:text-3xl">
                {family.available}
              </p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="mt-6 sm:mt-7">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-medium text-slate-600">
                Uso de la membresía
              </span>

              <span className="shrink-0 font-bold text-slate-900">
                {percentage}%
              </span>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-purple-600 transition-all duration-300"
                style={{
                  width: `${Math.min(percentage, 100)}%`,
                }}
              />
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {family.available} ingresos disponibles de {family.total}.
            </p>
          </div>
        </div>
      </div>

      {/* Historial */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-6 sm:rounded-3xl">
        <div className="border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">
            Historial de visitas
          </h3>

          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            Ingresos individuales registrados para los niños de esta familia.
          </p>
        </div>

        {/* Cabecera desktop */}
        <div className="hidden grid-cols-3 bg-slate-50/70 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400 md:grid">
          <span>Fecha</span>
          <span>Niño</span>
          <span>Estado</span>
        </div>

        {familyVisits.length > 0 ? (
          familyVisits.map((visit) => (
            <div
              key={visit.id}
              className="
                border-t border-slate-100
                p-4
                md:grid md:grid-cols-3 md:items-center
                md:px-6 md:py-5
              "
            >
              {/* Mobile */}
              <div className="flex items-start justify-between gap-4 md:contents">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {visit.date}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {visit.time}
                  </p>
                </div>

                <span className="inline-flex shrink-0 rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700 md:hidden">
                  {visit.status}
                </span>
              </div>

              <div className="mt-3 md:mt-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 md:hidden">
                  Niño
                </p>

                <p className="mt-1 font-medium text-slate-800 md:mt-0">
                  {visit.child}
                </p>
              </div>

              <div className="hidden md:block">
                <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                  {visit.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-12 text-center sm:px-6 sm:py-14">
            <p className="font-semibold text-slate-700">
              No hay visitas registradas
            </p>

            <p className="mt-1 text-sm text-slate-500">
              El historial aparecerá aquí cuando se registre un ingreso.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FamilyProfile