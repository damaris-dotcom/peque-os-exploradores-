import { Bell, ChevronDown } from 'lucide-react'

function Header() {
  return (
    <header
      className="
        sticky top-0 z-30
        flex min-h-19 items-center justify-between gap-3
        border-b border-slate-200
        bg-white/90
        py-3 pr-4 pl-20
        backdrop-blur

        sm:pr-6
        lg:px-8 lg:py-4
      "
    >
      {/* Título */}
      <div className="min-w-0">
        <p className="hidden text-sm font-medium text-slate-400 sm:block">
          Administración
        </p>

        <h2 className="truncate text-base font-bold text-slate-900 sm:mt-1 sm:text-xl">
          Pequeños Exploradores
        </h2>
      </div>

      {/* Acciones */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {/* Notificaciones */}
        <button
          type="button"
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl border border-slate-200
            text-slate-500
            transition
            hover:bg-slate-50
            hover:text-slate-900
          "
          aria-label="Notificaciones"
        >
          <Bell size={18} />
        </button>

        {/* Usuario */}
        <div
          className="
            flex items-center gap-2
            rounded-2xl border border-slate-200
            bg-white px-2 py-2
            sm:gap-3 sm:px-3
          "
        >
          <div
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-xl bg-purple-100
              text-sm font-bold text-purple-700
            "
          >
            AD
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-900">
              Administrador
            </p>

            <p className="text-xs text-slate-500">
              Demo
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 sm:block"
          />
        </div>
      </div>
    </header>
  )
}

export default Header