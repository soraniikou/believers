import { useState } from 'react'

type TimeChoice = 'past' | 'future' | null
type PastDetailChoice = 'wantToDeny' | 'envy' | 'startOver' | null
type FutureDetailChoice = 'hope' | 'create' | 'become' | null

const PAST_NOTE_INITIAL = {
  wantToDeny: '',
  envy: '',
  startOver: '',
} as const

const FUTURE_NOTE_INITIAL = {
  hope: '',
  create: '',
  become: '',
} as const

type PastNoteKey = keyof typeof PAST_NOTE_INITIAL
type FutureNoteKey = keyof typeof FUTURE_NOTE_INITIAL

function ChoiceWithMark({
  label,
  selected,
  onClick,
  frameClass,
}: {
  label: string
  selected: boolean
  onClick: () => void
  frameClass: string
}) {
  return (
    <div className="flex min-w-0 w-full flex-col gap-2">
      <button type="button" onClick={onClick} className={frameClass}>
        {label}
      </button>
      <div
        className={`h-0.5 w-full shrink-0 rounded-full transition-colors ${
          selected ? 'bg-blue-500/50' : 'bg-transparent'
        }`}
        aria-hidden
      />
    </div>
  )
}

const noteFieldClass =
  'min-h-[140px] w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 backdrop-blur-md transition-all focus:ring-2 focus:ring-blue-500/50 focus:outline-none'

export default function TsubameForward() {
  const [timeChoice, setTimeChoice] = useState<TimeChoice>(null)
  const [pastDetail, setPastDetail] = useState<PastDetailChoice>(null)
  const [pastNotes, setPastNotes] = useState<Record<PastNoteKey, string>>({
    wantToDeny: '',
    envy: '',
    startOver: '',
  })
  const [futureDetail, setFutureDetail] = useState<FutureDetailChoice>(null)
  const [futureNotes, setFutureNotes] = useState<Record<FutureNoteKey, string>>({
    hope: '',
    create: '',
    become: '',
  })

  const choiceFrameClass =
    'w-full rounded-full border border-white/10 bg-white/5 py-3.5 px-4 text-center text-sm text-slate-100 backdrop-blur-md transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50'

  const pastFrameClass =
    'w-full rounded-full border border-white/10 bg-white/5 py-3.5 px-3 text-center text-xs leading-snug text-slate-100 backdrop-blur-md transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 sm:px-4 sm:text-sm'

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-slate-900 p-8 text-slate-100">
      <header className="z-10 mt-12 shrink-0 text-center">
        <h1 className="font-belivers-script mb-2 text-5xl text-slate-100 sm:text-6xl">
          belivers
        </h1>
      </header>

      <div className="z-10 flex w-full max-w-md flex-1 flex-col justify-center pb-16 text-center">
        <p className="text-2xl font-light tracking-wide text-blue-300 drop-shadow-2xl sm:text-3xl">
          Where do you want to go?
        </p>
        <div
          className={`mt-6 flex w-full gap-3 ${
            timeChoice === 'past' || timeChoice === 'future' ? 'justify-center' : ''
          }`}
        >
          {timeChoice !== 'future' && (
            <div
              className={
                timeChoice === 'past' ? 'w-full max-w-xs sm:max-w-[11rem]' : 'min-w-0 flex-1'
              }
            >
              <button
                type="button"
                onClick={() => {
                  setTimeChoice((c) => {
                    if (c === 'past') {
                      setPastDetail(null)
                      return null
                    }
                    setFutureDetail(null)
                    setFutureNotes({ ...FUTURE_NOTE_INITIAL })
                    return 'past'
                  })
                }}
                className={choiceFrameClass}
              >
                to the past
              </button>
            </div>
          )}
          {timeChoice !== 'past' && (
            <div
              className={
                timeChoice === 'future' ? 'w-full max-w-xs sm:max-w-[11rem]' : 'min-w-0 flex-1'
              }
            >
              <ChoiceWithMark
                label="to the future"
                selected={timeChoice === 'future'}
                frameClass={choiceFrameClass}
                onClick={() => {
                  setPastDetail(null)
                  setPastNotes({ ...PAST_NOTE_INITIAL })
                  setTimeChoice((c) => {
                    if (c === 'future') {
                      setFutureDetail(null)
                      setFutureNotes({ ...FUTURE_NOTE_INITIAL })
                      return null
                    }
                    return 'future'
                  })
                }}
              />
            </div>
          )}
        </div>

        {timeChoice === 'past' && (
          <div className="mt-10 flex w-full flex-col gap-3">
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
              <ChoiceWithMark
                label="I want to deny"
                selected={pastDetail === 'wantToDeny'}
                frameClass={pastFrameClass}
                onClick={() => setPastDetail((d) => (d === 'wantToDeny' ? null : 'wantToDeny'))}
              />
              <ChoiceWithMark
                label="I want to envy"
                selected={pastDetail === 'envy'}
                frameClass={pastFrameClass}
                onClick={() => setPastDetail((d) => (d === 'envy' ? null : 'envy'))}
              />
              <ChoiceWithMark
                label="I want to start over"
                selected={pastDetail === 'startOver'}
                frameClass={pastFrameClass}
                onClick={() => setPastDetail((d) => (d === 'startOver' ? null : 'startOver'))}
              />
            </div>

            {pastDetail !== null && (
              <div className="mt-8 w-full text-left">
                <textarea
                  id={`past-note-${pastDetail}`}
                  value={pastNotes[pastDetail]}
                  onChange={(e) =>
                    setPastNotes((n) => ({ ...n, [pastDetail]: e.target.value }))
                  }
                  placeholder={
                    pastDetail === 'wantToDeny'
                      ? 'What do you want to deny?'
                      : pastDetail === 'envy'
                        ? 'What do you envy?'
                        : 'What do you want to start over?'
                  }
                  aria-label={
                    pastDetail === 'wantToDeny'
                      ? 'Deny'
                      : pastDetail === 'envy'
                        ? 'Envy'
                        : 'Start over'
                  }
                  className={noteFieldClass}
                  rows={5}
                  spellCheck
                />
              </div>
            )}
          </div>
        )}

        {timeChoice === 'future' && (
          <div className="mt-10 flex w-full flex-col gap-3">
            <p className="mb-4 text-xl font-light tracking-wide text-blue-300 drop-shadow-lg sm:text-2xl">
              I want to
            </p>
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
              <ChoiceWithMark
                label="hope"
                selected={futureDetail === 'hope'}
                frameClass={pastFrameClass}
                onClick={() => setFutureDetail((d) => (d === 'hope' ? null : 'hope'))}
              />
              <ChoiceWithMark
                label="create"
                selected={futureDetail === 'create'}
                frameClass={pastFrameClass}
                onClick={() => setFutureDetail((d) => (d === 'create' ? null : 'create'))}
              />
              <ChoiceWithMark
                label="become"
                selected={futureDetail === 'become'}
                frameClass={pastFrameClass}
                onClick={() => setFutureDetail((d) => (d === 'become' ? null : 'become'))}
              />
            </div>

            {futureDetail !== null && (
              <div className="mt-8 w-full text-left">
                <textarea
                  id={`future-note-${futureDetail}`}
                  value={futureNotes[futureDetail]}
                  onChange={(e) =>
                    setFutureNotes((n) => ({ ...n, [futureDetail]: e.target.value }))
                  }
                  placeholder={
                    futureDetail === 'hope'
                      ? 'What do you want to hope for?'
                      : futureDetail === 'create'
                        ? 'What do you want to create?'
                        : 'Who or what do you want to become?'
                  }
                  aria-label={
                    futureDetail === 'hope'
                      ? 'I want to hope'
                      : futureDetail === 'create'
                        ? 'I want to create'
                        : 'I want to become'
                  }
                  className={noteFieldClass}
                  rows={5}
                  spellCheck
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
    </div>
  )
}
