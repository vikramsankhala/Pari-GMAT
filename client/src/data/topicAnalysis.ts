/**
 * Topic-wise analysis: marks weight, difficulty, scores
 * Based on GMAC's published GMAT structure
 */

export interface TopicBreakdown {
  section: string
  topic: string
  weightPct: number
  approxQuestions: number
  difficulty: 'easy' | 'medium' | 'hard'
  avgScore: number
  topScore: number
  strategy: string
}

export const TOPIC_BREAKDOWN: TopicBreakdown[] = [
  // Quant
  { section: 'Quant', topic: 'Arithmetic (%, ratios, integers)', weightPct: 35, approxQuestions: 7, difficulty: 'medium', avgScore: 42, topScore: 51, strategy: 'Master fractions, %, ratios. High yield.' },
  { section: 'Quant', topic: 'Algebra (equations, inequalities)', weightPct: 30, approxQuestions: 6, difficulty: 'medium', avgScore: 40, topScore: 51, strategy: 'Quadratic, linear, word problems.' },
  { section: 'Quant', topic: 'Geometry', weightPct: 20, approxQuestions: 4, difficulty: 'hard', avgScore: 38, topScore: 51, strategy: 'Triangles, circles, coordinate. Fewer questions.' },
  { section: 'Quant', topic: 'Word Problems (rate, work, mixture)', weightPct: 15, approxQuestions: 3, difficulty: 'hard', avgScore: 36, topScore: 51, strategy: 'Set up equations; practice templates.' },
  // Verbal
  { section: 'Verbal', topic: 'Reading Comprehension', weightPct: 35, approxQuestions: 8, difficulty: 'medium', avgScore: 40, topScore: 51, strategy: '4 passages; main idea, inference, detail.' },
  { section: 'Verbal', topic: 'Critical Reasoning', weightPct: 35, approxQuestions: 8, difficulty: 'medium', avgScore: 40, topScore: 51, strategy: 'Weaken, strengthen, assumption, inference.' },
  { section: 'Verbal', topic: 'Sentence Correction', weightPct: 30, approxQuestions: 7, difficulty: 'medium', avgScore: 42, topScore: 51, strategy: 'Grammar rules; parallelism, modifiers.' },
  // Data Insights
  { section: 'Data Insights', topic: 'Data Sufficiency (DI style)', weightPct: 25, approxQuestions: 5, difficulty: 'hard', avgScore: 38, topScore: 51, strategy: 'Multi-source; test each statement.' },
  { section: 'Data Insights', topic: 'Multi-Source Reasoning', weightPct: 30, approxQuestions: 6, difficulty: 'hard', avgScore: 36, topScore: 51, strategy: '2–3 tabs; extract only needed data.' },
  { section: 'Data Insights', topic: 'Table Analysis', weightPct: 25, approxQuestions: 5, difficulty: 'medium', avgScore: 40, topScore: 51, strategy: 'Sort, filter; Yes/No or value.' },
  { section: 'Data Insights', topic: 'Graphics Interpretation', weightPct: 20, approxQuestions: 4, difficulty: 'medium', avgScore: 40, topScore: 51, strategy: 'Read axes; interpret before calc.' },
]

export const SECTION_SUMMARY = [
  { section: 'Quant', totalQ: 21, avgScore: 40, topScore: 90, timeMins: 45 },
  { section: 'Verbal', totalQ: 23, avgScore: 40, topScore: 90, timeMins: 45 },
  { section: 'Data Insights', totalQ: 20, totalScore: 60, avgScore: 40, topScore: 90, timeMins: 45 },
]
