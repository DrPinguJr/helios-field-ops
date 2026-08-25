import Warning from './Warning'

export default function PackingStepCard({ step }) {
  const substeps = step.substeps ?? []

  return (
    <article
      id={step.id}
      className="scroll-mt-24 space-y-3 rounded-xl border border-helios-border bg-helios-surface p-4"
    >
      <header>
        <p className="text-xs uppercase tracking-wide text-white/40">
          {step.item} · {step.phase} · step {step.order}
        </p>
        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
      </header>

      {step.detail && <p className="text-sm text-white/80">{step.detail}</p>}

      <Warning>{step.warning}</Warning>

      {substeps.length > 0 && (
        <ol className="list-decimal space-y-1 pl-5 text-sm text-white/70">
          {substeps
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((sub) => (
              <li key={sub.order}>{sub.text}</li>
            ))}
        </ol>
      )}

      {step.image && (
        <img src={step.image} alt="" className="rounded-lg border border-helios-border" />
      )}
    </article>
  )
}
