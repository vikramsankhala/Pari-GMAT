import type { Message } from '../types'
import type { TabId } from '../types'

const API_URL = import.meta.env.VITE_API_URL || ''

export async function sendChat(
  messages: Message[],
  tab: TabId
): Promise<string> {
  const url = `${API_URL}/api/chat`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, tab }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || 'Failed to get response')
  }

  const data = await res.json()
  return data.reply
}
