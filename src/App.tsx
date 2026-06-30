// src/App.tsx
import { useCallback, useState } from 'react'
import type { View } from './types'
import { Header } from './components/layout/Header'
import { NavBar } from './components/layout/NavBar'
import { TopMenu } from './components/layout/TopMenu'
import { QuizView } from './components/quiz/QuizView'
import { TableView } from './components/table/TableView'
import { useScore } from './hooks/useScore'

export default function App() {
  const [view, setView] = useState<View>('home')
  const { score, record } = useScore()

  const navigate = useCallback((v: View) => setView(v), [])

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col bg-white">
      <Header score={score} />
      <main className="flex-1 overflow-y-auto">
        {view === 'home' && <TopMenu onNavigate={navigate} />}
        {view === 'quiz' && <QuizView onJudged={record} />}
        {view === 'table' && <TableView />}
      </main>
      <NavBar view={view} onChange={navigate} />
    </div>
  )
}
