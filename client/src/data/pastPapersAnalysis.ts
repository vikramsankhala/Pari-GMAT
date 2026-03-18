/**
 * Past years GMAT question paper analysis (patterns & structure)
 * Based on GMAC's published exam format — not actual questions
 */

export interface SectionAnalysis {
  section: string
  questionTypes: { type: string; pct: number; avgTimeSec: number }[]
  difficultySplit: { easy: number; medium: number; hard: number }
  highYieldTopics: string[]
}

export const SECTION_ANALYSIS: SectionAnalysis[] = [
  {
    section: 'Quant',
    questionTypes: [
      { type: 'Problem Solving', pct: 60, avgTimeSec: 120 },
      { type: 'Data Sufficiency', pct: 40, avgTimeSec: 140 },
    ],
    difficultySplit: { easy: 25, medium: 50, hard: 25 },
    highYieldTopics: ['Arithmetic (%, ratios)', 'Algebra', 'Word problems', 'Geometry'],
  },
  {
    section: 'Verbal',
    questionTypes: [
      { type: 'Reading Comprehension', pct: 35, avgTimeSec: 120 },
      { type: 'Critical Reasoning', pct: 35, avgTimeSec: 110 },
      { type: 'Sentence Correction', pct: 30, avgTimeSec: 75 },
    ],
    difficultySplit: { easy: 25, medium: 50, hard: 25 },
    highYieldTopics: ['Main idea', 'Weaken/Strengthen', 'Parallelism', 'Modifiers'],
  },
  {
    section: 'Data Insights',
    questionTypes: [
      { type: 'Multi-Source', pct: 30, avgTimeSec: 150 },
      { type: 'Table Analysis', pct: 25, avgTimeSec: 120 },
      { type: 'Graphics Interpretation', pct: 20, avgTimeSec: 130 },
      { type: 'Two-Part Analysis', pct: 25, avgTimeSec: 140 },
    ],
    difficultySplit: { easy: 20, medium: 50, hard: 30 },
    highYieldTopics: ['Sort/filter', 'Data extraction', 'Chart reading', 'Yes/No logic'],
  },
]

export interface YearTrend {
  year: string
  quantFocus: string
  verbalFocus: string
  diFocus: string
}

export const YEAR_TRENDS: YearTrend[] = [
  { year: '2024–25', quantFocus: 'More DS, word problems', verbalFocus: 'Longer RC passages', diFocus: 'Multi-source emphasis' },
  { year: '2023–24', quantFocus: 'Algebra-heavy', verbalFocus: 'CR inference', diFocus: 'Table analysis' },
  { year: '2022–23', quantFocus: 'Arithmetic %', verbalFocus: 'SC parallelism', diFocus: 'Graphics' },
]

export const PARI_INSIGHTS = {
  targetScore: '695–705',
  focusAreas: [
    { area: 'Quant', reason: 'Often the differentiator for 700+; DS is high yield', action: 'Master AD/BCE; 50+ DS drills' },
    { area: 'Data Insights', reason: 'Newer section; many struggle with multi-tab', action: 'Practice table sort; extract only needed data' },
    { area: 'Verbal', reason: 'RC main idea under 60 sec; CR prephrase', action: '4 passages/week; 20 CR questions' },
  ],
  timeStrategy: 'Quant: 2min 8sec/q. Verbal: ~2min. DI: ~2min 15sec. Skip & flag; never leave blank.',
  weakAreaTracker: 'Track: Quant DS, RC inference, DI multi-source. Review every wrong answer.',
}
