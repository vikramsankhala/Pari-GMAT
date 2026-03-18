import { useState } from 'react'
import { SUGGESTED_COLLEGES } from '../data/suggestedColleges'
import { PARI_PROFILE } from '../data/pariProfile'

export default function SuggestedCollegesPanel() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="space-y-6">
      <div className="bg-primary-50 border border-primary-200 rounded-2xl p-4">
        <h3 className="font-semibold text-slate-800 mb-2">Why these colleges for Pari?</h3>
        <p className="text-sm text-slate-700">
          Based on <strong>{PARI_PROFILE.name}&apos;s</strong> profile: {PARI_PROFILE.summary} These schools value
          creative-industry pivots, offer media/entertainment exposure, and fit a target GMAT of 695–705.
        </p>
      </div>

      <div className="space-y-4">
        {SUGGESTED_COLLEGES.map((college) => (
          <div
            key={college.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleExpand(college.id)}
              className="w-full text-left p-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">{college.name}</h4>
                  <p className="text-sm text-slate-600">{college.city}, {college.country}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-primary-600">{college.medianGmat} median GMAT</span>
                  <span className="text-slate-400">{expandedId === college.id ? '▲' : '▼'}</span>
                </div>
              </div>
              <p className="text-sm text-primary-700 mt-2 font-medium">{college.fitReason}</p>
            </button>

            {expandedId === college.id && (
              <div className="border-t border-slate-100 p-4 space-y-6 bg-slate-50/30">
                <div className="grid sm:grid-cols-2 gap-4">
                  <InfoBlock title="Program & Duration" items={[`${college.program} • ${college.duration}`, `Intake: ${college.intake}`]} />
                  <InfoBlock title="Tuition" items={[`~$${college.tuitionUsd.toLocaleString()}`, college.tuitionNote]} />
                  <InfoBlock title="Application" items={[college.applicationDeadline]} />
                  <InfoBlock title="Ranking" items={[college.ranking]} />
                </div>

                <div>
                  <h5 className="font-semibold text-slate-800 mb-2">Strengths</h5>
                  <div className="flex flex-wrap gap-2">
                    {college.strengths.map((s, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-slate-800 mb-2">Placement</h5>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Top sectors</p>
                      <ul className="list-disc list-inside text-slate-700">{college.placement.topSectors.map((x, i) => <li key={i}>{x}</li>)}</ul>
                    </div>
                    <div>
                      <p className="text-slate-500">Avg salary</p>
                      <p className="font-medium text-slate-800">{college.placement.avgSalary}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Top recruiters</p>
                      <p className="text-slate-700">{college.placement.topRecruiters.join(', ')}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-slate-800 mb-2">Scholarships</h5>
                  <p className="text-sm text-slate-700">{college.scholarships.join(' • ')}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-1">Campus</h5>
                    <p className="text-sm text-slate-700">{college.campus}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-1">Culture</h5>
                    <p className="text-sm text-slate-700">{college.culture}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-1">Indian students</h5>
                    <p className="text-sm text-slate-700">{college.indianStudents}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-1">Media & entertainment</h5>
                    <p className="text-sm text-slate-700">{college.mediaEntertainment}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  {college.website.startsWith('http') && (
                    <a
                      href={college.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700"
                    >
                      Visit website
                    </a>
                  )}
                  <p className="text-sm text-slate-600">{college.notes}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h5 className="font-semibold text-slate-800 mb-1 text-sm">{title}</h5>
      <ul className="text-sm text-slate-700">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
