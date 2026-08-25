export default function TroubleshootingCard({ entry }) {
  const causes = entry.causes ?? []

  return (
    <article
      id={entry.id}
      className="scroll-mt-24 space-y-3 rounded-xl border border-helios-border bg-helios-surface p-4"
    >
      <header>
        <p className="text-xs uppercase tracking-wide text-white/40">{entry.item}</p>
        <h3 className="text-lg font-semibold text-white">{entry.symptom}</h3>
      </header>

      <ul className="space-y-3">
        {causes.map((cause, index) => (
          <li key={index} className="rounded-lg border border-helios-border/60 bg-black/20 p-3">
            <p className="font-medium text-white">{cause.cause}</p>
            <p className="text-sm text-white/70">{cause.fix}</p>
            {cause.detail && (
              <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1 text-xs text-white/50 sm:grid-cols-2">
                {Object.entries(cause.detail).map(([key, value]) => (
                  <div key={key} className="flex gap-1">
                    <dt className="font-mono text-white/40">{key}:</dt>
                    <dd>{value ?? '—'}</dd>
                  </div>
                ))}
              </dl>
            )}
          </li>
        ))}
      </ul>

      {entry.escalation && (
        <p className="rounded-lg border border-helios-warn/40 bg-helios-warn/10 px-3 py-2 text-sm text-helios-warn">
          Escalation: {entry.escalation}
        </p>
      )}
    </article>
  )
}
