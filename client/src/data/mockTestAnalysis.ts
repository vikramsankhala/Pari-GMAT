/**
 * Comparative analysis data: GMAT-style mocks vs official exam format
 * Based on GMAC's published exam structure (not proprietary content)
 */

export interface SectionComparison {
  section: string
  officialQuestions: number
  officialMins: number
  secPerQuestion: number
  mockCoverage: string
  keyTechnique: string
}

export const SECTION_COMPARISON: SectionComparison[] = [
  {
    section: 'Quant',
    officialQuestions: 21,
    officialMins: 45,
    secPerQuestion: 128,
    mockCoverage: 'Problem Solving, Data Sufficiency',
    keyTechnique: 'Back-solve, plug-in numbers, estimate before calculating',
  },
  {
    section: 'Verbal',
    officialQuestions: 23,
    officialMins: 45,
    secPerQuestion: 117,
    mockCoverage: 'RC, CR, Sentence Correction',
    keyTechnique: 'Identify conclusion & premises; eliminate wrong answers first',
  },
  {
    section: 'Data Insights',
    officialQuestions: 20,
    officialMins: 45,
    secPerQuestion: 135,
    mockCoverage: 'Multi-source reasoning, table analysis, two-part analysis',
    keyTechnique: 'Skim tables; focus on what the question asks',
  },
]

export interface ProblemArea {
  area: string
  symptom: string
  strategy: string
  practiceFocus: string
}

export const PROBLEM_AREAS: ProblemArea[] = [
  {
    area: 'Time pressure',
    symptom: 'Rushing, guessing on last 3–5 questions',
    strategy: 'Flag and skip hard questions; return if time permits. Never leave blank.',
    practiceFocus: 'Timed drills: 2 min/Quant, ~2 min/Verbal, ~2:15/DI',
  },
  {
    area: 'Data Sufficiency',
    symptom: 'Confusing sufficient vs necessary, picking C too often',
    strategy: 'Test each statement alone first. AD/BCE elimination.',
    practiceFocus: '50+ DS questions; memorize answer choices (A,B,C,D,E)',
  },
  {
    area: 'Reading Comprehension',
    symptom: 'Re-reading passages, running out of time',
    strategy: 'Read for structure (main idea, tone); answer from passage only.',
    practiceFocus: 'Long passages (4–5 para); practice main idea in 60 sec',
  },
  {
    area: 'Critical Reasoning',
    symptom: 'Tricked by tempting wrong answers',
    strategy: 'Identify conclusion, find assumption, prephrase answer.',
    practiceFocus: 'Weaken, strengthen, assumption, inference question types',
  },
  {
    area: 'Quant word problems',
    symptom: 'Setting up equations incorrectly',
    strategy: 'Define variables clearly; translate sentence by sentence.',
    practiceFocus: 'Rate, work, mixture, probability word problems',
  },
  {
    area: 'Data Insights tables',
    symptom: 'Getting lost in multi-tab data',
    strategy: 'Read question first; extract only needed data.',
    practiceFocus: 'Sort/filter practice; two-part analysis',
  },
]

export interface StrategyTip {
  phase: string
  tip: string
}

export const STRATEGY_TIPS: StrategyTip[] = [
  { phase: 'Before exam', tip: 'Take 2+ full official mocks (mba.com). Simulate test conditions.' },
  { phase: 'First 5 questions', tip: 'Accuracy matters more—computer adaptive uses early performance.' },
  { phase: 'Mid-section', tip: 'Keep steady pace. Flag hard questions; don\'t get stuck.' },
  { phase: 'Last 5 questions', tip: 'Never leave blank. Guess if needed—no penalty for wrong answers.' },
  { phase: '10-min break', tip: 'Use it. Stretch, hydrate, reset for Verbal/DI.' },
  { phase: 'Review', tip: 'Review every wrong answer. Understand why, not just what.' },
]
