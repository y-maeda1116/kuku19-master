// src/components/quiz/QuizView.tsx
import { useQuiz } from '../../hooks/useQuiz'
import { ProblemCard } from './ProblemCard'
import { AnswerInput } from './AnswerInput'
import { Keypad } from './Keypad'
import { Feedback } from './Feedback'
import { Button } from '../ui/Button'

type Props = { onJudged: (isCorrect: boolean) => void }

export const QuizView = ({ onJudged }: Props) => {
  const quiz = useQuiz(onJudged)
  const { problem, phase, userAnswer, isCorrect, inputDigit, clearAnswer, setAnswer, submit, next } = quiz

  const borderColor =
    phase === 'revealed'
      ? isCorrect
        ? 'border-[var(--color-correct)]'
        : 'border-[var(--color-wrong)]'
      : 'border-slate-200'

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-6">
      <ProblemCard
        a={problem.a}
        b={problem.b}
        userAnswer={userAnswer}
        borderColor={borderColor}
      />

      {phase === 'answering' ? (
        <>
          <AnswerInput
            value={userAnswer}
            onChange={setAnswer}
            onSubmit={submit}
            disabled={false}
          />
          <Keypad
            onDigit={inputDigit}
            onClear={clearAnswer}
            onSubmit={submit}
            disabled={false}
          />
        </>
      ) : (
        <>
          <Feedback
            isCorrect={isCorrect ?? false}
            answer={problem.answer}
            a={problem.a}
            b={problem.b}
          />
          <Button onClick={next} autoFocus>次の問題へ</Button>
        </>
      )}
    </div>
  )
}
