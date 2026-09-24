import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  TicketCheck,
  ClipboardList,
  LogIn,
  Menu,
  X,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

const menuItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/',
  },
  {
    label: 'Familias',
    icon: Users,
    path: '/familias',
  },
  {
    label: 'Membresías',
    icon: TicketCheck,
    path: '/membresias',
  },
  {
    label: 'Visitas',
    icon: ClipboardList,
    path: '/visitas',
  },
  {
    label: 'Nuevo ingreso',
    icon: LogIn,
    path: '/nuevo-ingreso',
  },
]

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Botón menú para celular y tablet */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
        aria-label="Abrir menú"
      >
        <Menu size={22} />
      </button>

      {/* Fondo oscuro cuando el menú móvil está abierto */}
      {isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-[2px] lg:hidden"
          aria-label="Cerrar menú"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-70 flex-col
          border-r border-slate-200 bg-white px-5 py-6
          shadow-xl transition-transform duration-300 ease-in-out

          ${
            isOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }

          lg:w-64
          lg:translate-x-0
          lg:shadow-none
        `}
      >
        {/* Encabezado */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-purple-600 to-violet-500 font-bold text-white shadow-sm">
              PE
            </div>

            <div>
              <h1 className="font-bold leading-tight text-slate-900">
                Pequeños
              </h1>

              <p className="text-sm text-slate-500">
                Exploradores
              </p>
            </div>
          </div>

          {/* Cerrar menú solo en móvil/tablet */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navegación */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <Icon
                  size={19}
                  strokeWidth={2}
                />

                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Pie del sidebar */}
        <div className="mt-auto rounded-2xl border border-purple-100 bg-purple-50 p-4">
          <p className="text-sm font-semibold text-purple-900">
            Demo comercial
          </p>

          <p className="mt-1 text-xs leading-relaxed text-purple-600">
            Información ficticia para demostración.
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar