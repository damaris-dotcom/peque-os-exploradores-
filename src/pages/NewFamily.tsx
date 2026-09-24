import {
  useState,
  type FormEvent,
} from 'react'

import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Plus,
  Trash2,
} from 'lucide-react'

import { useFamiliesContext } from '../hooks/useFamiliesContext'

interface ChildForm {
  id: number
  name: string
}

function NewFamily() {
  const navigate = useNavigate()

  const { addFamily } = useFamiliesContext()

  const [form, setForm] = useState({
    family: '',
    parent: '',
    phone: '',
    total: 10,
  })

  const [children, setChildren] =
    useState<ChildForm[]>(() => [
      {
        id: 1,
        name: '',
      },
    ])

  const addChild = () => {
    setChildren((current) => {
      const nextId =
        current.length > 0
          ? Math.max(
              ...current.map(
                (child) => child.id
              )
            ) + 1
          : 1

      return [
        ...current,
        {
          id: nextId,
          name: '',
        },
      ]
    })
  }

  const updateChild = (
    childId: number,
    name: string
  ) => {
    setChildren((current) =>
      current.map((child) =>
        child.id === childId
          ? {
              ...child,
              name,
            }
          : child
      )
    )
  }

  const removeChild = (
    childId: number
  ) => {
    setChildren((current) => {
      if (current.length === 1) {
        return current
      }

      return current.filter(
        (child) =>
          child.id !== childId
      )
    })
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const validChildren =
      children
        .map((child) => ({
          ...child,
          name: child.name.trim(),
        }))
        .filter(
          (child) =>
            child.name.length > 0
        )

    if (
      validChildren.length === 0
    ) {
      return
    }

    addFamily({
      family: form.family.trim(),
      parent: form.parent.trim(),
      phone: form.phone.trim(),
      total: form.total,
      children: validChildren,
    })

    navigate('/familias')
  }

  const inputClassName = `
    w-full
    rounded-xl
    border border-slate-200
    bg-white
    px-4 py-3
    text-base text-slate-900
    outline-none
    transition
    placeholder:text-slate-400
    focus:border-purple-400
    focus:ring-2
    focus:ring-purple-100
  `

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      {/* Volver */}
      <button
        type="button"
        onClick={() =>
          navigate('/familias')
        }
        className="
          mb-5 flex items-center gap-2
          text-sm font-semibold
          text-purple-600
          transition hover:text-purple-800
          sm:mb-6
        "
      >
        <ArrowLeft size={17} />
        Volver a familias
      </button>

      <div className="mx-auto w-full max-w-3xl">
        {/* Encabezado */}
        <div>
          <p className="text-sm font-semibold text-purple-600">
            Nuevo registro
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Nueva familia
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
            Registra la información básica, agrega uno o varios niños y asigna una membresía.
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="
            mt-6
            rounded-2xl
            border border-slate-200
            bg-white
            p-4
            shadow-sm
            sm:mt-8
            sm:rounded-3xl
            sm:p-6
            lg:p-8
          "
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {/* Familia */}
            <div>
              <label
                htmlFor="family"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Nombre de la familia
              </label>

              <input
                id="family"
                required
                type="text"
                value={form.family}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    family:
                      event.target.value,
                  }))
                }
                placeholder="Ej. Familia Valencia"
                className={inputClassName}
              />
            </div>

            {/* Acudiente */}
            <div>
              <label
                htmlFor="parent"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Nombre del acudiente
              </label>

              <input
                id="parent"
                required
                type="text"
                value={form.parent}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    parent:
                      event.target.value,
                  }))
                }
                placeholder="Nombre completo"
                className={inputClassName}
              />
            </div>

            {/* Teléfono */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Teléfono
              </label>

              <input
                id="phone"
                required
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    phone:
                      event.target.value,
                  }))
                }
                placeholder="300 000 0000"
                className={inputClassName}
              />
            </div>

            {/* Membresía */}
            <div>
              <label
                htmlFor="membership"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Membresía
              </label>

              <select
                id="membership"
                value={form.total}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    total: Number(
                      event.target.value
                    ),
                  }))
                }
                className={inputClassName}
              >
                <option value={4}>
                  Paquete de 4 ingresos
                </option>

                <option value={8}>
                  Paquete de 8 ingresos
                </option>

                <option value={10}>
                  Paquete de 10 ingresos
                </option>

                <option value={12}>
                  Paquete de 12 ingresos
                </option>

                <option value={20}>
                  Paquete de 20 ingresos
                </option>
              </select>
            </div>

            {/* Niños */}
            <div className="md:col-span-2">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <label className="block text-sm font-semibold text-slate-700">
                    Niños asociados
                  </label>

                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    Puedes registrar varios niños dentro de la misma membresía familiar.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addChild}
                  className="
                    flex min-h-11 w-full
                    shrink-0 items-center
                    justify-center gap-2
                    rounded-xl
                    border border-purple-200
                    bg-purple-50
                    px-4 py-2
                    text-sm font-semibold
                    text-purple-700
                    transition
                    hover:bg-purple-100
                    sm:w-auto
                  "
                >
                  <Plus size={16} />
                  Agregar niño
                </button>
              </div>

              {/* Lista de niños */}
              <div className="mt-4 space-y-4">
                {children.map(
                  (child, index) => (
                    <div
                      key={child.id}
                      className="
                        flex items-end gap-2
                        sm:gap-3
                      "
                    >
                      <div className="min-w-0 flex-1">
                        <label
                          htmlFor={`child-${child.id}`}
                          className="
                            mb-2 block
                            text-xs font-semibold
                            uppercase tracking-wide
                            text-slate-400
                          "
                        >
                          Niño {index + 1}
                        </label>

                        <input
                          id={`child-${child.id}`}
                          required
                          type="text"
                          value={child.name}
                          onChange={(event) =>
                            updateChild(
                              child.id,
                              event.target.value
                            )
                          }
                          placeholder="Nombre completo"
                          className={inputClassName}
                        />
                      </div>

                      {children.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeChild(
                              child.id
                            )
                          }
                          className="
                            flex h-12 w-12
                            shrink-0 items-center
                            justify-center
                            rounded-xl
                            border border-red-100
                            bg-red-50
                            text-red-600
                            transition
                            hover:bg-red-100
                          "
                          title="Eliminar niño"
                          aria-label={`Eliminar niño ${index + 1}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div
            className="
              mt-7
              flex flex-col-reverse gap-3
              sm:mt-8
              sm:flex-row
              sm:justify-end
            "
          >
            <button
              type="button"
              onClick={() =>
                navigate('/familias')
              }
              className="
                min-h-12 w-full
                rounded-xl
                border border-slate-200
                px-5 py-3
                font-semibold text-slate-700
                transition
                hover:bg-slate-50
                sm:w-auto
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="
                min-h-12 w-full
                rounded-xl
                bg-purple-600
                px-6 py-3
                font-semibold text-white
                transition
                hover:bg-purple-700
                sm:w-auto
              "
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