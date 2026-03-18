import { useState, useMemo } from 'react'
import { CHEATSHEETS } from '../data/cheatsheets'
import { TOPIC_BREAKDOWN } from '../data/topicAnalysis'
import { TARGET_COLLEGES } from '../data/targetColleges'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

type View = 'cheatsheets' | 'topic-analysis' | 'college-strategy'

const SECTION_COLORS: Record<string, string> = {
  Quant: '#7c3aed',
  Verbal: '#0ea5e9',
  'Data Insights': '#10b981',
}

const DIFF_COLORS = { easy: '#22c55e', medium: '#eab308', hard: '#ef4444' }

export default function ShortcutsPanel() {
  const [view, setView] = useState<View>('cheatsheets')
  const [selectedSection, setSelectedSection] = useState<string>('all')
  const [selectedColleges, setSelectedColleges] = useState<Set<string>>(new Set())

  const filteredCheatsheets = useMemo(() => {
    if (selectedSection === 'all') return CHEATSHEETS
    return CHEATSHEETS.filter((c) => c.section === selectedSection)
  }, [selectedSection])


  const targetScore = useMemo(() => {
    if (selectedColleges.size === 0) return 700
    const colleges = TARGET_COLLEGES.filter((c) => selectedColleges.has(c.id))
    const maxMedian = Math.max(...colleges.map((c) => c.medianGmat))
    const maxP75 = Math.max(...colleges.map((c) => c.percentile75))
    return Math.max(maxMedian, maxP75, 700)
  }, [selectedColleges])

  const strategyRecommendations = useMemo(() => {
    const recs: string[] = []
    if (targetScore >= 720) {
      recs.push('Target 720+: Aim for 90th+ percentile in all sections. Prioritize Quant and DI.')
      recs.push('Focus on high-weight topics: Arithmetic (35%), Algebra (30%), RC (35%), CR (35%).')
    } else if (targetScore >= 700) {
      recs.push('Target 700: Strengthen weak section; maintain 75th+ in others.')
      recs.push('Master Data Sufficiency (AD/BCE); practice RC main idea under 60 sec.')
    } else {
      recs.push('Target 695–700: Build consistency. Prioritize accuracy over speed.')
      recs.push('Focus on medium-difficulty topics first; avoid getting stuck on hard.')
    }
    recs.push('Take 2+ official mocks (mba.com) before exam.')
    recs.push('Use cheatsheets for each question type; practice under timed conditions.')
    return recs
  }, [targetScore])

  const toggleCollege = (id: string) => {
    setSelectedColleges((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const pieData = TOPIC_BREAKDOWN.map((t) => ({
    name: `${t.section}: ${t.topic.split(' ')[0]}`,
    value: t.weightPct,
    section: t.section,
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'cheatsheets' as View, label: 'Cheatsheets' },
          { id: 'topic-analysis' as View, label: 'Topic Analysis' },
          { id: 'college-strategy' as View, label: 'Target Colleges & Strategy' },
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

      {view === 'cheatsheets' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-wrap gap-2">
            {['all', 'Quant', 'Verbal', 'Data Insights'].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSection(s)}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  selectedSection === s ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s === 'all' ? 'All sections' : s}
              </button>
            ))}
          </div>
          <div className="p-4 max-h-[500px] overflow-y-auto">
            <div className="grid gap-3 sm:grid-cols-2">
              {filteredCheatsheets.map((c, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-medium text-primary-600">{c.section} • {c.type}</span>
                  </div>
                  <p className="font-semibold text-slate-800 text-sm">{c.shortcut}</p>
                  <p className="text-xs text-slate-600 mt-1">{c.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'topic-analysis' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-4">Topic Weight by Section</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" nameKey="name">
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={SECTION_COLORS[entry.section] || '#94a3b8'} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-4">Topic-wise Marks, Difficulty & Scores</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TOPIC_BREAKDOWN} layout="vertical" margin={{ left: 120 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 55]} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="topic" tick={{ fontSize: 10 }} width={120} />
                  <Tooltip />
                  <Bar dataKey="weightPct" name="Weight %" fill="#7c3aed" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 p-4 pb-0">Full Topic Breakdown</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left p-3 font-medium">Section</th>
                    <th className="text-left p-3 font-medium">Topic</th>
                    <th className="text-right p-3 font-medium">Weight</th>
                    <th className="text-left p-3 font-medium">Difficulty</th>
                    <th className="text-right p-3 font-medium">Avg</th>
                    <th className="text-right p-3 font-medium">Top</th>
                    <th className="text-left p-3 font-medium">Strategy</th>
                  </tr>
                </thead>
                <tbody>
                  {TOPIC_BREAKDOWN.map((t, i) => (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="p-3 font-medium">{t.section}</td>
                      <td className="p-3">{t.topic}</td>
                      <td className="p-3 text-right">{t.weightPct}%</td>
                      <td className="p-3">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${DIFF_COLORS[t.difficulty]}20`, color: DIFF_COLORS[t.difficulty] }}>
                          {t.difficulty}
                        </span>
                      </td>
                      <td className="p-3 text-right">{t.avgScore}</td>
                      <td className="p-3 text-right">{t.topScore}</td>
                      <td className="p-3 text-primary-600 text-xs">{t.strategy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {view === 'college-strategy' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Select Target Colleges</h4>
            <p className="text-xs text-slate-500 mb-4">Select colleges to get a personalized score target and strategy.</p>
            <div className="flex flex-wrap gap-2">
              {TARGET_COLLEGES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => toggleCollege(c.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedColleges.has(c.id)
                      ? 'bg-primary-600 text-white ring-2 ring-primary-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Your Target Score</h4>
            <p className="text-2xl font-bold text-primary-600">{targetScore}+</p>
            <p className="text-xs text-slate-500 mt-1">
              {selectedColleges.size > 0
                ? `Based on ${selectedColleges.size} selected college(s). Aim for median or 75th percentile.`
                : 'Select colleges above for a tailored target. Default: 700.'}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Recommended Strategy for Pari</h4>
            <ul className="space-y-2">
              {strategyRecommendations.map((r, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-primary-600 shrink-0">•</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          {selectedColleges.size > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Selected Colleges — Score Ranges</h4>
              <div className="space-y-2">
                {TARGET_COLLEGES.filter((c) => selectedColleges.has(c.id)).map((c) => (
                  <div key={c.id} className="flex justify-between items-center p-3 rounded-xl bg-slate-50">
                    <div>
                      <p className="font-medium text-slate-800">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.country}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary-600">{c.medianGmat} median</p>
                      <p className="text-xs text-slate-500">{c.percentile25}–{c.percentile75} (25th–75th)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
