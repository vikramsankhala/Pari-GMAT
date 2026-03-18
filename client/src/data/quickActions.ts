import type { TabId } from '../types'

export const QUICK_ACTIONS: Record<TabId, { label: string; prompt: string }[]> = {
  'gmat-coach': [
    { label: 'Explain Quant concept', prompt: 'Explain a GMAT Quant concept (algebra, geometry, arithmetic, or word problems) with an example.' },
    { label: 'Explain Verbal concept', prompt: 'Explain a GMAT Verbal concept (RC, CR, or Sentence Correction) with tips.' },
    { label: 'Explain Data Insights', prompt: 'Explain the Data Insights section structure and give me a sample question.' },
    { label: 'Quiz me (by section)', prompt: 'Give me a practice question. Specify section (Quant/Verbal/DI) and difficulty (easy/medium/hard).' },
    { label: "What's my weak area?", prompt: 'Help me identify weak areas and suggest focus topics. How do I track and improve them?' },
    { label: 'Time management tips', prompt: 'Give me time management tips. I know Quant is ~2min 8sec/question. What about Verbal and DI?' },
    { label: 'Exam day reminders', prompt: 'Remind me: 10 min break allowed, can edit up to 3 answers per section, on-screen calculator allowed, GMAT is computer adaptive.' },
  ],
  'college-apps': [
    { label: 'Draft SOP outline', prompt: 'Help me draft an outline for my Statement of Purpose for MBA applications.' },
    { label: 'Refine essay/short answer', prompt: 'Help me refine my essay or short answer. I\'ll paste my draft for feedback.' },
    { label: 'Programs for my score', prompt: 'Suggest MBA programs that fit a target score of 655–805.' },
    { label: 'Online GMAT reminder', prompt: 'Remind me: do some schools not accept online GMAT scores? I need to know for ISB and others.' },
    { label: 'Passport for GMAT', prompt: 'Remind me: do I need a valid passport to write the GMAT?' },
    { label: 'LinkedIn/Resume review', prompt: 'I want to paste my resume or LinkedIn summary for review. How should I structure it for MBA apps?' },
  ],
  'financial-aid': [
    { label: 'Scholarships', prompt: 'What scholarship options should I explore for MBA programs?' },
    { label: 'Assistantships & fellowships', prompt: 'Explain assistantships and fellowships for MBA students. How do I find them?' },
    { label: 'Draft appeal letter', prompt: 'Help me draft a financial aid appeal letter. I need a template I can customize.' },
    { label: 'Compare funding options', prompt: 'How do I compare funding options (scholarships, assistantships, fellowships) across MBA programs?' },
  ],
  'study-planner': [
    { label: 'Weekly schedule', prompt: 'Generate a weekly study schedule for GMAT prep. I work full-time.' },
    { label: 'Daily goals', prompt: 'What should my daily study goals look like? Give me a template.' },
    { label: 'Homework reminder', prompt: 'What homework do I have? Remind me about the mba.com mock test before next class.' },
  ],
  'mock-tests': [],
  'past-papers': [],
  'guided-practice': [],
  'tracker': [],
  'shortcuts': [],
  'suggested-colleges': [],
  'video-resources': [
    { label: 'Best Quant videos', prompt: 'Which YouTube videos from the Video Resources tab should I watch first for Quant?' },
    { label: 'Best Verbal videos', prompt: 'Which YouTube videos from the Video Resources tab should I watch first for Verbal?' },
    { label: 'Data Insights videos', prompt: 'Which Data Insights videos from the Video Resources tab are most helpful?' },
    { label: 'Study plan with videos', prompt: 'How do I incorporate the Video Resources into my weekly study plan?' },
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
