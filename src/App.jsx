import { useCallback, useState } from 'react'
import Decor from './components/Decor.jsx'
import HelpSheet from './components/HelpSheet.jsx'
import Toast from './components/Toast.jsx'
import { useInstallPrompt } from './hooks/useInstallPrompt.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { calcBmi } from './lib/bmi.js'
import Home from './screens/Home.jsx'
import Result from './screens/Result.jsx'
import Wizard from './screens/Wizard.jsx'

const DEFAULT_PROFILE = { name: '', age: 25, height: 165, weight: 60 }
const MAX_HISTORY = 100

export default function App() {
  const [history, setHistory] = useLocalStorage('cekbmi:history', [])
  const [profile, setProfile] = useLocalStorage('cekbmi:profile', DEFAULT_PROFILE)
  const [screen, setScreen] = useState('home')
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState(DEFAULT_PROFILE)
  const [tab, setTab] = useState('latest')
  const [helpOpen, setHelpOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const install = useInstallPrompt()

  const closeHelp = useCallback(() => setHelpOpen(false), [])
  const dismissToast = useCallback(() => setToast(null), [])
  const showToast = (message, action) => setToast({ id: Date.now(), message, action })

  const startWizard = (atStep = 0) => {
    if (screen === 'home') setDraft({ ...DEFAULT_PROFILE, ...profile })
    setToast(null)
    setStep(atStep)
    setScreen('wizard')
  }

  const next = () => {
    if (step < 2) return setStep(step + 1)
    setProfile(draft)
    setScreen('result')
  }

  const back = () => (step > 0 ? setStep(step - 1) : setScreen('home'))

  const save = () => {
    const entry = {
      id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
      ts: Date.now(),
      age: draft.age,
      height: draft.height,
      weight: draft.weight,
      bmi: calcBmi(draft.height, draft.weight),
    }
    setHistory((h) => [entry, ...h].slice(0, MAX_HISTORY))
    setTab('latest')
    setScreen('home')
    showToast('Tersimpan ke riwayat')
  }

  const remove = (id) => {
    const index = history.findIndex((e) => e.id === id)
    const entry = history[index]
    setHistory((h) => h.filter((e) => e.id !== id))
    showToast('Catatan dihapus', {
      label: 'Batal',
      run: () => setHistory((h) => [...h.slice(0, index), entry, ...h.slice(index)]),
    })
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-ink">
      <Decor />
      <div className="relative mx-auto flex h-dvh w-full max-w-[430px] items-center md:py-6">
        <div className="relative flex h-full w-full flex-col overflow-hidden bg-night md:h-[min(880px,100%)] md:rounded-[52px] md:border-[12px] md:border-[#2b2b2b] md:outline-1 md:outline-white/15 md:outline md:shadow-2xl">
          {screen === 'home' && (
            <Home
              profile={profile}
              history={history}
              tab={tab}
              onTab={setTab}
              onStart={() => startWizard(0)}
              onDelete={remove}
              onHelp={() => setHelpOpen(true)}
              onInstall={install}
            />
          )}
          {screen === 'wizard' && (
            <Wizard
              step={step}
              draft={draft}
              onChange={setDraft}
              onNext={next}
              onBack={back}
              onClose={() => setScreen('home')}
            />
          )}
          {screen === 'result' && (
            <Result
              draft={draft}
              onSave={save}
              onEdit={() => startWizard(1)}
              onClose={() => setScreen('home')}
            />
          )}

          <HelpSheet open={helpOpen} onClose={closeHelp} />
          <Toast toast={toast} onDismiss={dismissToast} />
        </div>
      </div>
    </div>
  )
}
