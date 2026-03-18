/**
 * Score & improvement tracker data
 */

export const PROBLEM_AREAS = [
  { id: 'quant-ps', label: 'Quant: Problem Solving', section: 'quant' },
  { id: 'quant-ds', label: 'Quant: Data Sufficiency', section: 'quant' },
  { id: 'verbal-rc', label: 'Verbal: Reading Comprehension', section: 'verbal' },
  { id: 'verbal-cr', label: 'Verbal: Critical Reasoning', section: 'verbal' },
  { id: 'verbal-sc', label: 'Verbal: Sentence Correction', section: 'verbal' },
  { id: 'di-multi', label: 'DI: Multi-Source', section: 'data-insights' },
  { id: 'di-table', label: 'DI: Table Analysis', section: 'data-insights' },
  { id: 'di-graphics', label: 'DI: Graphics', section: 'data-insights' },
]

export const STORAGE_KEYS = {
  scores: 'paris-mba-coach-scores',
  problemAreas: 'paris-mba-coach-problem-areas',
}

export interface ScoreEntry {
  id: string
  date: string
  total: number
  quant: number
  verbal: number
  dataInsights: number
  notes?: string
}
