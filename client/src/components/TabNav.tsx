import type { TabId } from '../types'

interface TabNavProps {
  tabs: { id: TabId; label: string }[]
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

export default function TabNav({ tabs, activeTab, onTabChange }: TabNavProps) {
  return (
    <nav className="flex flex-wrap gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
