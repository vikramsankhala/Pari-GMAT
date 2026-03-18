/**
 * Guided practice questions with step-by-step solution breakdown
 */

export interface GuidedQuestion {
  id: string
  section: string
  type: string
  difficulty: string
  stem: string
  options?: string[]
  correctAnswer: number
  steps: string[]
}

export const GUIDED_QUESTIONS: GuidedQuestion[] = [
  {
    id: 'GP-Q1',
    section: 'Quant',
    type: 'Problem Solving',
    difficulty: 'easy',
    stem: 'If 3x + 7 = 22, what is the value of 2x − 3?',
    options: ['5', '7', '9', '11', '13'],
    correctAnswer: 1,
    steps: [
      'Isolate x: subtract 7 from both sides → 3x = 15',
      'Solve for x: divide both sides by 3 → x = 5',
      'Substitute: plug x = 5 into 2x − 3 → 2(5) − 3 = 7',
      'Answer: B (7)',
    ],
  },
  {
    id: 'GP-Q2',
    section: 'Quant',
    type: 'Problem Solving',
    difficulty: 'medium',
    stem: 'A store sells apples at $2 each and oranges at $3 each. If Sarah bought 12 fruits for $28, how many apples did she buy?',
    options: ['4', '6', '8', '10', '12'],
    correctAnswer: 2,
    steps: [
      'Define variables: Let a = apples, o = oranges',
      'Write equations: a + o = 12 (total fruits), 2a + 3o = 28 (total cost)',
      'Solve: From (1), o = 12 − a. Substitute into (2): 2a + 3(12−a) = 28',
      'Simplify: 2a + 36 − 3a = 28 → −a = −8 → a = 8',
      'Answer: C (8 apples)',
    ],
  },
  {
    id: 'GP-Q3',
    section: 'Quant',
    type: 'Problem Solving',
    difficulty: 'hard',
    stem: 'In a class of 40 students, 50% passed Math and 60% passed English. If 20% passed both, how many passed neither?',
    options: ['4', '6', '8', '10', '12'],
    correctAnswer: 0,
    steps: [
      'Find counts: Passed M = 50% of 40 = 20. Passed E = 60% of 40 = 24. Both = 20% of 40 = 8',
      'Use formula: Passed at least one = M + E − both = 20 + 24 − 8 = 36',
      'Find neither: Total − at least one = 40 − 36 = 4',
      'Answer: A (4)',
    ],
  },
  {
    id: 'GP-V1',
    section: 'Verbal',
    type: 'Critical Reasoning',
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
    steps: [
      'Identify the conclusion: Pari will be a successful applicant',
      'Identify the premise: Strong quant is required for success',
      'Key insight: "Required" = necessary, not sufficient. Having quant does not guarantee success',
      'The flaw: Treating a necessary condition as sufficient',
      'Answer: A',
    ],
  },
  {
    id: 'GP-V2',
    section: 'Verbal',
    type: 'Sentence Correction',
    difficulty: 'easy',
    stem: 'The team, along with its coach, _____ traveling to the finals.',
    options: ['are', 'is', 'were', 'have been', 'had been'],
    correctAnswer: 1,
    steps: [
      'Find the subject: "The team" (singular). "Along with its coach" does not change the subject',
      'Check verb agreement: Singular subject needs singular verb',
      'Tense: Present, ongoing action → "is"',
      'Answer: B (is)',
    ],
  },
]
