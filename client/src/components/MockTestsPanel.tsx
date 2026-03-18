import { useState } from 'react'
import {
  MOCK_QUESTIONS,
  SECTION_LABELS,
  TYPE_LABELS,
  type MockQuestion,
  type Section,
  type Difficulty,
} from '../data/mockTests'
import {
  SECTION_COMPARISON,
  PROBLEM_AREAS,
  STRATEGY_TIPS,
} from '../data/mockTestAnalysis'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type View = 'practice' | 'comparison' | 'problems' | 'strategies'

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: '#22c55e',
  medium: '#eab308',
  hard: '#ef4444',
}

export default function MockTestsPanel() {
  const [view, setView] = useState<View>('practice')
  const [selectedQuestion, setSelectedQuestion] = useState<MockQuestion | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const sectionCounts = MOCK_QUESTIONS.reduce((acc, q) => {
    acc[q.section] = (acc[q.section] || 0) + 1
    return acc
  }, {} as Record<Section, number>)

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return
    setSelectedAnswer(index)
    setShowExplanation(true)
  }

  const correctIndex = typeof selectedQuestion?.correctAnswer === 'number'
    ? selectedQuestion.correctAnswer
    : selectedQuestion?.options?.indexOf(selectedQuestion.correctAnswer as string) ?? -1

  const tabs = [
    { id: 'practice' as View, label: 'Practice Questions' },
    { id: 'comparison' as View, label: 'Comparative Analysis' },
    { id: 'problems' as View, label: 'Problem Areas' },
    { id: 'strategies' as View, label: 'Techniques & Strategies' },
  ]

  return (
    <div className="space-y-6">
      <p className="text-xs text-slate-500">
        GMAT-style practice questions for preparation. For official mocks, use mba.com.
      </p>
      {view === 'practice' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-wrap gap-2">
            {(['quant', 'verbal', 'data-insights'] as Section[]).map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSelectedQuestion(null)
                  setShowExplanation(false)
                  setSelectedAnswer(null)
                }}
                className="px-3 py-1.5 rounded-lg text-sm bg-slate-100 hover:bg-primary-50 text-slate-700"
              >
                {SECTION_LABELS[s]} ({sectionCounts[s] || 0})
              </button>
            ))}
          </div>

          {!selectedQuestion ? (
            <div className="p-6">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Select a question to practice</h4>
              <div className="space-y-2">
                {MOCK_QUESTIONS.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setSelectedQuestion(q)
                      setShowExplanation(false)
                      setSelectedAnswer(null)
                    }}
                    className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-800">{q.id}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${DIFFICULTY_COLORS[q.difficulty]}20`, color: DIFFICULTY_COLORS[q.difficulty] }}
                      >
                        {q.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{q.stem}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: `${DIFFICULTY_COLORS[selectedQuestion.difficulty]}20`, color: DIFFICULTY_COLORS[selectedQuestion.difficulty] }}
                >
                  {selectedQuestion.difficulty} • {TYPE_LABELS[selectedQuestion.type]}
                </span>
                <button
                  onClick={() => {
                    setSelectedQuestion(null)
                    setShowExplanation(false)
                    setSelectedAnswer(null)
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  ← Back
                </button>
              </div>
              <p className="text-slate-800 mb-4">{selectedQuestion.stem}</p>
              {selectedQuestion.options && (
                <div className="space-y-2 mb-4">
                  {selectedQuestion.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswerSelect(i)}
                      disabled={showExplanation}
                      className={`w-full text-left p-3 rounded-xl border transition-colors ${
                        !showExplanation
                          ? 'border-slate-200 hover:border-primary-400 hover:bg-primary-50/50'
                          : i === correctIndex
                            ? 'border-green-500 bg-green-50'
                            : selectedAnswer === i && i !== correctIndex
                              ? 'border-red-400 bg-red-50'
                              : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              {showExplanation && (
                <div className="p-4 rounded-xl bg-primary-50 border border-primary-200">
                  <h5 className="font-semibold text-slate-800 mb-2">Explanation</h5>
                  <p className="text-sm text-slate-700">{selectedQuestion.explanation}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    Target time: {selectedQuestion.timeTargetSec}s
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {view === 'comparison' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-4">Mock vs Official GMAT — Section Comparison</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SECTION_COMPARISON} layout="vertical" margin={{ left: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="section" tick={{ fontSize: 11 }} width={100} />
                  <Tooltip />
                  <Bar dataKey="secPerQuestion" name="Sec per question" fill="#7c3aed" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 p-4 pb-0">Section-by-Section Breakdown</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left p-3 font-medium">Section</th>
                    <th className="text-left p-3 font-medium">Questions</th>
                    <th className="text-left p-3 font-medium">Time</th>
                    <th className="text-left p-3 font-medium">Key Technique</th>
                  </tr>
                </thead>
                <tbody>
                  {SECTION_COMPARISON.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="p-3 font-medium">{row.section}</td>
                      <td className="p-3">{row.officialQuestions}</td>
                      <td className="p-3">{row.officialMins} min</td>
                      <td className="p-3 text-primary-600">{row.keyTechnique}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {view === 'problems' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <h4 className="text-sm font-semibold text-slate-700 p-4">Common Problem Areas & Solutions</h4>
          <div className="divide-y divide-slate-100">
            {PROBLEM_AREAS.map((area, i) => (
              <div key={i} className="p-4 hover:bg-slate-50/50">
                <h5 className="font-medium text-slate-800">{area.area}</h5>
                <p className="text-sm text-slate-600 mt-1">
                  <span className="text-amber-600">Symptom:</span> {area.symptom}
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  <span className="text-green-600">Strategy:</span> {area.strategy}
                </p>
                <p className="text-sm text-primary-600 mt-1">
                  <span className="text-slate-600">Practice:</span> {area.practiceFocus}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'strategies' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <h4 className="text-sm font-semibold text-slate-700 p-4">Techniques & Strategies by Phase</h4>
          <div className="divide-y divide-slate-100">
            {STRATEGY_TIPS.map((tip, i) => (
              <div key={i} className="p-4 flex gap-4">
                <span className="w-24 shrink-0 font-medium text-primary-600">{tip.phase}</span>
                <p className="text-sm text-slate-700">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((t) => (
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

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <p className="text-sm text-slate-600 mb-2">
          <strong>Get AI advice:</strong> Switch to <span className="text-primary-600 font-medium">GMAT Coach</span> and ask: &quot;Analyze my weak areas from mock tests&quot; or &quot;Give me strategies for Data Sufficiency.&quot;
        </p>
      </div>
    </div>
  )
}
