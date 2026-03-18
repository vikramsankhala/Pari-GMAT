export default function StatsCards() {
  const stats = [
    { value: '655+', label: 'Top 10%' },
    { value: '715+', label: 'Top 1%' },
    { value: '5 yrs', label: 'Score validity' },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-4 text-center"
        >
          <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
          <div className="text-sm text-slate-600">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
