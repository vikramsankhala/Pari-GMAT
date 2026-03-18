export interface MockTestEntry {
  date: string
  totalScore: number
  quant: number
  verbal: number
  dataInsights: number
  improvementTarget: number
  notes?: string
}

export const MOCK_TEST_STRATEGY: MockTestEntry[] = [
  { date: 'Week 1', totalScore: 580, quant: 55, verbal: 58, dataInsights: 56, improvementTarget: 600 },
  { date: 'Week 2', totalScore: 600, quant: 58, verbal: 60, dataInsights: 59, improvementTarget: 620 },
  { date: 'Week 3', totalScore: 620, quant: 61, verbal: 62, dataInsights: 62, improvementTarget: 640 },
  { date: 'Week 4', totalScore: 640, quant: 64, verbal: 64, dataInsights: 65, improvementTarget: 660 },
  { date: 'Week 5', totalScore: 660, quant: 67, verbal: 66, dataInsights: 68, improvementTarget: 680 },
  { date: 'Week 6', totalScore: 680, quant: 70, verbal: 68, dataInsights: 71, improvementTarget: 695 },
  { date: 'Week 7', totalScore: 695, quant: 72, verbal: 70, dataInsights: 73, improvementTarget: 705 },
  { date: 'Week 8', totalScore: 705, quant: 74, verbal: 72, dataInsights: 75, improvementTarget: 715 },
]

export const TARGET_SCORE = 700
export const STRETCH_GOAL = 715
export const BASELINE_SCORE = 580
