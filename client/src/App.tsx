import { useState } from 'react'
import Header from './components/Header'
import ProfileHero from './components/ProfileHero'
import StatsCards from './components/StatsCards'
import StrategySection from './components/StrategySection'
import TabNav from './components/TabNav'
import ChatPanel from './components/ChatPanel'
import type { TabId } from './types'

const TABS: { id: TabId; label: string }[] = [
  { id: 'gmat-coach', label: 'GMAT Coach' },
  { id: 'problems-qa', label: 'Problems & Q&A' },
  { id: 'college-apps', label: 'College Apps' },
  { id: 'financial-aid', label: 'Financial Aid' },
  { id: 'study-planner', label: 'Study Planner' },
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
        <ChatPanel activeTab={activeTab} />
      </main>
    </div>
  )
}
