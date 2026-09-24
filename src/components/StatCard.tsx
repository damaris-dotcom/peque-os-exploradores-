import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  detail: string
  icon: LucideIcon
}

function StatCard({
  title,
  value,
  detail,
  icon: Icon,
}: StatCardProps) {
  return (
    <div
      className="
        min-w-0
        rounded-2xl border border-slate-200
        bg-white
        p-4 shadow-sm
        transition
        sm:rounded-3xl sm:p-5
        lg:p-6
        lg:hover:-translate-y-0.5
        lg:hover:shadow-md
      "
    >
      <div className="flex items-start justify-between gap-4">
        {/* Información */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium leading-snug text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:mt-3 sm:text-3xl">
            {value}
          </p>

          <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:mt-2 sm:text-sm">
            {detail}
          </p>
        </div>

        {/* Ícono */}
        <div
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            bg-purple-50 text-purple-600
            sm:h-12 sm:w-12 sm:rounded-2xl
          "
        >
          <Icon
            size={20}
            strokeWidth={2}
            className="sm:h-[22px] sm:w-[22px]"
          />
        </div>
      </div>
    </div>
  )
}

export default StatCard