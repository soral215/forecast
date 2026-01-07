import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-full bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="https://vite.dev" target="_blank" rel="noreferrer">
              <img src={viteLogo} className="h-8 w-8" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              <img src={reactLogo} className="h-8 w-8" alt="React logo" />
            </a>
            <span className="text-sm text-slate-300">realteeth</span>
          </div>
        </header>

        <main className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Weather App (Scaffold)
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Tailwind 적용 확인용 임시 화면입니다.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button
              className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
              onClick={() => setCount((count) => count + 1)}
            >
              count: {count}
            </button>
            <span className="text-sm text-slate-400">
              Edit <code className="rounded bg-slate-800 px-1.5 py-0.5">src/App.tsx</code>
            </span>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
