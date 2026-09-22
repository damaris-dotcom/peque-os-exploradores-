import {
  LayoutDashboard,
  Users,
  TicketCheck,
  ClipboardList,
  LogIn,
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
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white px-5 py-6">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-violet-500 font-bold text-white shadow-sm">
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

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.label}
              to={item.path}
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

      <div className="mt-auto rounded-2xl border border-purple-100 bg-purple-50 p-4">
        <p className="text-sm font-semibold text-purple-900">
          Demo comercial
        </p>

        <p className="mt-1 text-xs leading-relaxed text-purple-600">
          Información ficticia para demostración.
        </p>
      </div>
    </aside>
  )
}

export default Sidebar