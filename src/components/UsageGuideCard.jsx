export default function UsageGuideCard({ entry }) {
  return (
    <article
      id={entry.id}
      className="scroll-mt-24 space-y-2 rounded-xl border border-helios-border bg-helios-surface p-4"
    >
      <p className="text-xs uppercase tracking-wide text-white/40">
        {entry.item} · {entry.context}
      </p>
      <p className="text-sm text-white/80">{entry.guidance}</p>
      {entry.cautions && (
        <p className="rounded-lg border border-helios-warn/40 bg-helios-warn/10 px-3 py-2 text-sm text-helios-warn">
          {entry.cautions}
        </p>
      )}
    </article>
  )
}
