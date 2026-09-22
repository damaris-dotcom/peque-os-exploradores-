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
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          <p className="mt-2 text-sm text-slate-400">
            {detail}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
          <Icon
            size={22}
            strokeWidth={2}
          />
        </div>
      </div>
    </div>
  )
}

export default StatCard