export type TabId = 'gmat-coach' | 'college-apps' | 'financial-aid' | 'study-planner' | 'problems-qa'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface QuickAction {
  label: string
  prompt: string
}
