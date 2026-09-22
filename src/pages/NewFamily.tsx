import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFamiliesContext } from '../hooks/useFamiliesContext'

function NewFamily() {
  const navigate = useNavigate()
  const { addFamily } = useFamiliesContext()

  const [form, setForm] = useState({
    family: '',
    parent: '',
    child: '',
    phone: '',
    total: 10,
  })

 const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault()

  addFamily({
    family: form.family,
    parent: form.parent,
    child: form.child,
    phone: form.phone,
    total: form.total,
  })

  navigate('/familias')
}

  return (
    <div className="p-8">
      <button
        onClick={() => navigate('/familias')}
        className="mb-6 text-sm font-semibold text-purple-600 hover:text-purple-800"
      >
        ← Volver a familias
      </button>

      <div className="max-w-3xl">
        <div>
          <p className="text-sm font-semibold text-purple-600">
            Nuevo registro
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            Nueva familia
          </h2>

          <p className="mt-2 text-slate-500">
            Registra la información básica y asigna una membresía.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Nombre de la familia
              </label>

              <input
                required
                type="text"
                value={form.family}
                onChange={(event) =>
                  setForm({
                    ...form,
                    family: event.target.value,
                  })
                }
                placeholder="Ej. Familia Valencia"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Nombre del acudiente
              </label>

              <input
                required
                type="text"
                value={form.parent}
                onChange={(event) =>
                  setForm({
                    ...form,
                    parent: event.target.value,
                  })
                }
                placeholder="Nombre completo"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Nombre del niño
              </label>

              <input
                required
                type="text"
                value={form.child}
                onChange={(event) =>
                  setForm({
                    ...form,
                    child: event.target.value,
                  })
                }
                placeholder="Nombre completo"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Teléfono
              </label>

              <input
                required
                type="text"
                value={form.phone}
                onChange={(event) =>
                  setForm({
                    ...form,
                    phone: event.target.value,
                  })
                }
                placeholder="300 000 0000"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Membresía
              </label>

              <select
                value={form.total}
                onChange={(event) =>
                  setForm({
                    ...form,
                    total: Number(event.target.value),
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-400"
              >
                <option value={4}>Paquete de 4 ingresos</option>
                <option value={8}>Paquete de 8 ingresos</option>
                <option value={10}>Paquete de 10 ingresos</option>
                <option value={12}>Paquete de 12 ingresos</option>
                <option value={20}>Paquete de 20 ingresos</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/familias')}
              className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
            >
              Registrar familia
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewFamily