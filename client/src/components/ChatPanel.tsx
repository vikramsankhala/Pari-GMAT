import { useState, useRef, useEffect } from 'react'
import type { TabId } from '../types'
import type { Message } from '../types'
import { QUICK_ACTIONS } from '../data/quickActions'
import { sendChat } from '../api/chat'

const WELCOME_MESSAGES: Record<TabId, string> = {
  'gmat-coach':
    "Hi Pari! I'm ready to coach you on GMAT. Want a practice question, concept explanation, or time management strategy?",
  'college-apps':
    "Hi Pari! I'm here to help with SOPs, essays, program selection, and application tips. What would you like to work on?",
  'financial-aid':
    "Hi Pari! I can help with scholarships, appeal letters, and comparing funding options. What do you need?",
  'study-planner':
    "Hi Pari! Let's plan your study schedule. I can create weekly plans, set daily goals, and remind you about homework (like the mba.com mock test!).",
  'problems-qa':
    "Hi Pari! This is your safe space to share problems you're facing — time pressure, weak areas, work-study balance, anxiety, or anything else. Tap a problem below or type your own. I'm here to help.",
  'mock-tests': "Hi Pari! Use the Mock Tests tab for practice questions and analysis.",
  'shortcuts': "Hi Pari! Use the Shortcuts tab for cheatsheets and topic analysis.",
  'suggested-colleges': "Hi Pari! Check the Suggested Colleges tab for schools matched to your profile.",
}

interface ChatPanelProps {
  activeTab: TabId
}

export default function ChatPanel({ activeTab }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Reset chat when tab changes and show welcome
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: WELCOME_MESSAGES[activeTab],
      },
    ])
  }, [activeTab])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text?: string) => {
    const toSend = (text || input).trim()
    if (!toSend || loading) return

    const userMsg: Message = { role: 'user', content: toSend }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const reply = await sendChat([...messages, userMsg], activeTab)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Sorry Pari, something went wrong: ${(err as Error).message}. Please try again.`,
        },
      ])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const quickActions = QUICK_ACTIONS[activeTab]

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[420px]">
      {/* Quick actions */}
      <div className="p-4 border-b border-slate-100 flex flex-wrap gap-2">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => handleSend(action.prompt)}
            disabled={loading}
            className="px-4 py-2 rounded-full text-sm bg-slate-100 hover:bg-primary-50 hover:text-primary-700 text-slate-700 transition-colors disabled:opacity-50"
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                AI
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-800'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </p>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                P
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              AI
            </div>
            <div className="bg-slate-100 rounded-2xl px-4 py-3">
              <span className="inline-flex gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder={activeTab === 'problems-qa' ? "Describe a problem you're facing..." : "Ask Pari's MBA Coach anything..."}
            rows={1}
            className="flex-1 resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="w-12 h-12 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
            aria-label="Send"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
