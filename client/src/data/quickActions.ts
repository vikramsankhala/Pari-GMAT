import type { TabId } from '../types'

export const QUICK_ACTIONS: Record<TabId, { label: string; prompt: string }[]> = {
  'gmat-coach': [
    { label: 'Quiz me on Quant', prompt: 'Give me a practice Quant question (medium difficulty) with answer explanation.' },
    { label: 'Explain Data Insights', prompt: 'Explain the Data Insights section structure and give me a sample question.' },
    { label: 'Time management tips', prompt: 'Give me time management tips for the GMAT. I know it\'s ~2min 8sec per Quant question.' },
    { label: "What's my weak area?", prompt: 'Based on typical GMAT prep, what weak areas should I focus on? How do I identify mine?' },
    { label: 'Practice Verbal question', prompt: 'Give me a practice Verbal (RC or CR) question with explanation.' },
  ],
  'college-apps': [
    { label: 'Draft SOP outline', prompt: 'Help me draft an outline for my Statement of Purpose for MBA applications.' },
    { label: 'Programs for my score', prompt: 'Suggest MBA programs that fit a target score of 695-705.' },
    { label: 'Online GMAT reminder', prompt: 'Remind me about GMAT score acceptance - do some schools not accept online GMAT?' },
    { label: 'Resume/LinkedIn review', prompt: 'I want to paste my resume or LinkedIn summary for review. How should I structure it?' },
  ],
  'financial-aid': [
    { label: 'Scholarship options', prompt: 'What scholarship options should I explore for MBA programs?' },
    { label: 'Draft appeal letter', prompt: 'Help me draft a financial aid appeal letter template.' },
    { label: 'Compare funding', prompt: 'How do I compare funding options (scholarships, assistantships, fellowships) across MBA programs?' },
  ],
  'study-planner': [
    { label: 'Weekly schedule', prompt: 'Generate a weekly study schedule for GMAT prep.' },
    { label: 'Daily goals', prompt: 'What should my daily study goals look like?' },
    { label: 'Homework reminder', prompt: 'What homework do I have? Remind me about the mba.com mock test.' },
  ],
  'problems-qa': [
    { label: "Time pressure in exam", prompt: "I feel rushed during the GMAT. I can't finish sections on time. What should I do?" },
    { label: "Quant is my weak area", prompt: "Quant is dragging my score down. How do I improve without neglecting Verbal and DI?" },
    { label: "Work-study balance", prompt: "I work full-time in production. How do I balance GMAT prep with my job?" },
    { label: "Mock scores not improving", prompt: "My mock test scores have plateaued. What am I doing wrong?" },
    { label: "Exam anxiety", prompt: "I get anxious before and during the exam. How can I stay calm?" },
    { label: "Data Insights struggle", prompt: "Data Insights feels overwhelming. Where do I start?" },
    { label: "Motivation dip", prompt: "I'm losing motivation. How do I stay focused on my 695 target?" },
    { label: "Describe my problem...", prompt: "I'm facing a problem with my GMAT prep or MBA journey. Can you help me think through it? (Describe your specific situation and I'll respond.)" },
  ],
}
