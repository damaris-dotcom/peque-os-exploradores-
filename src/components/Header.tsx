import { Bell, ChevronDown } from 'lucide-react'

function Header() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 px-8 py-4 backdrop-blur">
      <div>
        <p className="text-sm font-medium text-slate-400">
          Administración
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-900">
          Pequeños Exploradores
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
        >
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-sm font-bold text-purple-700">
            AD
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">
              Administrador
            </p>

            <p className="text-xs text-slate-500">
              Demo
            </p>
          </div>

          <ChevronDown
            size={16}
            className="text-slate-400"
          />
        </div>
      </div>
    </header>
  )
}

export default Header