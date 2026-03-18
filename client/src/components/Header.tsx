export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold text-lg shrink-0">
              PS
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">
                Pari&apos;s MBA Coach
              </h1>
              <p className="text-sm text-slate-600">
                Personalized GMAT + MBA Application Assistant
              </p>
            </div>
          </div>
          <div className="badge bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
            Target: 695–705+
          </div>
        </div>
      </div>
    </header>
  )
}
