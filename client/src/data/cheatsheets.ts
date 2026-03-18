/**
 * Cheatsheets and shortcuts for GMAT question types
 * Based on published GMAT exam structure
 */

export interface Cheatsheet {
  section: string
  type: string
  shortcut: string
  tip: string
}

export const CHEATSHEETS: Cheatsheet[] = [
  // Quant - Problem Solving
  { section: 'Quant', type: 'Problem Solving', shortcut: 'Plug-in numbers', tip: 'Use 2, 3, 5, 10 for variables. Test answer choices.' },
  { section: 'Quant', type: 'Problem Solving', shortcut: 'Back-solve', tip: 'Start with C; move up/down based on result.' },
  { section: 'Quant', type: 'Problem Solving', shortcut: 'Estimate first', tip: 'Round numbers; eliminate impossible answers.' },
  { section: 'Quant', type: 'Problem Solving', shortcut: 'Pick smart numbers', tip: 'Use 100 for %, 12 for months, 60 for time.' },
  { section: 'Quant', type: 'Data Sufficiency', shortcut: 'AD / BCE', tip: '(1) alone? A or D. (2) alone? B or D. Both? C or E.' },
  { section: 'Quant', type: 'Data Sufficiency', shortcut: 'Test each alone first', tip: 'Never combine until you\'ve tested separately.' },
  { section: 'Quant', type: 'Data Sufficiency', shortcut: 'No need to solve', tip: 'Only determine if you CAN solve, not the answer.' },
  { section: 'Quant', type: 'Data Sufficiency', shortcut: 'Watch for "no"', tip: 'A definitive "no" is sufficient (e.g., "Is x > 0?" and x = -2).' },
  // Verbal - Reading Comprehension
  { section: 'Verbal', type: 'Reading Comprehension', shortcut: 'Read for structure', tip: 'Main idea, tone, author\'s purpose. Don\'t memorize details.' },
  { section: 'Verbal', type: 'Reading Comprehension', shortcut: 'Answer from passage only', tip: 'Eliminate answers that go beyond the text.' },
  { section: 'Verbal', type: 'Reading Comprehension', shortcut: 'Main idea in 1 sentence', tip: 'Summarize each para in 5–10 words before questions.' },
  { section: 'Verbal', type: 'Reading Comprehension', shortcut: 'Extreme = wrong', tip: '"Always," "never," "all" usually incorrect.' },
  // Verbal - Critical Reasoning
  { section: 'Verbal', type: 'Critical Reasoning', shortcut: 'Find conclusion first', tip: 'Look for "therefore," "thus," "so."' },
  { section: 'Verbal', type: 'Critical Reasoning', shortcut: 'Prephrase answer', tip: 'Predict before looking at choices.' },
  { section: 'Verbal', type: 'Critical Reasoning', shortcut: 'Necessary vs sufficient', tip: 'Weaken: attack assumption. Strengthen: support it.' },
  { section: 'Verbal', type: 'Critical Reasoning', shortcut: 'Scope matters', tip: 'Answer must stay within argument\'s scope.' },
  // Verbal - Sentence Correction
  { section: 'Verbal', type: 'Sentence Correction', shortcut: 'Subject-verb agreement', tip: 'Ignore phrases between subject and verb.' },
  { section: 'Verbal', type: 'Sentence Correction', shortcut: 'Parallelism', tip: 'Lists, comparisons must be parallel in form.' },
  { section: 'Verbal', type: 'Sentence Correction', shortcut: 'Modifier placement', tip: 'Modifier next to what it modifies.' },
  { section: 'Verbal', type: 'Sentence Correction', shortcut: 'Eliminate 2–3 first', tip: 'Compare remaining; pick clearest.' },
  // Data Insights
  { section: 'Data Insights', type: 'Multi-Source', shortcut: 'Read question first', tip: 'Extract only needed data from tabs.' },
  { section: 'Data Insights', type: 'Table Analysis', shortcut: 'Sort before answering', tip: 'Use sort to find min/max/median quickly.' },
  { section: 'Data Insights', type: 'Two-Part Analysis', shortcut: 'Answer each part independently', tip: 'Treat as two separate questions.' },
  { section: 'Data Insights', type: 'Graphics Interpretation', shortcut: 'Read axis labels', tip: 'Check scale; interpret before calculating.' },
]
