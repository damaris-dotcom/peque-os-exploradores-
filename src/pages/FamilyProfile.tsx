import {
  ArrowLeft,
  Phone,
  UserRound,
  Baby,
  CheckCircle2,
  TicketCheck,
} from 'lucide-react'

import { useNavigate, useParams } from 'react-router-dom'
import { useFamiliesContext } from '../hooks/useFamiliesContext'

function FamilyProfile() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { families, visits, registerVisit } = useFamiliesContext()

  const family = families.find(
    (item) => item.id === Number(id)
  )

  if (!family) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Familia no encontrada
        </h2>

        <button
          onClick={() => navigate('/familias')}
          className="mt-4 font-semibold text-purple-600"
        >
          Volver a familias
        </button>
      </div>
    )
  }

  const percentage = Math.round(
    (family.used / family.total) * 100
  )

 const familyVisits = visits.filter(
  (visit) => visit.familyId === family.id
)

  return (
    <div className="p-8">
      <button
        onClick={() => navigate('/familias')}
        className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-purple-600"
      >
        <ArrowLeft size={17} />
        Volver a familias
      </button>

      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-purple-600">
            Perfil familiar
          </p>

          <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            {family.family}
          </h2>

          <p className="mt-2 text-slate-500">
            Consulta la información de la familia, su membresía y el historial de ingresos.
          </p>
        </div>

        <button
          onClick={() => registerVisit(family.id)}
          disabled={family.available === 0}
          className="flex items-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <TicketCheck size={18} />

          {family.available > 0
            ? 'Registrar ingreso'
            : 'Sin ingresos disponibles'}
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Información familiar
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Datos principales del registro.
            </p>
          </div>

          <div className="mt-7 space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <UserRound size={19} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Acudiente
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {family.parent}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <Baby size={19} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Niño
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {family.child}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <Phone size={19} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Teléfono
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {family.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <CheckCircle2 size={19} />
              </div>

              <div>
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

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-purple-600">
                Membresía actual
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                {family.plan}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Estado actual del paquete de ingresos.
              </p>
            </div>

            <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
              Vigente
            </span>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Total
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {family.total}
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-5">
              <p className="text-sm font-medium text-orange-700">
                Utilizados
              </p>

              <p className="mt-2 text-3xl font-bold text-orange-700">
                {family.used}
              </p>
            </div>

            <div className="rounded-2xl bg-green-50 p-5">
              <p className="text-sm font-medium text-green-700">
                Disponibles
              </p>

              <p className="mt-2 text-3xl font-bold text-green-700">
                {family.available}
              </p>
            </div>
          </div>

          <div className="mt-7">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-600">
                Uso de la membresía
              </span>

              <span className="font-bold text-slate-900">
                {percentage}%
              </span>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-purple-600 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className="mt-3 text-sm text-slate-400">
              {family.available} ingresos disponibles de {family.total}.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h3 className="text-lg font-bold text-slate-900">
            Historial de visitas
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Ingresos registrados para esta familia.
          </p>
        </div>

        <div className="grid grid-cols-3 bg-slate-50/70 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <span>Fecha</span>
          <span>Niño</span>
          <span>Estado</span>
        </div>

        {familyVisits.length > 0 ? (
  familyVisits.map((visit) => (
            <div
              key={visit.id}
              className="grid grid-cols-3 items-center border-t border-slate-100 px-6 py-5"
            >
              <div>
           <p className="text-sm font-medium text-slate-700">
           {visit.date}
            </p>

          <p className="mt-1 text-xs text-slate-400">
          {visit.time}
             </p>
            </div>

              <p className="font-medium text-slate-800">
                {visit.child}
              </p>

              <div>
                <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                  {visit.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-14 text-center">
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