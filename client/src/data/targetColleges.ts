/**
 * Target colleges with GMAT score expectations
 * Data from published rankings and admissions (approximate)
 */

export interface TargetCollege {
  id: string
  name: string
  country: string
  medianGmat: number
  rangeLow: number
  rangeHigh: number
  percentile25: number
  percentile75: number
  notes: string
}

export const TARGET_COLLEGES: TargetCollege[] = [
  { id: 'insead', name: 'INSEAD', country: 'France/Singapore', medianGmat: 710, rangeLow: 650, rangeHigh: 760, percentile25: 690, percentile75: 730, notes: 'Strong for consulting; dual campus.' },
  { id: 'isb', name: 'ISB Hyderabad', country: 'India', medianGmat: 710, rangeLow: 680, rangeHigh: 750, percentile25: 695, percentile75: 730, notes: '1-year; strong India placement.' },
  { id: 'iim-abc', name: 'IIM A/B/C', country: 'India', medianGmat: 730, rangeLow: 700, rangeHigh: 780, percentile25: 710, percentile75: 750, notes: 'Executive/EPGP; highly competitive.' },
  { id: 'lbs', name: 'London Business School', country: 'UK', medianGmat: 700, rangeLow: 640, rangeHigh: 760, percentile25: 680, percentile75: 730, notes: 'Finance, consulting focus.' },
  { id: 'oxford', name: 'Oxford Said', country: 'UK', medianGmat: 690, rangeLow: 620, rangeHigh: 750, percentile25: 650, percentile75: 720, notes: '1-year MBA; smaller cohort.' },
  { id: 'cambridge', name: 'Cambridge Judge', country: 'UK', medianGmat: 695, rangeLow: 630, rangeHigh: 750, percentile25: 660, percentile75: 725, notes: 'Tech, entrepreneurship.' },
  { id: 'rotman', name: 'Rotman (Toronto)', country: 'Canada', medianGmat: 670, rangeLow: 600, rangeHigh: 740, percentile25: 640, percentile75: 700, notes: 'Finance; Canadian market.' },
  { id: 'mcgill', name: 'McGill Desautels', country: 'Canada', medianGmat: 665, rangeLow: 590, rangeHigh: 730, percentile25: 630, percentile75: 695, notes: 'Bilingual; Montreal.' },
  { id: 'spjain', name: 'SP Jain (Global)', country: 'UAE/Australia', medianGmat: 680, rangeLow: 620, rangeHigh: 740, percentile25: 650, percentile75: 710, notes: 'Multi-city; emerging markets.' },
  { id: 'ntu', name: 'NTU Nanyang', country: 'Singapore', medianGmat: 680, rangeLow: 620, rangeHigh: 740, percentile25: 650, percentile75: 710, notes: 'Asia focus; tech.' },
  { id: 'nus', name: 'NUS Singapore', country: 'Singapore', medianGmat: 685, rangeLow: 630, rangeHigh: 750, percentile25: 655, percentile75: 720, notes: 'Strong in Asia.' },
]
