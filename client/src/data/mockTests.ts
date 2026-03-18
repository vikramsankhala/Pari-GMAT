/**
 * GMAT-style mock test questions for practice.
 * These are original questions designed to mirror GMAT format and difficulty.
 * Not from actual GMAT exams (which are copyrighted by GMAC).
 */

export type Section = 'quant' | 'verbal' | 'data-insights'
export type Difficulty = 'easy' | 'medium' | 'hard'
export type QuestionType = 'ps' | 'ds' | 'rc' | 'cr' | 'sc' | 'di'

export interface MockQuestion {
  id: string
  section: Section
  type: QuestionType
  difficulty: Difficulty
  stem: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  timeTargetSec: number
}

export const MOCK_QUESTIONS: MockQuestion[] = [
  // Quant - Problem Solving
  {
    id: 'Q-PS-1',
    section: 'quant',
    type: 'ps',
    difficulty: 'easy',
    stem: 'If 3x + 7 = 22, what is the value of 2x − 3?',
    options: ['5', '7', '9', '11', '13'],
    correctAnswer: 1,
    explanation: 'Solve: 3x = 15, so x = 5. Then 2(5) − 3 = 7. Answer: B.',
    timeTargetSec: 90,
  },
  {
    id: 'Q-PS-2',
    section: 'quant',
    type: 'ps',
    difficulty: 'medium',
    stem: 'A store sells apples at $2 each and oranges at $3 each. If Sarah bought 12 fruits for $28, how many apples did she buy?',
    options: ['4', '6', '8', '10', '12'],
    correctAnswer: 2,
    explanation: 'Let a = apples, o = oranges. a + o = 12, 2a + 3o = 28. Solving: o = 4, a = 8. Answer: C.',
    timeTargetSec: 120,
  },
  {
    id: 'Q-PS-3',
    section: 'quant',
    type: 'ps',
    difficulty: 'hard',
    stem: 'In a class of 40 students, 50% passed Math and 60% passed English. If 20% passed both, how many passed neither?',
    options: ['4', '6', '8', '10', '12'],
    correctAnswer: 0,
    explanation: 'Passed M = 20, E = 24, both = 8. Passed at least one = 20 + 24 − 8 = 36. Passed neither = 40 − 36 = 4. Answer: A.',
    timeTargetSec: 150,
  },
  // Quant - Data Sufficiency
  {
    id: 'Q-DS-1',
    section: 'quant',
    type: 'ds',
    difficulty: 'medium',
    stem: 'What is the value of integer n? (1) n is a factor of 24. (2) n is a multiple of 6.',
    options: ['(1) alone', '(2) alone', 'Both together', 'Each alone', 'Neither'],
    correctAnswer: 2,
    explanation: 'From (1): n ∈ {1,2,3,4,6,8,12,24}. From (2): n ∈ {6,12,18,24,...}. Together: n ∈ {6,12,24}. Still not unique. Answer: E (Neither sufficient).',
    timeTargetSec: 120,
  },
  // Verbal - Reading Comprehension
  {
    id: 'V-RC-1',
    section: 'verbal',
    type: 'rc',
    difficulty: 'medium',
    stem: 'Passage: "The shift to remote work has accelerated digital transformation in enterprises. While productivity metrics initially showed gains, longitudinal studies suggest that sustained remote work may affect innovation, which often depends on spontaneous collaboration. Firms are now experimenting with hybrid models." — According to the passage, what is a key concern about long-term remote work?',
    options: [
      'Productivity declines',
      'Impact on innovation and collaboration',
      'Cost of digital tools',
      'Employee satisfaction',
      'Management oversight',
    ],
    correctAnswer: 1,
    explanation: 'The passage states that "sustained remote work may affect innovation, which often depends on spontaneous collaboration." Answer: B.',
    timeTargetSec: 120,
  },
  // Verbal - Critical Reasoning
  {
    id: 'V-CR-1',
    section: 'verbal',
    type: 'cr',
    difficulty: 'medium',
    stem: 'Premise: All successful MBA applicants have strong quantitative skills. Pari has strong quantitative skills. Conclusion: Pari will be a successful MBA applicant. The argument is flawed because:',
    options: [
      'It confuses necessary and sufficient conditions',
      'It uses an irrelevant analogy',
      'It appeals to authority',
      'It generalizes from a sample',
      'It assumes correlation implies causation',
    ],
    correctAnswer: 0,
    explanation: 'Strong quant is necessary for success, not sufficient. Having it does not guarantee admission. Answer: A.',
    timeTargetSec: 110,
  },
  // Verbal - Sentence Correction
  {
    id: 'V-SC-1',
    section: 'verbal',
    type: 'sc',
    difficulty: 'easy',
    stem: 'The team, along with its coach, _____ traveling to the finals.',
    options: ['are', 'is', 'were', 'have been', 'had been'],
    correctAnswer: 1,
    explanation: '"The team" is singular; "along with its coach" does not change the subject. Use "is." Answer: B.',
    timeTargetSec: 75,
  },
  // Data Insights
  {
    id: 'DI-1',
    section: 'data-insights',
    type: 'di',
    difficulty: 'medium',
    stem: 'Table: Students | Math | Verbal. A: 85, 78. B: 72, 88. C: 90, 75. What is the median of (Math + Verbal) totals?',
    options: ['156', '160', '163', '165', '170'],
    correctAnswer: 2,
    explanation: 'A: 163, B: 160, C: 165. Sorted: 160, 163, 165. Median = 163. Answer: C.',
    timeTargetSec: 135,
  },
  {
    id: 'Q-PS-4',
    section: 'quant',
    type: 'ps',
    difficulty: 'medium',
    stem: 'A train travels 120 km in 2 hours. At the same rate, how far will it travel in 45 minutes?',
    options: ['40 km', '45 km', '50 km', '60 km', '75 km'],
    correctAnswer: 1,
    explanation: 'Speed = 120/2 = 60 km/hr. In 45 min (0.75 hr): 60 × 0.75 = 45 km. Answer: B.',
    timeTargetSec: 90,
  },
  {
    id: 'V-CR-2',
    section: 'verbal',
    type: 'cr',
    difficulty: 'hard',
    stem: 'Which of the following, if true, most weakens the argument that "Company X\'s profits rose because of its new marketing campaign"?',
    options: [
      'Company X also cut costs that year',
      'The campaign was well-received',
      'Competitors had similar campaigns',
      'Profits had been rising for 3 years before the campaign',
      'The campaign targeted a new demographic',
    ],
    correctAnswer: 3,
    explanation: 'If profits were already rising before the campaign, the campaign may not be the cause. This weakens the causal argument. Answer: D.',
    timeTargetSec: 130,
  },
]

export const SECTION_LABELS: Record<Section, string> = {
  quant: 'Quantitative Reasoning',
  verbal: 'Verbal Reasoning',
  'data-insights': 'Data Insights',
}

export const TYPE_LABELS: Record<QuestionType, string> = {
  ps: 'Problem Solving',
  ds: 'Data Sufficiency',
  rc: 'Reading Comprehension',
  cr: 'Critical Reasoning',
  sc: 'Sentence Correction',
  di: 'Data Insights',
}
