import { useState } from 'react'
import { PARI_PROFILE } from '../data/pariProfile'

export default function ProfileHero() {
  const [imgError, setImgError] = useState(false)
  // Priority: env var > local /pari-profile.jpg (in client/public/) > unavatar LinkedIn
  const profileImageUrl =
    import.meta.env.VITE_PARI_PROFILE_IMAGE ||
    '/pari-profile.jpg' ||
    'https://unavatar.io/linkedin/pari-sankhala-443215120'

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-48 shrink-0 p-6 flex justify-center items-center bg-gradient-to-br from-primary-50 to-primary-100">
          {!imgError ? (
            <img
              src={profileImageUrl}
              alt={PARI_PROFILE.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-primary-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
              PS
            </div>
          )}
        </div>
        <div className="flex-1 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-1">{PARI_PROFILE.name}</h2>
          <p className="text-sm text-primary-600 font-medium mb-2">{PARI_PROFILE.role}</p>
          <p className="text-slate-600 text-sm mb-3">{PARI_PROFILE.summary}</p>
          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            <span>📍 {PARI_PROFILE.location}</span>
            <span>📚 {PARI_PROFILE.education}</span>
          </div>
          <a
            href={PARI_PROFILE.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            View LinkedIn profile
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
