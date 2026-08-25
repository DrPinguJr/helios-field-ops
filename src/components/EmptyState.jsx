export default function EmptyState({ label }) {
  return (
    <div className="rounded-lg border border-dashed border-helios-border px-4 py-10 text-center text-sm text-white/50">
      No {label} yet — content pending from Codex/ChatGPT ingestion.
    </div>
  )
}
