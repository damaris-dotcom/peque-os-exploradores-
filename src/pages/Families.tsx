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

    return (
      family.family.toLowerCase().includes(term) ||
      family.parent.toLowerCase().includes(term) ||
      family.child.toLowerCase().includes(term) ||
      family.phone.toLowerCase().includes(term)
    )
  })

  return (
    <div className="p-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-purple-600">
            Gestión
          </p>

          <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Familias
          </h2>

          <p className="mt-2 text-slate-500">
            Consulta familias, acudientes, niños y saldos disponibles.
          </p>
        </div>

        <button
          onClick={() => navigate('/familias/nueva')}
          className="flex items-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-purple-700"
        >
          <Plus size={18} />
          Nueva familia
        </button>
      </div>

      <div className="mt-8 flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
          <Search size={19} />
        </div>

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por familia, acudiente, niño o teléfono..."
          className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Users size={19} />
            </div>

            <div>
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

        <div className="grid grid-cols-6 bg-slate-50/70 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <span>Familia</span>
          <span>Acudiente</span>
          <span>Niño</span>
          <span>Plan</span>
          <span>Disponibles</span>
          <span></span>
        </div>

        {filteredFamilies.length > 0 ? (
          filteredFamilies.map((family) => {
            const lowBalance = family.available <= 2

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
                    {family.phone}
                  </p>
                </div>

                <p className="text-sm text-slate-600">
                  {family.parent}
                </p>

                <p className="text-sm text-slate-600">
                  {family.child}
                </p>

                <p className="text-sm text-slate-600">
                  {family.plan}
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

                <div className="flex justify-end">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-purple-50 hover:text-purple-600">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </button>
            )
          })
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Search size={20} />
            </div>

            <p className="mt-4 font-semibold text-slate-700">
              No encontramos familias
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Intenta con otro nombre, acudiente o teléfono.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Families