import { useState } from 'react'
import { GUIDED_QUESTIONS, type GuidedQuestion } from '../data/guidedPractice'
import { sendChat } from '../api/chat'

export default function GuidedPracticePanel() {
  const [question, setQuestion] = useState<GuidedQuestion | null>(null)
  const [currentStep, setCurrentStep] = useState(-1)
  const [hint, setHint] = useState<string | null>(null)
  const [loadingHint, setLoadingHint] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const handleGetHint = async () => {
    if (!question || loadingHint) return
    setLoadingHint(true)
    setHint(null)
    try {
      const nextStepIdx = currentStep + 1
    const stepContext = nextStepIdx < question.steps.length
        ? `User has seen ${currentStep + 1} steps. Next step in solution: "${question.steps[nextStepIdx]}". Give a hint to guide them toward this step.`
        : 'User has seen all steps.'
      const hintPrompt = `I'm practicing this problem. ${stepContext} Give me a HINT for the next step — guide me to figure it out myself. Don't give the full answer. Be encouraging. Problem: ${question.stem}`
      const reply = await sendChat(
        [{ role: 'user', content: hintPrompt }],
        'guided-practice'
      )
      setHint(reply)
    } catch (err) {
      setHint(`Could not get hint: ${(err as Error).message}`)
    } finally {
      setLoadingHint(false)
    }
  }

  const handleNextStep = () => {
    if (!question) return
    setHint(null)
    if (currentStep < question.steps.length - 1) {
      const next = currentStep + 1
      setCurrentStep(next)
      if (next === question.steps.length - 1) setShowAnswer(true)
    }
  }

  const stepsRevealed = currentStep + 1

  const handleNewQuestion = (q: GuidedQuestion) => {
    setQuestion(q)
    setCurrentStep(-1)
    setHint(null)
    setSelectedAnswer(null)
    setShowAnswer(false)
  }

  const handleReset = () => {
    setQuestion(null)
    setCurrentStep(-1)
    setHint(null)
    setSelectedAnswer(null)
    setShowAnswer(false)
  }

  return (
    <div className="space-y-6">
      <div className="bg-primary-50 border border-primary-200 rounded-2xl p-4">
        <h3 className="font-semibold text-slate-800 mb-2">Guided Practice — Hints at Every Step</h3>
        <p className="text-sm text-slate-700">
          Work through problems step-by-step. Get hints when stuck. Reveal the next step when ready.
        </p>
      </div>

      {!question ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <h4 className="text-sm font-semibold text-slate-700 p-4 border-b">Select a problem</h4>
          <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
            {GUIDED_QUESTIONS.map((q) => (
              <button
                key={q.id}
                onClick={() => handleNewQuestion(q)}
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-800">{q.id}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                    {q.section} • {q.difficulty}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-1 line-clamp-2">{q.stem}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <span className="text-xs font-medium text-primary-600">
              {question.section} • {question.type} • {question.difficulty}
            </span>
            <button
              onClick={handleReset}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              ← New problem
            </button>
          </div>

          <div className="p-4">
            <p className="text-slate-800 font-medium mb-4">{question.stem}</p>

            {question.options && (
              <div className="space-y-2 mb-4">
                {question.options.map((opt, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border ${
                      showAnswer && i === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : selectedAnswer === i
                          ? 'border-primary-400 bg-primary-50'
                          : 'border-slate-200'
                    }`}
                  >
                    <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={handleGetHint}
                disabled={loadingHint || showAnswer}
                className="px-4 py-2 rounded-xl bg-amber-100 text-amber-800 font-medium text-sm hover:bg-amber-200 disabled:opacity-50"
              >
                {loadingHint ? 'Getting hint...' : '💡 Get hint'}
              </button>
              <button
                onClick={handleNextStep}
                disabled={showAnswer}
                className="px-4 py-2 rounded-xl bg-primary-100 text-primary-700 font-medium text-sm hover:bg-primary-200 disabled:opacity-50"
              >
                {currentStep < question.steps.length - 1
                  ? `Show step ${stepsRevealed + 1}`
                  : 'All steps shown'}
              </button>
            </div>

            {hint && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 mb-4">
                <h5 className="font-semibold text-amber-800 mb-2">Hint</h5>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{hint}</p>
              </div>
            )}

            <div className="space-y-2">
              <h5 className="font-semibold text-slate-700">
                {showAnswer ? 'Full solution' : `Steps revealed (${stepsRevealed}/${question.steps.length})`}
              </h5>
              {question.steps.slice(0, currentStep + 1).map((step, i) => (
                <div key={i} className="flex gap-2 p-2 rounded-lg bg-slate-50">
                  <span className="font-bold text-primary-600 shrink-0">{i + 1}.</span>
                  <p className="text-sm text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
