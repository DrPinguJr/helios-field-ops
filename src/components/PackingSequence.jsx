import PackingStepCard from './PackingStepCard'

export default function PackingSequence({ title, hint, phase, steps }) {
  const connected = steps.length > 1

  return (
    <section className="overflow-hidden rounded-2xl border border-helios-border bg-helios-surface">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-helios-border bg-black/20 px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-white/40">{phase}</p>
          <h3 className="text-lg font-semibold capitalize text-white">{title}</h3>
          <p className="mt-0.5 text-sm text-white/50">{hint}</p>
        </div>
        <span
          className={`rounded-full border px-2.5 py-1 text-xs ${
            connected
              ? 'border-helios-accent/50 bg-helios-accent/10 text-helios-accent-soft'
              : 'border-helios-border text-white/50'
          }`}
        >
          {connected ? `${steps.length} connected steps` : 'Standalone routine'}
        </span>
      </header>

      <div className="px-3 py-4 sm:px-4">
        {steps.map((step, index) => (
          <PackingStepCard
            key={step.id}
            step={step}
            displayOrder={index + 1}
            totalSteps={steps.length}
            connected={connected}
            first={index === 0}
            last={index === steps.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
