import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts'
import { MOCK_TEST_STRATEGY, TARGET_SCORE, STRETCH_GOAL, BASELINE_SCORE } from '../data/mockTestStrategy'

const COLORS = ['#7c3aed', '#a78bfa', '#c4b5fd', '#ddd6fe']

export default function StrategySection() {
  const sectionData = [
    { name: 'Quant', score: 72, target: 74, fill: '#7c3aed' },
    { name: 'Verbal', score: 70, target: 72, fill: '#8b5cf6' },
    { name: 'Data Insights', score: 73, target: 75, fill: '#a78bfa' },
  ]

  const percentileData = [
    { name: 'Current (695)', value: 85, color: '#7c3aed' },
    { name: 'Target (705)', value: 90, color: '#a78bfa' },
    { name: 'Stretch (715)', value: 95, color: '#c4b5fd' },
  ]

  const progressPercent = Math.min(
    100,
    ((MOCK_TEST_STRATEGY[MOCK_TEST_STRATEGY.length - 1]?.totalScore ?? BASELINE_SCORE) - BASELINE_SCORE) /
      (TARGET_SCORE - BASELINE_SCORE) *
      100
  )

  return (
    <section className="mb-8">
      <h3 className="text-lg font-bold text-slate-800 mb-4">📊 Mock Test Strategy & Progress</h3>
      <p className="text-sm text-slate-600 mb-6">
        Every 3 days mock test schedule with improvement targets — from baseline to target score
      </p>

      <div className="space-y-6">
        {/* Mock score trend line chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Score Trend (Every 3 Days → Weekly Milestones)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_TEST_STRATEGY}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis domain={[550, 750]} tick={{ fontSize: 11 }} />
                <Tooltip labelFormatter={(label) => `Week: ${label}`} />
                <ReferenceLine y={TARGET_SCORE} stroke="#7c3aed" strokeDasharray="5 5" />
                <ReferenceLine y={STRETCH_GOAL} stroke="#a78bfa" strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="totalScore"
                  stroke="#7c3aed"
                  strokeWidth={2}
                  dot={{ fill: '#7c3aed', r: 4 }}
                  name="Total Score"
                />
                <Line
                  type="monotone"
                  dataKey="improvementTarget"
                  stroke="#94a3b8"
                  strokeDasharray="5 5"
                  strokeWidth={1.5}
                  dot={{ fill: '#94a3b8', r: 3 }}
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2 text-xs text-slate-500">
            <span>— Total Score</span>
            <span>- - - Target</span>
            <span className="text-primary-600">━━ 700 (Goal)</span>
            <span className="text-primary-400">━ 715 (Stretch)</span>
          </div>
        </div>

        {/* Section breakdown bar chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Section Scores vs Target</h4>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectionData} layout="vertical" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" domain={[60, 90]} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={100} />
                <Tooltip />
                <Bar dataKey="score" name="Current" radius={[0, 4, 4, 0]}>
                  {sectionData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
                <Bar dataKey="target" name="Target" fill="none" stroke="#94a3b8" strokeDasharray="4 2" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Target progress gauge */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Progress to Target (580 → 700)</h4>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-6 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-sm font-bold text-primary-600 whitespace-nowrap">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>580 (Baseline)</span>
            <span>700 (Target)</span>
          </div>
        </div>

        {/* Mock test table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 p-4 pb-0">Mock Test Schedule</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left p-3 font-medium text-slate-700">Week</th>
                  <th className="text-right p-3 font-medium text-slate-700">Total</th>
                  <th className="text-right p-3 font-medium text-slate-700">Quant</th>
                  <th className="text-right p-3 font-medium text-slate-700">Verbal</th>
                  <th className="text-right p-3 font-medium text-slate-700">DI</th>
                  <th className="text-right p-3 font-medium text-slate-700">Next Target</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_TEST_STRATEGY.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-3 text-slate-700">{row.date}</td>
                    <td className="p-3 text-right font-medium text-primary-600">{row.totalScore}</td>
                    <td className="p-3 text-right text-slate-600">{row.quant}</td>
                    <td className="p-3 text-right text-slate-600">{row.verbal}</td>
                    <td className="p-3 text-right text-slate-600">{row.dataInsights}</td>
                    <td className="p-3 text-right text-slate-500">{row.improvementTarget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* GMAT exam structure - time per section */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">GMAT Exam Structure — Time & Questions</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { section: 'Quant', questions: 21, mins: 45, secPerQ: 128 },
                  { section: 'Verbal', questions: 23, mins: 45, secPerQ: 117 },
                  { section: 'Data Insights', questions: 20, mins: 45, secPerQ: 135 },
                ]}
                layout="vertical"
                margin={{ left: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 150]} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="section" tick={{ fontSize: 11 }} width={100} />
                <Tooltip />
                <Bar dataKey="secPerQ" name="sec/q" fill="#7c3aed" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Total: 64 questions, 2hr 25min • 10 min break allowed • Computer adaptive
          </p>
        </div>

        {/* GMAT percentile context */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">GMAT Percentile Context</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={percentileData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}th %`}
                >
                  {percentileData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area chart - cumulative improvement */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Score Improvement Over Time</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_TEST_STRATEGY}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis domain={[550, 750]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <ReferenceLine y={700} stroke="#7c3aed" strokeDasharray="5 5" />
                <Area
                  type="monotone"
                  dataKey="totalScore"
                  stroke="#7c3aed"
                  strokeWidth={2}
                  fill="url(#scoreGradient)"
                  name="Total Score"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
