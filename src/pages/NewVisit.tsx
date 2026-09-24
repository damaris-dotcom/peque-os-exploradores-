import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Search,
  TicketCheck,
  UserRound,
  Phone,
  ChevronRight,
  Users,
  Check,
} from 'lucide-react'

import { useFamiliesContext } from '../hooks/useFamiliesContext'

function NewVisit() {
  const navigate = useNavigate()

  const { families, registerVisit } =
    useFamiliesContext()

  const [search, setSearch] = useState('')

  const [selectedId, setSelectedId] =
    useState<number | null>(null)

  const [selectedChildren, setSelectedChildren] =
    useState<number[]>([])

  const [successMessage, setSuccessMessage] =
    useState('')

  const filteredFamilies = useMemo(() => {
    const term = search.toLowerCase().trim()

    if (!term) {
      return families
    }

    return families.filter((family) => {
      const matchesChild = family.children.some(
        (child) =>
          child.name.toLowerCase().includes(term)
      )

      return (
        family.family
          .toLowerCase()
          .includes(term) ||
        family.parent
          .toLowerCase()
          .includes(term) ||
        matchesChild ||
        family.phone
          .toLowerCase()
          .includes(term)
      )
    })
  }, [families, search])

  const selectedFamily = families.find(
    (family) => family.id === selectedId
  )

  const handleSelectFamily = (
    familyId: number
  ) => {
    setSelectedId(familyId)
    setSelectedChildren([])
    setSuccessMessage('')
  }

  const toggleChild = (childId: number) => {
    if (!selectedFamily) {
      return
    }

    setSelectedChildren((current) => {
      const alreadySelected =
        current.includes(childId)

      if (alreadySelected) {
        return current.filter(
          (id) => id !== childId
        )
      }

      if (
        current.length >=
        selectedFamily.available
      ) {
        return current
      }

      return [...current, childId]
    })
  }

  const handleRegisterVisit = () => {
    if (!selectedFamily) {
      return
    }

    if (selectedChildren.length === 0) {
      return
    }

    if (
      selectedChildren.length >
      selectedFamily.available
    ) {
      return
    }

    const childrenNames =
      selectedFamily.children
        .filter((child) =>
          selectedChildren.includes(child.id)
        )
        .map((child) => child.name)

    registerVisit(
      selectedFamily.id,
      selectedChildren
    )

    setSuccessMessage(
      `Ingreso registrado correctamente para ${childrenNames.join(
        ', '
      )}`
    )

    setSelectedChildren([])

    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
  }

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      {/* Encabezado */}
      <div>
        <p className="text-sm font-semibold text-purple-600">
          Operación
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Registrar ingreso
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
          Busca una familia, selecciona los niños que ingresan y registra la visita.
        </p>
      </div>

      {/* Mensaje de éxito */}
      {successMessage && (
        <div
          className="
            mt-5 flex items-start gap-3
            rounded-2xl
            border border-green-200
            bg-green-50
            p-4
            text-green-800
            sm:mt-6 sm:px-5
          "
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-100">
            ✓
          </div>

          <div className="min-w-0">
            <p className="font-semibold">
              Ingreso registrado
            </p>

            <p className="mt-1 break-words text-sm leading-relaxed text-green-700">
              {successMessage}
            </p>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-6 xl:grid-cols-2">
        {/* Buscar familia */}
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Buscar familia
            </h3>

            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              Busca por familia, acudiente, niño o teléfono.
            </p>
          </div>

          {/* Buscador */}
          <div
            className="
              mt-5 flex items-center gap-3
              rounded-2xl
              border border-slate-200
              px-3 py-3
              transition
              focus-within:border-purple-400
              focus-within:ring-2
              focus-within:ring-purple-100
              sm:px-4
            "
          >
            <Search
              size={18}
              className="shrink-0 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Ej. Mateo, Ramírez o 300..."
              className="
                min-w-0 w-full
                bg-transparent
                text-base text-slate-900
                outline-none
                placeholder:text-slate-400
              "
            />
          </div>

          {/* Resultados */}
          <div className="mt-5 space-y-3">
            {filteredFamilies.length > 0 ? (
              filteredFamilies.map(
                (family) => {
                  const selected =
                    selectedId === family.id

                  const lowBalance =
                    family.available <= 2

                  return (
                    <button
                      key={family.id}
                      type="button"
                      onClick={() =>
                        handleSelectFamily(
                          family.id
                        )
                      }
                      className={`
                        w-full
                        rounded-2xl border
                        p-4 text-left
                        transition
                        ${
                          selected
                            ? 'border-purple-300 bg-purple-50'
                            : 'border-slate-200 hover:border-purple-200 hover:bg-slate-50'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-slate-900">
                            {family.family}
                          </p>

                          <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                            {family.children
                              .map(
                                (child) =>
                                  child.name
                              )
                              .join(', ')}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {
                              family.children
                                .length
                            }{' '}
                            {family.children
                              .length === 1
                              ? 'niño registrado'
                              : 'niños registrados'}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {family.phone}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                          <div className="text-right">
                            <p className="text-[11px] font-medium text-slate-400 sm:text-xs">
                              Disponibles
                            </p>

                            <p
                              className={`
                                mt-1 text-xl font-bold
                                ${
                                  lowBalance
                                    ? 'text-orange-600'
                                    : 'text-green-700'
                                }
                              `}
                            >
                              {family.available}
                            </p>
                          </div>

                          <ChevronRight
                            size={18}
                            className={
                              selected
                                ? 'text-purple-600'
                                : 'text-slate-300'
                            }
                          />
                        </div>
                      </div>
                    </button>
                  )
                }
              )
            ) : (
              <div className="rounded-2xl bg-slate-50 px-4 py-10 text-center sm:px-5 sm:py-12">
                <Search
                  size={22}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 font-semibold text-slate-700">
                  No encontramos familias
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Intenta con otro criterio de búsqueda.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Familia seleccionada */}
        <div className="min-w-0">
          {selectedFamily ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
              {/* Encabezado familia */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-purple-600">
                    Familia seleccionada
                  </p>

                  <h3 className="mt-1 break-words text-xl font-bold text-slate-900 sm:text-2xl">
                    {selectedFamily.family}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {
                      selectedFamily.children
                        .length
                    }{' '}
                    {selectedFamily.children
                      .length === 1
                      ? 'niño asociado'
                      : 'niños asociados'}
                  </p>
                </div>

                <span className="self-start rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                  {selectedFamily.status}
                </span>
              </div>

              {/* Métricas */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-3 sm:gap-4">
                <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
                  <p className="text-sm font-medium text-slate-500">
                    Total
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                    {selectedFamily.total}
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-50 p-4 sm:p-5">
                  <p className="text-sm font-medium text-orange-700">
                    Utilizados
                  </p>

                  <p className="mt-2 text-2xl font-bold text-orange-700 sm:text-3xl">
                    {selectedFamily.used}
                  </p>
                </div>

                <div className="rounded-2xl bg-green-50 p-4 sm:p-5">
                  <p className="text-sm font-medium text-green-700">
                    Disponibles
                  </p>

                  <p className="mt-2 text-2xl font-bold text-green-700 sm:text-3xl">
                    {selectedFamily.available}
                  </p>
                </div>
              </div>

              {/* Selección de niños */}
              <div className="mt-5 rounded-2xl border border-slate-200 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <Users size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">
                      ¿Quiénes ingresan?
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      Selecciona uno o varios niños.
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {selectedFamily.children.map(
                    (child) => {
                      const checked =
                        selectedChildren.includes(
                          child.id
                        )

                      const limitReached =
                        !checked &&
                        selectedChildren.length >=
                          selectedFamily.available

                      return (
                        <button
                          key={child.id}
                          type="button"
                          disabled={
                            limitReached
                          }
                          onClick={() =>
                            toggleChild(
                              child.id
                            )
                          }
                          className={`
                            flex min-h-14
                            w-full items-center
                            justify-between gap-3
                            rounded-2xl border
                            px-4 py-3
                            text-left
                            transition
                            ${
                              checked
                                ? 'border-purple-300 bg-purple-50'
                                : limitReached
                                  ? 'cursor-not-allowed border-slate-100 bg-slate-50 opacity-50'
                                  : 'border-slate-200 hover:border-purple-200 hover:bg-slate-50'
                            }
                          `}
                        >
                          <p className="min-w-0 break-words font-semibold text-slate-800">
                            {child.name}
                          </p>

                          <div
                            className={`
                              flex h-7 w-7
                              shrink-0 items-center
                              justify-center
                              rounded-lg border
                              ${
                                checked
                                  ? 'border-purple-600 bg-purple-600 text-white'
                                  : 'border-slate-300 bg-white text-transparent'
                              }
                            `}
                          >
                            <Check size={16} />
                          </div>
                        </button>
                      )
                    }
                  )}
                </div>

                {selectedChildren.length >
                  0 && (
                  <div className="mt-4 rounded-xl bg-purple-50 px-4 py-3">
                    <p className="text-sm font-medium leading-relaxed text-purple-700">
                      {
                        selectedChildren.length
                      }{' '}
                      {selectedChildren.length ===
                      1
                        ? 'ingreso será descontado'
                        : 'ingresos serán descontados'}{' '}
                      de la membresía.
                    </p>
                  </div>
                )}
              </div>

              {/* Datos acudiente */}
              <div className="mt-5 space-y-4 rounded-2xl border border-slate-200 p-4 sm:mt-6 sm:p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <UserRound size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Acudiente
                    </p>

                    <p className="mt-1 break-words font-medium text-slate-800">
                      {selectedFamily.parent}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <Phone size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Teléfono
                    </p>

                    <p className="mt-1 break-words font-medium text-slate-800">
                      {selectedFamily.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Confirmar */}
              <button
                type="button"
                onClick={
                  handleRegisterVisit
                }
                disabled={
                  selectedFamily.available ===
                    0 ||
                  selectedChildren.length === 0
                }
                className="
                  mt-5 flex min-h-12
                  w-full items-center
                  justify-center gap-2
                  rounded-2xl
                  bg-purple-600
                  px-4 py-3
                  text-center
                  font-semibold text-white
                  shadow-sm
                  transition
                  hover:bg-purple-700
                  disabled:cursor-not-allowed
                  disabled:bg-slate-300
                  sm:mt-6 sm:px-5
                "
              >
                <TicketCheck
                  size={18}
                  className="shrink-0"
                />

                <span>
                  {selectedFamily.available ===
                  0
                    ? 'Sin ingresos disponibles'
                    : selectedChildren.length ===
                        0
                      ? 'Selecciona al menos un niño'
                      : `Confirmar ${selectedChildren.length} ${
                          selectedChildren.length ===
                          1
                            ? 'ingreso'
                            : 'ingresos'
                        }`}
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/familias/${selectedFamily.id}`
                  )
                }
                className="
                  mt-3 min-h-12 w-full
                  rounded-2xl
                  border border-slate-200
                  px-5 py-3
                  font-semibold text-slate-700
                  transition
                  hover:bg-slate-50
                "
              >
                Ver perfil completo
              </button>
            </div>
          ) : (
            <div
              className="
                flex min-h-[280px]
                items-center justify-center
                rounded-2xl
                border border-dashed
                border-slate-300
                bg-white
                p-6
                sm:min-h-[360px]
                sm:rounded-3xl
                sm:p-8
                xl:min-h-[470px]
              "
            >
              <div className="max-w-sm text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                  <TicketCheck size={24} />
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  Selecciona una familia
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Aquí podrás verificar la membresía, seleccionar los niños que ingresan y validar el saldo disponible.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewVisit