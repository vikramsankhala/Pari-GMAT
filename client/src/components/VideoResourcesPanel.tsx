import { useState, useEffect, useMemo } from 'react'
import { YOUTUBE_VIDEOS, type YouTubeVideo } from '../data/youtubeVideos'

const API_URL = import.meta.env.VITE_API_URL || ''

const CATEGORY_LABELS: Record<string, string> = {
  quant: 'Quant',
  verbal: 'Verbal',
  'data-insights': 'Data Insights',
  strategy: 'Strategy',
  resource: 'Resource',
}

export default function VideoResourcesPanel() {
  const [availability, setAvailability] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  const filteredVideos = useMemo(() => {
    let list = YOUTUBE_VIDEOS
    if (filter !== 'all') list = list.filter((v) => v.category === filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.channel.toLowerCase().includes(q) ||
          (v.topic && v.topic.toLowerCase().includes(q))
      )
    }
    return list
  }, [filter, search])

  const runAvailabilityCheck = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/youtube/check-batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoIds: YOUTUBE_VIDEOS.map((v) => v.id) }),
      })
      if (res.ok) {
        const data = await res.json()
        setAvailability(data)
      }
    } catch (err) {
      console.error('Availability check failed:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runAvailabilityCheck()
  }, [])

  const availableCount = Object.values(availability).filter(Boolean).length
  const checkedCount = Object.keys(availability).length

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">100 Best GMAT YouTube Videos</h3>
        <p className="text-sm text-slate-600 mb-4">
          Curated from GMAT Ninja, GMAT Club, Veritas Prep, Magoosh, Manhattan Prep, PrepScholar, e-GMAT, and more.
        </p>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Search by title, channel, topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm w-64 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          {['all', 'quant', 'verbal', 'data-insights', 'strategy', 'resource'].map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === c ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c === 'all' ? 'All' : CATEGORY_LABELS[c] || c}
            </button>
          ))}
          <button
            onClick={runAvailabilityCheck}
            disabled={loading}
            className="ml-auto px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 disabled:opacity-60"
          >
            {loading ? 'Checking...' : 'Re-check availability'}
          </button>
        </div>
        {checkedCount > 0 && (
          <p className="text-xs text-slate-500 mt-3">
            Availability: {availableCount}/{checkedCount} videos verified
          </p>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 z-10">
              <tr>
                <th className="text-left p-3 font-medium text-slate-700 w-10">Status</th>
                <th className="text-left p-3 font-medium text-slate-700">Title</th>
                <th className="text-left p-3 font-medium text-slate-700">Channel</th>
                <th className="text-left p-3 font-medium text-slate-700">Category</th>
                <th className="text-left p-3 font-medium text-slate-700 w-24">Link</th>
              </tr>
            </thead>
            <tbody>
              {filteredVideos.map((v, i) => (
                <VideoRow key={`${v.id}-${i}`} video={v} available={availability[v.id]} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function VideoRow({ video, available }: { video: YouTubeVideo; available?: boolean }) {
  const url = `https://www.youtube.com/watch?v=${video.id}`
  const status =
    available === undefined ? (
      <span className="text-slate-400" title="Not checked">—</span>
    ) : available ? (
      <span className="text-emerald-600" title="Available">✓</span>
    ) : (
      <span className="text-amber-600" title="Unavailable or private">✗</span>
    )

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
      <td className="p-3 text-center">{status}</td>
      <td className="p-3">
        <span className="font-medium text-slate-800">{video.title}</span>
        {video.topic && (
          <span className="ml-2 text-xs text-slate-500">({video.topic})</span>
        )}
      </td>
      <td className="p-3 text-slate-600">{video.channel}</td>
      <td className="p-3">
        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
          {CATEGORY_LABELS[video.category] || video.category}
        </span>
      </td>
      <td className="p-3">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:underline text-xs font-medium"
        >
          Watch →
        </a>
      </td>
    </tr>
  )
}
