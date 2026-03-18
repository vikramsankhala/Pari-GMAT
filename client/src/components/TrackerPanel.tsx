import { useState, useEffect } from 'react'
import {
  PROBLEM_AREAS,
  STORAGE_KEYS,
  type ScoreEntry,
} from '../data/tracker'
import { MOCK_QUESTIONS } from '../data/mockTests'
import { GUIDED_QUESTIONS } from '../data/guidedPractice'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

const TARGET_SCORE = 700

export default function TrackerPanel() {
  const [scores, setScores] = useState<ScoreEntry[]>([])
  const [problemAreas, setProblemAreas] = useState<Set<string>>(new Set())
  const [newScore, setNewScore] = useState({
    date: new Date().toISOString().slice(0, 10),
    total: 0,
    quant: 0,
    verbal: 0,
    dataInsights: 0,
  })

  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEYS.scores)
      if (s) setScores(JSON.parse(s))
      const p = localStorage.getItem(STORAGE_KEYS.problemAreas)
      if (p) setProblemAreas(new Set(JSON.parse(p)))
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.scores, JSON.stringify(scores))
  }, [scores])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.problemAreas, JSON.stringify([...problemAreas]))
  }, [problemAreas])

  const addScore = () => {
    if (!newScore.date || newScore.total < 205) return
    setScores((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        date: newScore.date,
        total: newScore.total,
        quant: newScore.quant,
        verbal: newScore.verbal,
        dataInsights: newScore.dataInsights,
      },
    ].sort((a, b) => a.date.localeCompare(b.date)))
    setNewScore({ date: new Date().toISOString().slice(0, 10), total: 0, quant: 0, verbal: 0, dataInsights: 0 })
  }

  const toggleProblemArea = (id: string) => {
    setProblemAreas((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const getTargetedProblems = () => {
    const areas = [...problemAreas]
    if (areas.length === 0) {
      return { mock: MOCK_QUESTIONS.slice(0, 6), guided: GUIDED_QUESTIONS }
    }
    const sectionsNeeded = new Set<string>()
    areas.forEach((id) => {
      const a = PROBLEM_AREAS.find((x) => x.id === id)
      if (a) sectionsNeeded.add(a.section)
    })
    const mockMatches = MOCK_QUESTIONS.filter((q) => sectionsNeeded.has(q.section))
    const guidedMatches = GUIDED_QUESTIONS.filter((q) => {
      const s = q.section.toLowerCase()
      return (sectionsNeeded.has('quant') && s.includes('quant')) ||
        (sectionsNeeded.has('verbal') && s.includes('verbal')) ||
        (sectionsNeeded.has('data-insights') && s.includes('data'))
    })
    return {
      mock: mockMatches.length > 0 ? mockMatches : MOCK_QUESTIONS.slice(0, 6),
      guided: guidedMatches.length > 0 ? guidedMatches : GUIDED_QUESTIONS,
    }
  }

  const chartData = scores.map((s) => ({
    date: s.date.slice(0, 10),
    total: s.total,
    quant: s.quant,
    verbal: s.verbal,
    di: s.dataInsights,
  }))

  const latestScore = scores.length > 0 ? scores[scores.length - 1].total : 0
  const progressPct = Math.min(100, ((latestScore - 580) / (TARGET_SCORE - 580)) * 100)
  const { mock, guided } = getTargetedProblems()

  return (
    <div className="space-y-6">
      <div className="bg-primary-50 border border-primary-200 rounded-2xl p-4">
        <h3 className="font-semibold text-slate-800 mb-2">Score & Improvement Tracker</h3>
        <p className="text-sm text-slate-700">
          Log mock scores, track problem areas, and get targeted practice for improvement.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Log Score</h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <input
            type="date"
            value={newScore.date}
            onChange={(e) => setNewScore((s) => ({ ...s, date: e.target.value }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Total"
            value={newScore.total || ''}
            onChange={(e) => setNewScore((s) => ({ ...s, total: +e.target.value || 0 }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Quant"
            value={newScore.quant || ''}
            onChange={(e) => setNewScore((s) => ({ ...s, quant: +e.target.value || 0 }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Verbal"
            value={newScore.verbal || ''}
            onChange={(e) => setNewScore((s) => ({ ...s, verbal: +e.target.value || 0 }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="DI"
            value={newScore.dataInsights || ''}
            onChange={(e) => setNewScore((s) => ({ ...s, dataInsights: +e.target.value || 0 }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <button
          onClick={addScore}
          disabled={!newScore.date || newScore.total < 205}
          className="mt-3 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-50"
        >
          Add score
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Progress to target (700)</h4>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-6 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all"
              style={{ width: `${Math.max(0, progressPct)}%` }}
            />
          </div>
          <span className="text-sm font-bold text-primary-600">
            {scores.length > 0 ? latestScore : '—'} / 700
          </span>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-4">Score trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis domain={[500, 800]} tick={{ fontSize: 10 }} />
                <Tooltip />
                <ReferenceLine y={700} stroke="#7c3aed" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="total" stroke="#7c3aed" strokeWidth={2} dot={{ r: 4 }} name="Total" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Problem areas</h4>
        <p className="text-xs text-slate-500 mb-2">Select areas to focus on. Targeted problems will update below.</p>
        <div className="flex flex-wrap gap-2">
          {PROBLEM_AREAS.map((a) => (
            <button
              key={a.id}
              onClick={() => toggleProblemArea(a.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                problemAreas.has(a.id) ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Targeted problems for improvement</h4>
        <p className="text-xs text-slate-500 mb-3">
          {problemAreas.size > 0
            ? `Based on your selected problem areas. Practice in Mock Tests or Guided Practice.`
            : `Select problem areas above, or practice these general questions.`}
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-slate-700 mb-2">Mock Tests → practice in Mock Tests tab</h5>
            <ul className="space-y-1 text-sm text-slate-700">
              {mock.map((q) => (
                <li key={q.id}>
                  <span className="font-medium">{q.id}</span> — {q.section} • {q.type} ({q.difficulty})
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-slate-700 mb-2">Guided Practice → practice in Guided Practice tab</h5>
            <ul className="space-y-1 text-sm text-slate-700">
              {guided.map((q) => (
                <li key={q.id}>
                  <span className="font-medium">{q.id}</span> — {q.section} • {q.type} ({q.difficulty})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
