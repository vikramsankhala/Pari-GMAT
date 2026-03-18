import { useState } from 'react'
import Header from './components/Header'
import ProfileHero from './components/ProfileHero'
import StatsCards from './components/StatsCards'
import StrategySection from './components/StrategySection'
import TabNav from './components/TabNav'
import ChatPanel from './components/ChatPanel'
import MockTestsPanel from './components/MockTestsPanel'
import ShortcutsPanel from './components/ShortcutsPanel'
import SuggestedCollegesPanel from './components/SuggestedCollegesPanel'
import PastPapersPanel from './components/PastPapersPanel'
import GuidedPracticePanel from './components/GuidedPracticePanel'
import TrackerPanel from './components/TrackerPanel'
import VideoResourcesPanel from './components/VideoResourcesPanel'
import type { TabId } from './types'

const TABS: { id: TabId; label: string }[] = [
  { id: 'gmat-coach', label: 'GMAT Coach' },
  { id: 'guided-practice', label: 'Guided Practice' },
  { id: 'college-apps', label: 'College Apps' },
  { id: 'financial-aid', label: 'Financial Aid' },
  { id: 'study-planner', label: 'Study Planner' },
  { id: 'tracker', label: 'Score Tracker' },
  { id: 'past-papers', label: 'Past Papers Analysis' },
  { id: 'suggested-colleges', label: 'Suggested Colleges' },
  { id: 'shortcuts', label: 'Shortcuts' },
  { id: 'mock-tests', label: 'Mock Tests' },
  { id: 'problems-qa', label: 'Problems & Q&A' },
  { id: 'video-resources', label: 'Video Resources' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('gmat-coach')

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ProfileHero />
        <StatsCards />
        <StrategySection />
        <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === 'mock-tests' ? (
          <MockTestsPanel />
        ) : activeTab === 'shortcuts' ? (
          <ShortcutsPanel />
        ) : activeTab === 'suggested-colleges' ? (
          <SuggestedCollegesPanel />
        ) : activeTab === 'past-papers' ? (
          <PastPapersPanel />
        ) : activeTab === 'guided-practice' ? (
          <GuidedPracticePanel />
        ) : activeTab === 'tracker' ? (
          <TrackerPanel />
        ) : activeTab === 'video-resources' ? (
          <VideoResourcesPanel />
        ) : (
          <ChatPanel activeTab={activeTab} />
        )}
      </main>
    </div>
  )
}
