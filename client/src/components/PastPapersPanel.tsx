import { useState } from 'react'
import {
  SECTION_ANALYSIS,
  YEAR_TRENDS,
  PARI_INSIGHTS,
} from '../data/pastPapersAnalysis'
import { PARI_PROFILE } from '../data/pariProfile'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type View = 'analysis' | 'trends' | 'pari-insights'

export default function PastPapersPanel() {
  const [view, setView] = useState<View>('analysis')

  const typeData = SECTION_ANALYSIS.flatMap((s) =>
    s.questionTypes.map((t) => (
      { name: `${s.section}: ${t.type}`, value: t.pct, section: s.section }
    ))
  )

  return (
    <div className="space-y-6">
      <div className="bg-primary-50 border border-primary-200 rounded-2xl p-4">
        <h3 className="font-semibold text-slate-800 mb-2">Past Years Question Paper Analysis</h3>
        <p className="text-sm text-slate-700">
          Based on <strong>{PARI_PROFILE.name}&apos;s</strong> target (695–705). Question type patterns, difficulty trends, and personalized insights for Pari.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { id: 'analysis' as View, label: 'Section Analysis' },
          { id: 'trends' as View, label: 'Year Trends' },
          { id: 'pari-insights' as View, label: 'Pari-Specific Insights' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setView(t.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              view === t.id ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {view === 'analysis' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-4">Question Type Distribution</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typeData} layout="vertical" margin={{ left: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 70]} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={120} />
                  <Tooltip />
                  <Bar dataKey="value" name="Weight %" fill="#7c3aed" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 p-4 pb-0">Detailed Section Breakdown</h4>
            <div className="divide-y divide-slate-100">
              {SECTION_ANALYSIS.map((section, i) => (
                <div key={i} className="p-4">
                  <h5 className="font-medium text-slate-800 mb-2">{section.section}</h5>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {section.questionTypes.map((t, j) => (
                      <span key={j} className="text-xs px-2 py-1 rounded-lg bg-primary-100 text-primary-700">
                        {t.type}: {t.pct}% (~{t.avgTimeSec}s)
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600">
                    Difficulty: {section.difficultySplit.easy}% easy, {section.difficultySplit.medium}% medium, {section.difficultySplit.hard}% hard
                  </p>
                  <p className="text-xs text-primary-600 mt-1">
                    High yield: {section.highYieldTopics.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'trends' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <h4 className="text-sm font-semibold text-slate-700 p-4">Year-by-Year Focus Trends</h4>
          <div className="divide-y divide-slate-100">
            {YEAR_TRENDS.map((t, i) => (
              <div key={i} className="p-4 hover:bg-slate-50/50">
                <h5 className="font-medium text-primary-600">{t.year}</h5>
                <div className="grid sm:grid-cols-3 gap-3 mt-2 text-sm">
                  <div>
                    <span className="text-slate-500">Quant:</span>
                    <p className="text-slate-700">{t.quantFocus}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Verbal:</span>
                    <p className="text-slate-700">{t.verbalFocus}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">DI:</span>
                    <p className="text-slate-700">{t.diFocus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'pari-insights' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">For Pari — Target {PARI_INSIGHTS.targetScore}</h4>
            <div className="space-y-4">
              {PARI_INSIGHTS.focusAreas.map((f, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <h5 className="font-medium text-slate-800">{f.area}</h5>
                  <p className="text-sm text-slate-600 mt-1">{f.reason}</p>
                  <p className="text-sm text-primary-600 mt-1 font-medium">{f.action}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Time Strategy</h4>
            <p className="text-sm text-slate-700">{PARI_INSIGHTS.timeStrategy}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Weak Area Tracker</h4>
            <p className="text-sm text-slate-700">{PARI_INSIGHTS.weakAreaTracker}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <p className="text-sm text-slate-600">
          <strong>Ask Pari&apos;s MBA Coach:</strong> Switch to <span className="text-primary-600 font-medium">GMAT Coach</span> to ask: &quot;Which question types should I prioritize for my 695 target?&quot; or &quot;Analyze my weak areas from past paper patterns.&quot;
        </p>
      </div>
    </div>
  )
}
